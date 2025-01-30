'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const findPropertyTypeIdByTitle = async (title: string) => {
  const payload = await getPayload({ config: configPromise })
  const propertyType = await payload.find({
    collection: 'property-types',
    limit: 1,
    where: {
      title: {
        like: title,
      },
    },
  })
  console.log(propertyType)
  return propertyType?.docs?.at(0)?.id || undefined
}
