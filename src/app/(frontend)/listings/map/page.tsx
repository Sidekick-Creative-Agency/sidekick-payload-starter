import 'mapbox-gl/dist/mapbox-gl.css'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PageClient } from './page.client'
import { Suspense } from 'react'
import { searchFields } from '../../../../search/fieldOverrides'
import { filterMapListings } from '../../api/filterMapListings'

export default async function Page({ searchParams }) {
  const awaitedSearchParams = await searchParams

  const search = awaitedSearchParams.search || ''
  const propertyType = awaitedSearchParams.property_type || ''
  const minPrice = awaitedSearchParams.min_price || ''
  const maxPrice = awaitedSearchParams.max_price || ''
  const sizeType = awaitedSearchParams.size_type || ''
  const minSize = awaitedSearchParams.min_size || ''
  const maxSize = awaitedSearchParams.max_size || ''
  const availability = awaitedSearchParams.availability || ''
  const transactionType = awaitedSearchParams.transaction_type || ''

  const payload = await getPayload({
    config: configPromise,
  })
  const listingsDocs = await filterMapListings({
    search,
    propertyType,
    minPrice,
    maxPrice,
    sizeType,
    minSize,
    maxSize,
    availability,
    transactionType,
  })
  const listings = listingsDocs.docs
  return (
    <Suspense>
      <PageClient listings={listings} />
    </Suspense>
  )
}
