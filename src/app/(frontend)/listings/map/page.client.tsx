'use client'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Listing, Media as MediaType } from '@/payload-types'
import { useEffect, useRef, useState } from 'react'
import mapboxgl, { LngLatBoundsLike, LngLatLike, Map, Marker } from 'mapbox-gl'
import { Card } from '../../../../components/ui/card'
import { Media } from '../../../../components/Media'
import { Button } from '../../../../components/ui/button'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFarm } from '@awesome.me/kit-a7a0dd333d/icons/sharp-duotone/thin'
import {
  faEnvelope,
  faArrowUpArrowDown,
  faCircleNotch,
  faList,
  faMap,
  faChevronLeft,
  faChevronRight,
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

const sortByOptions = [
  {
    value: 'price-desc',
    label: 'Price (High to Low)',
  },
  {
    value: 'price-asc',
    label: 'Price (Low to High)',
  },
  {
    value: 'size-desc',
    label: 'Size (High to Low)',
  },
  {
    value: 'size-asc',
    label: 'Size (Low to High)',
  },
  {
    value: 'date-desc',
    label: 'Newest',
  },
  {
    value: 'date-asc',
    label: 'Oldest',
  },
]

export const PageClient: React.FC<MapPageClientProps> = ({ listingsCount }) => {
  const mapContainerRef = useRef<any>(null)
  const mapRef = useRef<Map>(null)
  const { width } = useWindowDimensions()
  const [activeListings, setActiveListings] = useState<Listing[]>([])
  const [boundingBox, setBoundingBox] = useState<number[][]>([])
  const [activeMarkers, setActiveMarkers] = useState<Marker[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('map')
  const [filters, setFilters] = useState<MapFilters | undefined>(undefined)
  const [hasNextPage, setHasNextPage] = useState<boolean | null | undefined>(undefined)
  const [hasPrevPage, setHasPrevPage] = useState<boolean | null | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState<number | null | undefined>(undefined)
  const [nextPage, setNextPage] = useState<number | null | undefined>(undefined)
  const [prevPage, setPrevPage] = useState<number | null | undefined>(undefined)
  const { setHeaderTheme } = useHeaderTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [sortBy, setSortBy] = useState<{ value: string; label: string } | undefined>(undefined)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const centerMap = () => {
    if (boundingBox.length > 1) {
      mapRef.current?.fitBounds(calcBoundsFromCoordinates(boundingBox) as LngLatBoundsLike, {
        padding: { top: 128, bottom: 128, left: 128, right: 128 },
      })
    } else if (boundingBox.length === 1) {
      mapRef.current?.flyTo({
        center: boundingBox[0] as LngLatLike,
        speed: 0.5,
      })
    }
  }

  const handleCardMouseEnter = (listing: Listing) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [listing.coordinates[0], listing.coordinates[1]],
        speed: 0.5,
      })
      activeMarkers.forEach((marker) => {
        if (
          marker.getLngLat().lng === listing.coordinates[0] &&
          marker.getLngLat().lat === listing.coordinates[1] &&
          !marker.getPopup()?.isOpen()
        ) {
          marker.togglePopup()
        } else if (marker.getPopup()?.isOpen()) {
          marker.togglePopup()
        }
      })
    }
  }

  const handleFetchListings = async (filterData?: MapFilters, page?: number) => {
    setIsLoading(true)
    if (filterData) {
      setFilters(filterData)
      const newSearchParams = new URLSearchParams(searchParams)
      if (filterData.search) {
        newSearchParams.set('search', filterData.search)
      }
      if (filterData.category) {
        newSearchParams.set('category', filterData.category)
      }
      if (filterData.propertyType) {
        newSearchParams.set('property_type', filterData.propertyType)
      }
      if (filterData.minPrice) {
        newSearchParams.set('min_price', filterData.minPrice.toString())
      }
      if (filterData.maxPrice) {
        newSearchParams.set('max_price', filterData.maxPrice.toString())
      }
      if (filterData.minSize) {
        newSearchParams.set('min_size', filterData.minSize.toString())
      }
      if (filterData.maxSize) {
        newSearchParams.set('max_size', filterData.maxSize.toString())
      }
      if (filterData.availability) {
        newSearchParams.set('availability', filterData.availability.toString())
      }
      if (filterData.transactionType) {
        newSearchParams.set('transaction_type', filterData.transactionType.toString())
      }
      if (filterData.sizeType) {
        newSearchParams.set('size_type', filterData.sizeType.toString())
      }
      router.replace(pathname + '?' + newSearchParams.toString(), { scroll: false })
    }

    const response = await getMapListings({
      filters: filterData ? filterData : filters,
      page: page,
    })
    console.log(response.nextPage)
    setCurrentPage(response.page)
    setPrevPage(response.prevPage)
    setHasPrevPage(response.hasPrevPage)
    setNextPage(response.nextPage)
    setHasNextPage(response.hasNextPage)
    setActiveListings(response.docs)
    setIsLoading(false)
  }

  useEffect(() => {
    activeMarkers.forEach((marker) => marker.remove())
    setActiveMarkers([])
    setBoundingBox([])
    if (activeListings && activeListings.length > 0) {
      const geoJson = {
        type: 'FeatureCollection',
        features: activeListings.map((listing) => {
          return {
            type: 'Feature',
            properties: {
              title: listing.title,
              address: listing.streetAddress,
              price: listing.price ? formatPrice(listing.price) : '',
              transactionType: listing.transactionType,
              image: listing.featuredImage,
              lat: listing.coordinates[1],
              lon: listing.coordinates[0],
              iconSize: 32,
            },
            geometry: {
              type: 'Point',
              coordinates: [listing.coordinates[0], listing.coordinates[1]],
            },
          }
        }),
      }
      for (const feature of geoJson.features) {
        setBoundingBox((current) => [...current, feature.geometry.coordinates])
        const el = document.createElement('div')
        const size = feature.properties.iconSize
        el.className = 'marker'
        el.style.maxWidth = `${size}px`

        el.innerHTML = mapMarkerIcon

        const newMarker = new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates as LngLatLike)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `
                <div class="marker-popup rounded-lg overflow-hidden">
                  <div class="marker-popup_image-container relative aspect-video">
                    <img src="${(feature.properties.image as MediaType)?.sizes?.medium?.url || null}" alt="${(feature?.properties?.image as MediaType)?.alt || ''}" class="marker-popup_image w-full absolute top-0 left-0 h-full object-cover" />
                  </div>
                  <div class="p-6 bg-white flex flex-col-reverse">
                    <h3 class="marker-title font-basic-sans text-brand-gray-04 text-base font-light">${feature.properties.address}</h3>
                    <span class="marker-description text-2xl font-basic-sans font-bold text-brand-gray-06">${
                      feature.properties.price
                        ? `${feature.properties.price}${
                            feature.properties.transactionType === 'for-lease'
                              ? '<span class="text-sm ml-2 font-normal">per sqft</span>'
                              : ''
                          }`
                        : 'Contact for price'
                    }</span>
                  </div>
                </div>
                `,
            ),
          )
        setActiveMarkers((current) => [...current, newMarker])
        if (mapRef.current) {
          newMarker.addTo(mapRef.current)
        }
        el.addEventListener('click', (e) => {
          const coords = newMarker.getLngLat()
          mapRef.current?.flyTo({
            center: coords,
            speed: 0.5,
          })
        })
      }
    }
  }, [activeListings])

  useEffect(() => {
    setHeaderTheme('filled')
    setIsFirstRender(false)

    mapRef.current = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
      container: mapContainerRef.current,
      center: [-97.2753695, 31.5532499],
      zoom: 10,
      scrollZoom: false,
    })
    // FETCH PROPERTIES ON FIRST RENDER

    setIsLoading(true)
    const filterData = {
      search: searchParams.get('search'),
      category: searchParams.get('category'),
      propertyType: searchParams.get('property_type'),
      minPrice: searchParams.get('min_price'),
      maxPrice: searchParams.get('max_price'),
      sizeType: searchParams.get('size_type'),
      minSize: searchParams.get('min_size'),
      maxSize: searchParams.get('max_size'),
      availability: searchParams.get('availability'),
      transactionType: searchParams.get('transaction_type') as
        | 'for-sale'
        | 'for-lease'
        | null
        | undefined,
    }
    handleFetchListings(filterData)

    return () => {
      mapRef.current?.remove()
    }
  }, [])

  useEffect(() => {
    centerMap()
  }, [boundingBox])

  useEffect(() => {
    console.log(hasPrevPage)
    console.log(prevPage)
    console.log(hasNextPage)
    console.log(nextPage)
  }, [hasPrevPage, prevPage, hasNextPage, nextPage])

  const resetFilters = async () => {
    try {
      setIsLoading(true)
      router.replace(pathname, { scroll: false })
      form.reset()
      handleFetchListings()
    } catch (error: any) {
      console.log(error.message)
      router.push(pathname)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <FilterBar handleFilter={handleFetchListings} form={form} isLoading={isLoading} />
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
              {!isFirstRender && !isLoading && activeListings.length} of {listingsCount} Listings
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-lg text-brand-gray-03 font-medium tracking-normal flex items-center gap-2 rounded-none focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2">
                <FontAwesomeIcon icon={faArrowUpArrowDown} className="w-5 h-auto" />{' '}
                {sortBy ? sortBy.label : 'Sort By'}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-none">
                <DropdownMenuRadioGroup
                  value={sortBy?.value}
                  onValueChange={(value) =>
                    setSortBy(sortByOptions.find((_option) => _option.value === value))
                  }
                >
                  {sortByOptions.map((option) => {
                    return (
                      <DropdownMenuRadioItem
                        key={option.value}
                        className="hover:bg-brand-blue rounded-none"
                        value={option.value}
                      >
                        {option.label}
                      </DropdownMenuRadioItem>
                    )
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] xl:grid-cols-2 gap-x-4 gap-y-6 p-6 content-start ">
            {(isFirstRender || isLoading) &&
              Array.from(Array(4).keys()).map((_, index) => {
                return (
                  <Card key={index} className="rounded-none bg-white border-none shadow-md">
                    <div className="relative pb-[66.66%] overflow-hidden w-full">
                      <Skeleton className="absolute w-full h-full top-0 left-0" />
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
              activeListings.map((listing) => {
                return (
                  <Card
                    key={listing.id}
                    className="rounded-none bg-white border-none shadow-md"
                    onMouseEnter={() => {
                      handleCardMouseEnter(listing)
                    }}
                  >
                    <Link href={`/listings/${listing.slug}`}>
                      <div className="relative pb-[66.66%] overflow-hidden w-full">
                        <Media
                          resource={listing.featuredImage}
                          className="absolute top-0 left-0 w-full h-full"
                          imgClassName="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex flex-col gap-4">
                        <div className="flex justify-between gap-4">
                          <div className="flex flex-col gap-2 flex-1">
                            <h3 className="sr-only">{listing.title}</h3>
                            <div>
                              <span className="text-2xl text-brand-gray-06 font-bold font-basic-sans leading-none">
                                {listing.price
                                  ? `${formatPrice(listing.price)}`
                                  : 'Contact for price'}
                              </span>
                              {listing.price && listing.transactionType === 'for-lease' && (
                                <span className="text-sm ml-2">per sqft</span>
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
                            >
                              <FontAwesomeIcon icon={faEnvelope} fontWeight={300} size="lg" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-start flex-wrap">
                          {listing.area && (
                            <div className="p-2 rounded-xl border border-brand-gray-01 flex gap-2 items-center">
                              <FloorPlanIcon className="w-6" />
                              <span className="text-base text-brand-gray-06 font-light">
                                {formatNumber(listing.area)} sqft
                              </span>
                            </div>
                          )}
                          {listing.acreage && (
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
            {!isFirstRender && activeListings && activeListings.length > 0 && (
              <div className="col-span-full flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="p-0 w-8 h-8"
                  disabled={!hasPrevPage}
                  onClick={() => {
                    if (hasPrevPage && prevPage) {
                      handleFetchListings(undefined, prevPage)
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
                      handleFetchListings(undefined, nextPage)
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </Button>
              </div>
            )}

            {!isFirstRender &&
              !isLoading &&
              (!activeListings ||
                (activeListings.length === 0 && (
                  <div className="p-5 text-center flex flex-col gap-4">
                    <span>No listings found</span>
                    <Button
                      onClick={() => {
                        resetFilters()
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
  <path d="M18.1622 48C18.1622 48 36.3243 28.5 36.3243 18C36.3243 8.0625 28.1892 0 18.1622 0C8.13514 0 0 8.0625 0 18C0 28.5 18.1622 48 18.1622 48ZM18.1622 12C19.7678 12 21.3077 12.6321 22.443 13.7574C23.5784 14.8826 24.2162 16.4087 24.2162 18C24.2162 19.5913 23.5784 21.1174 22.443 22.2426C21.3077 23.3679 19.7678 24 18.1622 24C16.5565 24 15.0167 23.3679 13.8813 22.2426C12.7459 21.1174 12.1081 19.5913 12.1081 18C12.1081 16.4087 12.7459 14.8826 13.8813 13.7574C15.0167 12.6321 16.5565 12 18.1622 12Z" fill="#0B2A35"/>
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
