import 'mapbox-gl/dist/mapbox-gl.css'
import { ListingsMap } from '@/components/Map'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function Page() {
  const payload = await getPayload({
    config: configPromise,
  })
  const listingsDocs = await payload.find({
    collection: 'listings',
  })
  const listings = listingsDocs.docs
  return <ListingsMap listings={listings} />
}
