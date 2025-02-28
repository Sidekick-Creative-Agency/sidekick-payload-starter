import configPromise from '@payload-config'
import { getPayload } from 'payload'
export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  return null
}
