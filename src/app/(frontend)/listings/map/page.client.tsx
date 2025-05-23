'use client'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Listing, Media as MediaType } from '@/payload-types'
import { createRef, RefObject, useEffect, useRef, useState } from 'react'
import mapboxgl, { LngLatBoundsLike, LngLatLike, Map, Marker } from 'mapbox-gl'
import { Card } from '../../../../components/ui/card'
import { Media } from '../../../../components/Media'
import { Button } from '../../../../components/ui/button'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBath, faBedFront, faFarm } from '@awesome.me/kit-a7a0dd333d/icons/sharp-duotone/thin'
import {
  faEnvelope,
  faArrowUpArrowDown,
  faCircleNotch,
  faList,
  faMap,
  faChevronLeft,
  faChevronRight,
  faChevronDoubleLeft,
  faChevronDoubleRight,
  faPlus,
} from '@awesome.me/kit-a7a0dd333d/icons/sharp/light'
import { formatNumber } from '@/utilities/formatNumber'
import { formatPrice } from '@/utilities/formatPrice'
import { FilterBar } from '@/components/Map/filterBar'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getMapListings } from '../../api/getMapListings'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Skeleton } from '@/components/ui/skeleton'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useWindowDimensions from '@/utilities/useWindowDimensions'
import defaultTheme from 'tailwindcss/defaultTheme'
import { MAP_PAGINATION_LIMIT } from '@/utilities/constants'
import { faXmark } from '@awesome.me/kit-a7a0dd333d/icons/sharp/regular'
import './styles.scss'
import { useDebounce } from '@/utilities/useDebounce'

interface MapPageClientProps {
  listingsCount?: number
}

export interface MapFilters {
  search: string | null | undefined
  category: string | null | undefined
  propertyType: string | null | undefined
  minPrice: string | null | undefined
  maxPrice: string | null | undefined
  minSize: string | null | undefined
  maxSize: string | null | undefined
  sizeType: string | null | undefined
  availability: string | null | undefined
  transactionType: 'for-sale' | 'for-lease' | null | undefined
}

export const FormSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  propertyType: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minSize: z.string().optional(),
  maxSize: z.string().optional(),
  sizeType: z.string().optional(),
  availability: z.string().optional(),
  transactionType: z.string().optional(),
})

const sortOptions = [
  {
    value: '-price',
    label: 'Price (High to Low)',
  },
  {
    value: 'price',
    label: 'Price (Low to High)',
  },
  {
    value: '-area, -acreage',
    label: 'Size (High to Low)',
  },
  {
    value: 'area, acreage',
    label: 'Size (Low to High)',
  },
  {
    value: '-createdAt',
    label: 'Newest',
  },
  {
    value: 'createdAt',
    label: 'Oldest',
  },
]

