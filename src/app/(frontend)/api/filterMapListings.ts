'use server'

import { getPayload, PaginatedDocs } from 'payload'
import configPromise from '@payload-config'
import { Listing } from '@/payload-types'

interface FilterBody {
  search: string | null | undefined
  category: string | null | undefined
  propertyType: string | null | undefined
  minPrice: number | string | null | undefined
  maxPrice: number | string | null | undefined
  minSize: number | string | null | undefined
  maxSize: number | string | null | undefined
  sizeType: string | null | undefined
  availability: string | null | undefined
  transactionType: string | null | undefined
}

export const filterMapListings = async (body?: FilterBody) => {
  try {
    const payload = await getPayload({ config: configPromise })
    let listings: PaginatedDocs<Listing> | undefined = undefined

    if (!body) {
      listings = await payload.find({
        collection: 'listings',
      })
      return listings
    }

    listings = await payload.find({
      collection: 'listings',
      where: {
        and: [
          {
            ...(body.search
              ? {
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
                }
              : {
                  slug: {
                    exists: true,
                  },
                }),
          },

          {
            or: [
              {
                price: {
                  exists: false,
                },
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
            ],
          },
          {
            ...(body.sizeType && body.sizeType === 'sqft'
              ? {
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
                }
              : body.sizeType && body.sizeType === 'acres'
                ? {
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
                  }
                : {
                    slug: {
                      exists: true,
                    },
                  }),
          },
          {
            transactionType: {
              in: body.transactionType ? [body.transactionType] : ['for-sale', 'for-lease'],
            },
          },
          {
            'propertyType.id': {
              in: body.propertyType ? body.propertyType : [...Array(25).keys()],
            },
          },
          {
            availability: {
              in: body.availability ? [body.availability] : ['available', 'unavailable'],
            },
          },
          {
            category: {
              in: body.category ? [body.category] : ['commercial', 'residential'],
            },
          },
        ],
      },
    })

    return listings
  } catch (error) {
    console.error(error)
    throw error
  }
}
