'use client'
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer, Image } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './styles.scss'
import { Listing, Media as MediaType } from '@/payload-types'

import { useEffect, useRef, useState } from 'react'
import mapboxgl, { LngLatBoundsLike, LngLatLike, Map, Marker } from 'mapbox-gl'
import { Card } from '../ui/card'
import { Media } from '../Media'
import { Button } from '../ui/button'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFarm } from '@awesome.me/kit-a7a0dd333d/icons/sharp-duotone/thin'
import { faEnvelope } from '@awesome.me/kit-a7a0dd333d/icons/sharp/light'
import { formatNumber } from '@/utilities/formatNumber'
import { formatPrice } from '@/utilities/formatPrice'

interface ListingsMapProps {
  listings: Listing[]
}

export const ListingsMap: React.FC<ListingsMapProps> = ({ listings }) => {
  const mapContainerRef = useRef<any>(null)
  const mapRef = useRef<Map>(null)
  const [boundingBox, setBoundingBox] = useState<number[][]>([])
  const [activeMarkers, setActiveMarkers] = useState<Marker[]>([])

  const geoJson = {
    type: 'FeatureCollection',
    features: listings.map((listing) => {
      return {
        type: 'Feature',
        properties: {
          title: listing.title,
          address: listing.streetAddress,
          price: listing.price ? formatPrice(listing.price) : '',
          image: listing.featuredImage,
          lat: listing.latitude,
          lon: listing.longitude,
          iconSize: 32,
        },
        geometry: {
          type: 'Point',
          coordinates: [listing.longitude, listing.latitude],
        },
      }
    }),
  }

  const updateMarkers = () => {
    setActiveMarkers([])
  }

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
        center: [listing.longitude, listing.latitude],
        speed: 0.5,
      })
      const matchingMarker = activeMarkers.find(
        (marker) =>
          marker.getLngLat().lng === listing.longitude &&
          marker.getLngLat().lat === listing.latitude,
      )
      if (matchingMarker && !matchingMarker.getPopup()?.isOpen()) {
        matchingMarker.togglePopup()
      }
      // mapRef.current.fire('click', {
      //   lngLat: new mapboxgl.LngLat(coords[0], coords[1]),
      //   point: mapRef.current.project(coords as LngLatLike),
      //   originalEvent: {},
      // })
    }
  }

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
      container: mapContainerRef.current,
      center: [-97.2753695, 31.5532499],
      zoom: 10,
      scrollZoom: false,
    })

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
                    <img src="${(feature.properties.image as MediaType)?.sizes?.small?.url}" alt="${(feature.properties.image as MediaType).alt}" class="marker-popup_image w-full absolute top-0 left-0 h-full object-cover" />
                  </div>
                  <div class="p-6 bg-white flex flex-col-reverse">
                    <h3 class="marker-title font-basic-sans text-brand-gray-04 text-base font-light">${feature.properties.address}</h3>
                    <span class="marker-description text-2xl font-basic-sans font-bold text-brand-gray-06">${feature.properties.price ? `${feature.properties.price}` : 'Contact for price'}</span>
                  </div>
                </div>

                `,
          ),
        )
        .addTo(mapRef.current)
      setActiveMarkers((current) => [...current, newMarker])

      el.addEventListener('click', (e) => {
        const coords = newMarker.getLngLat()
        mapRef.current?.flyTo({
          center: coords,
          speed: 0.5,
        })
      })
    }
    return () => {
      mapRef.current?.remove()
    }
  }, [])

  useEffect(() => {
    centerMap()
  }, [boundingBox])

  return (
    <div className="w-full border-t border-gray-100 grid grid-cols-5">
      <div className="col-span-3 relative">
        <div
          id="map"
          ref={mapContainerRef}
          style={{ height: '100%', minHeight: 'calc(100vh - 5rem)' }}
        ></div>
      </div>

      <div className="col-span-2 grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] xl:grid-cols-2  gap-x-4 gap-y-6 p-6 content-start bg-white">
        {listings &&
          listings.length > 0 &&
          listings.map((listing) => {
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
                  <div className="p-6">
                    <div className="flex justify-between gap-4">
                      <div className="flex flex-col gap-2 flex-1">
                        <h3 className="sr-only">{listing.title}</h3>
                        <span className="text-2xl text-brand-gray-06 font-bold font-basic-sans leading-none">
                          {listing.price ? `${formatPrice(listing.price)}` : 'Contact for price'}
                        </span>
                        <span className="text-xl font-light text-brand-gray-06">
                          {listing.city}, {listing.state}
                        </span>
                        <span className="text-base font-light font-basic-sans text-brand-gray-03">
                          {listing.streetAddress}
                        </span>
                      </div>
                      <div>
                        <Button
                          className="flex justify-center items-center w-12 h-12 p-0 rounded-full border border-brand-gray-00 bg-white text-brand-gray-06"
                          style={{ boxShadow: '0px 3px 10px rgba(0,0,0,.1)' }}
                        >
                          <FontAwesomeIcon icon={faEnvelope} fontWeight={300} size="lg" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-start">
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