export const PageClient: React.FC<MapPageClientProps> = ({ listingsCount }) => {
  const mapContainerRef = useRef<any>(null)
  const mapRef = useRef<Map>(null)
  const { width } = useWindowDimensions()
  const [activeListings, setActiveListings] = useState<Listing[]>([])
  const [totalListings, setTotalListings] = useState<number | undefined>(listingsCount)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('map')
  const [filters, setFilters] = useState<MapFilters | undefined>(undefined)
  const [hasNextPage, setHasNextPage] = useState<boolean | null | undefined>(undefined)
  const [hasPrevPage, setHasPrevPage] = useState<boolean | null | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState<number | null | undefined>(1)
  // const [totalPages, setTotalPages] = useState<number | null | undefined>(undefined)
  // const [nextPage, setNextPage] = useState<number | null | undefined>(undefined)
  // const [prevPage, setPrevPage] = useState<number | null | undefined>(undefined)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [focusedListing, setFocusedListing] = useState<Listing | null>(null)
  const [cardRefs, setCardRefs] = useState<RefObject<HTMLDivElement | null>[]>([])
  const { setHeaderTheme } = useHeaderTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [sortData, setSortData] = useState<{ value: string; label: string } | undefined>(undefined)
  const [limit] = useState(MAP_PAGINATION_LIMIT || 10)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const debouncedFocusedListing = useDebounce(focusedListing, 500)

  useEffect(() => {
    if (debouncedFocusedListing) {
      clearPopups()
      const listing = activeListings.find((_listing) => _listing.id === debouncedFocusedListing.id)
      if (!listing) return
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [listing.coordinates[0], listing.coordinates[1]],
          speed: 0.75,
          zoom: 20
        })
        new mapboxgl.Popup({ offset: 25, focusAfterOpen: false })
          .setLngLat(listing.coordinates)
          .setHTML(
            `
              <div class="marker-popup rounded-lg overflow-hidden">
                <div class="marker-popup_image-container relative aspect-video bg-white">
                <div class="animate-pulse absolute inset-0 bg-brand-gray-01"></div>
                  <img src="${(listing?.featuredImage as MediaType)?.sizes?.medium?.url || null}" alt="${(listing?.featuredImage as MediaType)?.alt || ''}" class="marker-popup_image w-full absolute top-0 left-0 h-full object-cover" />
                </div>
                <div class="p-6 bg-white flex flex-col">
                <span class="marker-description text-2xl font-basic-sans font-bold text-brand-gray-06"> ${listing.price
              ? `${formatPrice(listing.price)}${listing.textAfterPrice
                ? `<span class="text-sm ml-2 font-normal">${listing.textAfterPrice}</span>`
                : ''
              }`
              : 'Contact for price'
            }</span>
                  <h3 class="marker-title font-basic-sans text-brand-gray-04 text-base font-light">${listing.streetAddress}</h3>
                  <a href="/listings/${listing.slug}" class="p-2 w-fit text-sm rounded-sm transition-colors hover:bg-brand-gray-00 focus-visible:bg-brand-gray-00 focus-visible:outline-none font-light flex items-center gap-1 text-brand-gray-04"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-2 h-auto fill-brand-gray-04"><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M240 64l0-16-32 0 0 16 0 176L32 240l-16 0 0 32 16 0 176 0 0 176 0 16 32 0 0-16 0-176 176 0 16 0 0-32-16 0-176 0 0-176z"/></svg>Learn More</a>
                </div>
              </div>
              `,
          ).addTo(mapRef.current)
        mapRef.current?.flyTo({
          center: listing.coordinates,
          speed: 0.5,
        })
      }
    }
  }, [debouncedFocusedListing, activeListings])

  const handleFetchListings = async (
    filterData?: MapFilters,
    page?: number,
    sort?: string | null,
  ) => {
    setIsLoading(true)
    setActiveListings([])
    setCardRefs([])
    if (filterData || page || sort) {
      filterData && setFilters(filterData)
      sort
        ? setSortData(sortOptions.find((option) => option.value === sort))
        : searchParams.get('sort')
          ? setSortData(sortOptions.find((option) => option.value === searchParams.get('sort')))
          : setSortData(undefined)
      const newSearchParams = new URLSearchParams(searchParams)
      if (filterData?.search) {
        newSearchParams.set('search', filterData.search)
      } else {
        newSearchParams.delete('search')
      }
      if (filterData?.category) {
        newSearchParams.set('category', filterData.category)
      } else {
        newSearchParams.delete('category')
      }
      if (filterData?.propertyType) {
        newSearchParams.set('property_type', filterData.propertyType)
      } else {
        newSearchParams.delete('property_type')
      }
      if (filterData?.minPrice) {
        newSearchParams.set('min_price', filterData.minPrice.toString())
      } else {
        newSearchParams.delete('min_price')
      }
      if (filterData?.maxPrice) {
        newSearchParams.set('max_price', filterData.maxPrice.toString())
      } else {
        newSearchParams.delete('max_price')
      }
      if (filterData?.minSize) {
        newSearchParams.set('min_size', filterData.minSize.toString())
      } else {
        newSearchParams.delete('min_size')
      }
      if (filterData?.maxSize) {
        newSearchParams.set('max_size', filterData.maxSize.toString())
      } else {
        newSearchParams.delete('max_size')
      }
      if (filterData?.availability) {
        newSearchParams.set('availability', filterData.availability.toString())
      } else {
        newSearchParams.delete('availability')
      }
      if (filterData?.transactionType) {
        newSearchParams.set('transaction_type', filterData.transactionType.toString())
      } else {
        newSearchParams.delete('transaction_type')
      }
      if (filterData?.sizeType) {
        newSearchParams.set('size_type', filterData.sizeType.toString())
      } else {
        newSearchParams.delete('size_type')
      }
      if (page) {
        newSearchParams.set('page', page.toString())
      } else {
        newSearchParams.delete('page')
      }
      if (sort) {
        newSearchParams.set('sort', sort)
      } else {
        searchParams.get('sort')
          ? newSearchParams.set('sort', searchParams.get('sort')!)
          : newSearchParams.delete('sort')
      }
      router.replace(pathname + '?' + newSearchParams.toString(), { scroll: false })
    }
    const response = await getMapListings({
      filters: filterData || undefined,
      page: page || undefined,
      sort: sort || searchParams.get('sort') || undefined,
    })

    setCurrentPage(response.page)
    // setTotalPages(response.totalPages)
    // setPrevPage(response.prevPage)
    setHasPrevPage(response.hasPrevPage)
    // setNextPage(response.nextPage)
    setHasNextPage(response.hasNextPage)
    setActiveListings(response.docs)
    setTotalListings(response.totalDocs)
    setIsLoading(false)
    const newCardRefs = response.docs.map(() => createRef<HTMLDivElement>())
    setCardRefs(newCardRefs)
  }

  const clearPopups = () => {
    if (mapRef.current) {
      mapRef.current._popups.forEach((popup) => popup.remove())
    }
  }

  useEffect(() => {

    if (activeListings && activeListings.length > 0) {
      const geoJson = {
        type: 'FeatureCollection',
        features: activeListings.map((listing) => {
          return {
            type: 'Feature',
            properties: {
              title: listing.title,
              slug: listing.slug,
              address: listing.streetAddress,
              price:
                typeof listing.price === 'number' && listing.price !== 0
                  ? formatPrice(listing.price)
                  : '',
              textAfterPrice: listing.textAfterPrice || '',
              transactionType: listing.transactionType,
              image: listing.featuredImage,
              lat: listing.coordinates[1],
              lon: listing.coordinates[0],
              iconSize: 32,
              category: listing.category,
              listOfficeName: listing.MLS?.ListOfficeName,
            },
            geometry: {
              type: 'Point',
              coordinates: [listing.coordinates[0], listing.coordinates[1]],
            },
          }
        }),
      }
      if (mapRef.current) {

        mapRef.current.addSource('listings', {
          type: 'geojson',
          data: geoJson as GeoJSON.GeoJSON,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 40
        });

        mapRef.current.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'listings',
          filter: ['has', 'point_count'],
          paint: {
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              18,
              5,
              24
            ],
            "circle-opacity": 0
          }
        });

        mapRef.current.addLayer({
          id: 'clusters-inner',
          type: 'circle',
          source: 'listings',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#A9C1C9',
              5,
              '#0B2A35',
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              12,
              5,
              14
            ]
          },
          layout: {
            'circle-sort-key': 2
          }
        });
        mapRef.current.addLayer({
          id: 'clusters-outer',
          type: 'circle',
          source: 'listings',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#A9C1C9',
              5,
              '#0B2A35',
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              18,
              5,
              20
            ],
            'circle-opacity': .5
          },
          layout: {
            'circle-sort-key': 0
          }
        });


        mapRef.current.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'listings',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-size': 12
          },
          paint: {
            'text-color': [
              'step',
              ['get', 'point_count'],
              '#0B2A35',
              5,
              '#FFFFFF'
            ]
          }
        });


        mapRef.current.addLayer({
          id: 'unclustered-point',
          type: 'symbol',
          source: 'listings',
          filter: ["all", ['!', ['has', 'point_count']],],
          layout: {
            'icon-image': ["case", ["all", ["==", ["get", "category"], 'residential'], ["!=", ["get", "listOfficeName"], process.env.NEXT_PUBLIC_RETS_LIST_OFFICE_NAME]], 'default-marker', 'onward-marker'],
            'icon-size': ["case", ["all", ["==", ["get", "category"], 'residential'], ["!=", ["get", "listOfficeName"], process.env.NEXT_PUBLIC_RETS_LIST_OFFICE_NAME]], .07, .225],
          }
        });

        mapRef.current.on('click', 'clusters', function (e) {
          const features = mapRef.current?.queryRenderedFeatures(e.point, {
            layers: ['clusters']
          });
          if (features && typeof features === 'object') {
            const clusterId = features[0].properties?.cluster_id;
            // @ts-expect-error
            mapRef.current?.getSource('listings')?.getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;
              mapRef.current?.easeTo({
                // @ts-expect-error
                center: features[0].geometry.coordinates,
                zoom: zoom
              });
            })
          }
        });

        mapRef.current.on('click', 'unclustered-point', (e) => {
          const feature = e.features?.at(0)
          clearPopups()
          if (!feature) return
          // @ts-expect-error
          const coordinates = feature.geometry.coordinates;
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup({ offset: 25, focusAfterOpen: false })
            .setLngLat(coordinates)
            .setHTML(
              `
              <div class="marker-popup rounded-lg overflow-hidden">
                <div class="marker-popup_image-container relative aspect-video bg-white">
                <div class="animate-pulse absolute inset-0 bg-brand-gray-01"></div>
                  <img src="${JSON.parse(feature.properties?.image)?.sizes?.medium?.url || null}" alt="${JSON.parse(feature?.properties?.image)?.alt || ''}" class="marker-popup_image w-full absolute top-0 left-0 h-full object-cover" />
                </div>
                <div class="p-6 bg-white flex flex-col">
                <span class="marker-description text-2xl font-basic-sans font-bold text-brand-gray-06">${feature.properties?.price
                ? `${formatPrice(feature.properties?.price)}${feature.properties?.textAfterPrice
                  ? `<span class="text-sm ml-2 font-normal">${feature.properties?.textAfterPrice}</span>`
                  : ''
                }`
                : 'Contact for price'
              }</span>
                  <h3 class="marker-title font-basic-sans text-brand-gray-04 text-base font-light">${feature.properties?.address}</h3>
                  <a href="/listings/${feature.properties?.slug}" class="p-2 w-fit text-sm rounded-sm transition-colors hover:bg-brand-gray-00 focus-visible:bg-brand-gray-00 focus-visible:outline-none font-light flex items-center gap-1 text-brand-gray-04"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-2 h-auto fill-brand-gray-04"><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M240 64l0-16-32 0 0 16 0 176L32 240l-16 0 0 32 16 0 176 0 0 176 0 16 32 0 0-16 0-176 176 0 16 0 0-32-16 0-176 0 0-176z"/></svg>Learn More</a>
                </div>
              </div>
              `,
            )
            // @ts-expect-error
            .addTo(mapRef.current);
          mapRef.current?.flyTo({
            center: coordinates,
            speed: 0.5,
          })
          const cardIndex = activeListings.findIndex((listing) => listing.slug === feature.properties?.slug)
          console.log(cardIndex)
          if (cardIndex !== -1 && cardRefs[cardIndex].current) {
            cardRefs[cardIndex].current?.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            })
          }
        });

        mapRef.current.on('mouseenter', 'clusters', () => {
          // @ts-expect-error
          mapRef.current.getCanvas().style.cursor = 'pointer';
        });

        mapRef.current.on('mouseleave', 'clusters', () => {
          // @ts-expect-error
          mapRef.current.getCanvas().style.cursor = '';
        });
      }
    }

    return () => {
      mapRef.current?.off('click', 'clusters', function (e) {
        const features = mapRef.current?.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        if (features && typeof features === 'object') {
          const clusterId = features[0].properties?.cluster_id;
          // @ts-expect-error
          mapRef.current?.getSource('listings')?.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;
            mapRef.current?.easeTo({
              // @ts-expect-error
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          })
        }
      });
      if (mapRef.current?.getSource('listings')) {
        if (mapRef.current?.getLayer('clusters')) {
          mapRef.current?.removeLayer('clusters')
        }
        if (mapRef.current?.getLayer('clusters-inner')) {
          mapRef.current?.removeLayer('clusters-inner')
        }
        if (mapRef.current?.getLayer('clusters-mid')) {
          mapRef.current?.removeLayer('clusters-mid')
        }
        if (mapRef.current?.getLayer('clusters-outer')) {
          mapRef.current?.removeLayer('clusters-outer')
        }
        if (mapRef.current?.getLayer('cluster-count')) {
          mapRef.current?.removeLayer('cluster-count')
        }
        if (mapRef.current?.getLayer('unclustered-point')) {
          mapRef.current?.removeLayer('unclustered-point')
        }
        mapRef.current?.removeSource('listings')
      }
    }
  }, [activeListings, isFirstRender])

  useEffect(() => {
    setHeaderTheme('filled')
    setIsFirstRender(false)

    mapRef.current = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
      container: mapContainerRef.current,
      center: [-97.2753695, 31.5532499],
      zoom: 10,
      scrollZoom: false,
      maxZoom: 20
    })
    mapRef.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-left')
    mapRef.current.on('load', () => {
      mapRef.current?.loadImage(
        '/map/map-marker.png',
        (error, image) => {
          if (error) throw error;
          if (image) mapRef.current?.addImage('default-marker', image);
        })
      mapRef.current?.loadImage(
        '/map/onward-map-marker.png',
        (error, image) => {
          if (error) throw error;
          if (image) mapRef.current?.addImage('onward-marker', image);
        })
    })

    // FETCH PROPERTIES ON FIRST RENDER
    const filterData = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      propertyType: searchParams.get('property_type') || '',
      minPrice: searchParams.get('min_price') || '',
      maxPrice: searchParams.get('max_price') || '',
      sizeType: searchParams.get('size_type') || '',
      minSize: searchParams.get('min_size') || '',
      maxSize: searchParams.get('max_size') || '',
      availability: searchParams.get('availability') || '',
      transactionType: (searchParams.get('transaction_type') || '') as
        | 'for-sale'
        | 'for-lease'
        | null
        | undefined,
    }
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : undefined
    const sort = searchParams.get('sort') || undefined


    form.setValue('search', filterData.search || '')
    form.setValue('category', filterData.category || '')
    form.setValue('propertyType', filterData.propertyType || '')
    form.setValue('minPrice', filterData.minPrice || '')
    form.setValue('maxPrice', filterData.maxPrice || '')
    form.setValue('sizeType', filterData.sizeType || '')
    form.setValue('minSize', filterData.minSize || '')
    form.setValue('maxSize', filterData.maxSize || '')
    form.setValue('availability', filterData.availability || '')
    form.setValue('transactionType', filterData.transactionType || '')

    handleFetchListings(filterData, page, sort)
    return () => {
      mapRef.current?.remove()
    }
  }, [])



  // useEffect(() => {
  //   centerMap()
  // }, [boundingBox])

  const handleReset = async () => {
    try {
      setIsLoading(true)
      router.replace(pathname, { scroll: false })
      form.setValue('search', '')
      form.setValue('category', '')
      form.setValue('propertyType', '')
      form.setValue('minPrice', '')
      form.setValue('maxPrice', '')
      form.setValue('sizeType', '')
      form.setValue('minSize', '')
      form.setValue('maxSize', '')
      form.setValue('availability', '')
      form.setValue('transactionType', '')
      setFilters(undefined)
      handleFetchListings()
    } catch (error: any) {
      console.log(error.message)
      router.push(pathname)
    } finally {
    }
  }

  return (
    <div>
      <FilterBar
        handleFilter={handleFetchListings}
        handleReset={handleReset}
        form={form}
        isLoading={isLoading}
      />
      <div className="w-full border-t border-brand-gray-01 md:grid md:grid-cols-5">
        {width && width <= parseInt(defaultTheme.screens.md) && (
          <div className="flex">
            <Button
              className={`flex-1 flex gap-2 items-center text-lg font-medium tracking-normal normal-case bg-transparent hover:bg-transparent focus-visible:bg-transparent  border-0 border-b-2 ${activeTab === 'map' ? 'text-brand-navy border-b-brand-navy' : 'text-brand-gray-03 border-b-transparent'}`}
              onClick={() => setActiveTab('map')}
            >
              <FontAwesomeIcon icon={faMap} className="w-5 h-auto" /> Map
            </Button>
            <Button
              className={`flex-1 flex gap-2 items-center text-lg font-medium tracking-normal normal-case bg-transparent hover:bg-transparent focus-visible:bg-transparent border-0 border-b-2 ${activeTab === 'list' ? 'text-brand-navy border-b-brand-navy' : 'text-brand-gray-03 border-b-transparent'}`}
              onClick={() => setActiveTab('list')}
            >
              <FontAwesomeIcon icon={faList} className="w-5 h-auto" /> List
            </Button>
          </div>
        )}

        <div
          className={`col-span-3 relative md:sticky md:top-20 h-fit ${width && width <= parseInt(defaultTheme.screens.md) && activeTab !== 'map' && 'hidden'}`}
        >
          {(isFirstRender || !mapRef.current) && (
            <Skeleton className="h-[calc(100vh-5rem)]"></Skeleton>
          )}

          <div id="map" ref={mapContainerRef} className="h-[calc(100vh-5rem)]"></div>
        </div>

        <div
          className={`col-span-2 overflow-scroll bg-white ${width && width <= parseInt(defaultTheme.screens.md) && activeTab !== 'list' && 'hidden'}`}
        >
          <div className="p-6 border-b border-brand-gray-01 flex gap-6 justify-between items-center">
            <span className="text-lg font-medium text-brand-gray-03">
              {(isFirstRender || isLoading) && (
                <FontAwesomeIcon icon={faCircleNotch} className="animate-spin w-4 h-auto inline" />
              )}
              {!isFirstRender &&
                !isLoading &&
                currentPage &&
                `${currentPage * limit - limit + 1 !== totalListings ? `${currentPage * limit - limit + 1}-${hasNextPage ? currentPage * limit : totalListings}` : totalListings}`}{' '}
              of {totalListings} Listings
            </span>
            <DropdownMenu open={isSortOpen} onOpenChange={setIsSortOpen}>
              <DropdownMenuTrigger className="text-lg text-brand-gray-03 font-medium tracking-normal flex items-center gap-2 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2">
                <FontAwesomeIcon icon={faArrowUpArrowDown} className="w-5 h-auto" />{' '}
                {sortData ? sortData.label : 'Sort By'}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-none">
                <DropdownMenuRadioGroup
                  value={sortData?.value}
                  onValueChange={(value) => {
                    handleFetchListings(filters, currentPage || 1, value)
                  }}
                >
                  {sortOptions.map((option, index) => {
                    return (
                      <DropdownMenuRadioItem
                        key={index}
                        className="hover:bg-brand-blue rounded-none text-base font-light"
                        value={option.value}
                      >
                        {option.label}
                      </DropdownMenuRadioItem>
                    )
                  })}
                </DropdownMenuRadioGroup>
                {sortData && (
                  <Button
                    variant={'ghost'}
                    className="flex items-center gap-2 w-full"
                    onClick={() => {
                      handleFetchListings(filters, currentPage || 1)
                      setIsSortOpen(false)
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                    Reset
                  </Button>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] xl:grid-cols-2 gap-x-4 gap-y-6 p-6 content-start ">
            {(isFirstRender || isLoading) &&
              Array.from(Array(4).keys()).map((_, index) => {
                return (
                  <Card key={index} className="rounded-none bg-white border-none shadow-md">
                    <div className="relative pb-[66.66%] rounded-none overflow-hidden w-full">
                      <Skeleton className="absolute w-full h-full top-0 left-0 rounded-none" />
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                      <div className="flex justify-between gap-4">
                        <div className="flex flex-col gap-2 flex-1">
                          <div>
                            <Skeleton className="w-full h-8" />
                          </div>

                          <Skeleton className="w-full h-6" />
                          <Skeleton className="w-full h-6" />
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}

            {activeListings &&
              activeListings.length > 0 &&
              activeListings.map((listing, index) => {
                return (
                  <Card
                    key={listing.id}
                    className="rounded-none bg-white border-none shadow-md transition-shadow hover:shadow-xl focus-visible:shadow-xl"
                    onMouseEnter={() => {
                      setFocusedListing(listing)
                    }}
                    onMouseLeave={() => {
                      setFocusedListing(null)
                    }}
                    onFocus={() => {
                      setFocusedListing(listing)
                    }}
                    onBlur={() => {
                      setFocusedListing(null)
                    }}
                    ref={cardRefs[index]}
                  >
                    <Link href={`/listings/${listing.slug}`} className="h-full block">
                      <div className="relative pb-[66.66%] overflow-hidden w-full">
                        <Media
                          resource={listing.featuredImage}
                          className="absolute top-0 left-0 w-full h-full"
                          imgClassName="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex flex-col gap-4">
                        <div className="flex justify-between gap-4 flex-wrap">
                          <div className="flex flex-col gap-2 flex-1">
                            <h3 className="sr-only">{listing.title}</h3>
                            <div>
                              <span className="text-2xl text-brand-gray-06 font-bold font-basic-sans leading-none">
                                {typeof listing.price === 'number' && listing.price !== 0
                                  ? `${formatPrice(listing.price)}`
                                  : 'Contact for price'}
                              </span>
                              {typeof listing.price === 'number' &&
                                listing.price !== 0 &&
                                listing.textAfterPrice && (
                                  <span className="text-sm ml-2">{listing.textAfterPrice}</span>
                                )}
                            </div>

                            <span className="text-xl font-light text-brand-gray-06">
                              {listing.city}, {listing.state}
                            </span>
                            <span className="text-base font-light font-basic-sans text-brand-gray-03">
                              {listing.streetAddress}
                            </span>
                          </div>
                          <div>
                            <Button
                              className="flex justify-center items-center w-12 h-12 p-0 rounded-full border border-brand-gray-00 bg-white text-brand-gray-06 hover:bg-brand-gray-00"
                              style={{ boxShadow: '0px 3px 10px rgba(0,0,0,.1)' }}
                              onClick={(e) => {
                                e.preventDefault()
                                const mailtoLink = `mailto:info@onwardrealestateteam.org?subject=${encodeURIComponent(`Onward Real Estate Property Inquiry: ${listing.streetAddress}, ${listing.city}, ${listing.state} ${listing.zipCode}`)}&body=${encodeURIComponent(`Hello,\n\n I am interested in receiving more information about ${listing.streetAddress}, ${listing.city}, ${listing.state} ${listing.zipCode}`)}.`
                                window.location.href = mailtoLink
                              }}
                            >
                              <FontAwesomeIcon icon={faEnvelope} fontWeight={300} size="lg" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-start flex-wrap">
                          {typeof listing.bedrooms === 'number' && listing.bedrooms > 0 && (
                            <div className="p-2 rounded-xl border border-brand-gray-01 flex gap-2 items-center">
                              <FontAwesomeIcon icon={faBedFront} className="w-6" />
                              <span className="text-base text-brand-gray-06 font-light">
                                {formatNumber(listing.bedrooms)}
                              </span>
                            </div>
                          )}
                          {typeof listing.bathrooms === 'number' && listing.bathrooms > 0 && (
                            <div className="p-2 rounded-xl border border-brand-gray-01 flex gap-2 items-center">
                              <FontAwesomeIcon icon={faBath} className="w-6" />
                              <span className="text-base text-brand-gray-06 font-light">
                                {formatNumber(listing.bathrooms)}
                              </span>
                            </div>
                          )}
                          {typeof listing.area === 'number' && listing.area > 0 && (
                            <div className="p-2 rounded-xl border border-brand-gray-01 flex gap-2 items-center">
                              <FloorPlanIcon className="w-6" />
                              <span className="text-base text-brand-gray-06 font-light">
                                {formatNumber(listing.area)} sqft
                              </span>
                            </div>
                          )}
                          {typeof listing.acreage === 'number' && listing.acreage > 0 && (
                            <div className="p-2 rounded-xl border border-brand-gray-01 flex gap-2 items-center">
                              <FontAwesomeIcon icon={faFarm} className="w-6 text-brand-navy" />
                              <span className="text-base text-brand-gray-06 font-light fill-brand-navy">
                                {formatNumber(listing.acreage)} acres
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </Card>
                )
              })}
            {/* {!isFirstRender && activeListings && activeListings.length > 0 && ( */}
            {/* <div className="col-span-full flex justify-center gap-2 items-center">
                 <Button
                    className="p-2 text-brand-gray-04"
                    variant="ghost"
                    onClick={() => {
                      if (hasPrevPage && prevPage) {
                        handleFetchListings(filters, 1)
                        window.scrollTo({ top: 0 })
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronDoubleLeft} className="w-4 h-4" />
                  </Button>
                  <Button
                    className="p-2 text-brand-gray-04"
                    variant="ghost"
                    onClick={() => {
                      if (hasPrevPage && prevPage) {
                        handleFetchListings(filters, prevPage)
                        window.scrollTo({ top: 0 })
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                  </Button>

                  <span className="font-light leading-none text-brand-gray-04">
                    {currentPage} of {totalPages}
                  </span>

                  <Button
                    className="p-2 text-brand-gray-04"
                    variant="ghost"
                    onClick={() => {
                      if (hasNextPage && nextPage) {
                        handleFetchListings(filters, nextPage)
                        window.scrollTo({ top: 0 })
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
                  </Button>
                  <Button
                    className="p-2 text-brand-gray-04"
                    variant="ghost"
                    onClick={() => {
                      if (hasNextPage && totalPages) {
                        handleFetchListings(filters, totalPages)
                        window.scrollTo({ top: 0 })
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronDoubleRight} className="w-4 h-4" />
                  </Button>

                   <Button
                    variant="outline"
                    className="p-0 w-8 h-8"
                    disabled={!hasPrevPage}
                    onClick={() => {
                      if (hasPrevPage && prevPage) {
                        handleFetchListings(filters, prevPage)
                        window.scrollTo({ top: 0 })
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </Button>
                  <Button
                    variant="outline"
                    className="p-0 w-8 h-8"
                    disabled={!hasNextPage}
                    onClick={() => {
                      if (hasNextPage && nextPage) {
                        handleFetchListings(filters, nextPage)
                        window.scrollTo({ top: 0 })
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Button>
                </div> */}
            {/* )} */}

            {!isFirstRender &&
              !isLoading &&
              (!activeListings ||
                (activeListings.length === 0 && (
                  <div className="p-5 text-center flex flex-col gap-4">
                    <span>No listings found</span>
                    <Button
                      onClick={() => {
                        handleReset()
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )))}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapMarkerIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="37" height="48" viewBox="0 0 37 48" fill="none" style="width: 100%">
        <path d="M18.1622 48C18.1622 48 36.3243 28.5 36.3243 18C36.3243 8.0625 28.1892 0 18.1622 0C8.13514 0 0 8.0625 0 18C0 28.5 18.1622 48 18.1622 48ZM18.1622 12C19.7678 12 21.3077 12.6321 22.443 13.7574C23.5784 14.8826 24.2162 16.4087 24.2162 18C24.2162 19.5913 23.5784 21.1174 22.443 22.2426C21.3077 23.3679 19.7678 24 18.1622 24C16.5565 24 15.0167 23.3679 13.8813 22.2426C12.7459 21.1174 12.1081 19.5913 12.1081 18C12.1081 16.4087 12.7459 14.8826 13.8813 13.7574C15.0167 12.6321 16.5565 12 18.1622 12Z" fill="#0B2A35" />
      </svg>`

function getSWCoordinates(coordinatesCollection: number[][]) {
  const lowestLng = Math.min(...coordinatesCollection.map((coordinates) => coordinates[0]))
  const lowestLat = Math.min(...coordinatesCollection.map((coordinates) => coordinates[1]))

  return [lowestLng, lowestLat]
}

function getNECoordinates(coordinatesCollection: number[][]) {
  const highestLng = Math.max(...coordinatesCollection.map((coordinates) => coordinates[0]))
  const highestLat = Math.max(...coordinatesCollection.map((coordinates) => coordinates[1]))

  return [highestLng, highestLat]
}

function calcBoundsFromCoordinates(coordinatesCollection: number[][]) {
  return [getSWCoordinates(coordinatesCollection), getNECoordinates(coordinatesCollection)]
}

export const FloorPlanIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={props.className}
      {...props}
    >
      <rect opacity="0.4" x="2" y="2" width="16" height="16" fill="#0B2A35" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 2H18V7V7.5V18H15.5V17.5H17.5V7.5H12V7H17.5V2.5H7V7H6.5V2.5H2.5V13H12V13.5H2.5V17.5H12V18H2V13.5V13V2H6.5H7Z"
        fill="#0B2A35"
      />
    </svg>
  )
}
