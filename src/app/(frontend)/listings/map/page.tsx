import 'mapbox-gl/dist/mapbox-gl.css'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PageClient } from './page.client'

export default async function Page() {
  const payload = await getPayload({
    config: configPromise,
  })
  const listingsDocs = await payload.find({
    collection: 'listings',
  })
  const listings = listingsDocs.docs
  return <PageClient listings={listings} />
}
