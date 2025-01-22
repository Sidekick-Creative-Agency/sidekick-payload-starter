'use server'

import { getPayload, PaginatedDocs } from 'payload'
import configPromise from '@payload-config'
import { Listing } from '@/payload-types'

interface FilterBody {
  search: string | null | undefined
  type: string | null | undefined
  minPrice: number | string | null | undefined
  maxPrice: number | string | null | undefined
  minSize: number | string | null | undefined
  maxSize: number | string | null | undefined
  sizeType: string | null | undefined
  availability: string | null | undefined
  listingType: string | null | undefined
}

export const filterMapListings = async (body?: FilterBody) => {
  try {
    const payload = await getPayload({ config: configPromise })
    let listings: PaginatedDocs<Listing> | undefined = undefined
    const propertyTypes = await payload.find({
      collection: 'property-types',
    })

    if (!body) {
      listings = await payload.find({
        collection: 'listings',
        limit: 25,
      })
      return listings
    }

    const propertyTypesString = propertyTypes.docs.map((type) => type.title.toLowerCase()).join(',')
    console.log(propertyTypesString)
    switch (body?.sizeType) {
      case 'sqft':
        listings = await payload.find({
          collection: 'listings',
          where: {
            and: [
              {
                or: [
                  {
                    streetAddress: {
                      like: body.search,
                    },
                  },
                  {
                    city: {
                      like: body.search,
                    },
                  },
                  {
                    state: {
                      like: body.search,
                    },
                  },
                  {
                    zipCode: {
                      like: body.search,
                    },
                  },
                ],
              },
              {
                and: [
                  {
                    price: {
                      greater_than_equal: body.minPrice ? Number(body.minPrice) : 0,
                    },
                  },
                  {
                    price: {
                      less_than_equal: body.maxPrice ? Number(body.maxPrice) : Infinity,
                    },
                  },
                ],
              },
              {
                and: [
                  {
                    area: {
                      greater_than_equal: body.minSize ? Number(body.minSize) : 0,
                    },
                  },
                  {
                    area: {
                      less_than_equal: body.maxSize ? Number(body.maxSize) : Infinity,
                    },
                  },
                ],
              },
              {
                availability: {
                  in: body.listingType ? [body.listingType] : ['for-sale', 'for-lease'],
                },
              },
              {
                type: {
                  contains: body.type ? body.type : '',
                },
              },
            ],
          },
        })
        break
      case 'acres':
        listings = await payload.find({
          collection: 'listings',
          where: {
            and: [
              {
                or: [
                  {
                    streetAddress: {
                      like: body.search,
                    },
                  },
                  {
                    city: {
                      like: body.search,
                    },
                  },
                  {
                    state: {
                      like: body.search,
                    },
                  },
                  {
                    zipCode: {
                      like: body.search,
                    },
                  },
                ],
              },
              {
                and: [
                  {
                    price: {
                      greater_than_equal: body.minPrice ? Number(body.minPrice) : 0,
                    },
                  },
                  {
                    price: {
                      less_than_equal: body.maxPrice ? Number(body.maxPrice) : Infinity,
                    },
                  },
                ],
              },
              {
                and: [
                  {
                    acreage: {
                      greater_than_equal: body.minSize ? Number(body.minSize) : 0,
                    },
                  },
                  {
                    acreage: {
                      less_than_equal: body.maxSize ? Number(body.maxSize) : Infinity,
                    },
                  },
                ],
              },
              {
                availability: {
                  in: body.listingType ? [body.listingType] : ['for-sale', 'for-lease'],
                },
              },
              {
                type: {
                  contains: body.type ? body.type : '',
                },
              },
            ],
          },
        })
        break
      default:
        listings = await payload.find({
          collection: 'listings',
          depth: 2,
          where: {
            and: [
              {
                or: [
                  {
                    streetAddress: {
                      like: body.search,
                    },
                  },
                  {
                    city: {
                      like: body.search,
                    },
                  },
                  {
                    state: {
                      like: body.search,
                    },
                  },
                  {
                    zipCode: {
                      like: body.search,
                    },
                  },
                ],
              },
              {
                and: [
                  {
                    price: {
                      greater_than_equal: body.minPrice ? Number(body.minPrice) : 0,
                    },
                  },
                  {
                    price: {
                      less_than_equal: body.maxPrice ? Number(body.maxPrice) : Infinity,
                    },
                  },
                ],
              },
              {
                availability: {
                  in: body.listingType ? body.listingType : 'for-sale,for-lease',
                },
              },
              {
                type: {
                  contains: body.type ? body.type : '',
                },
              },
            ],
          },
        })
        break
    }

    return listings
  } catch (error) {
    console.error(error)
    throw error
  }
}
