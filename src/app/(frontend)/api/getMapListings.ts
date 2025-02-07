'use server'

import { getPayload, PaginatedDocs } from 'payload'
import configPromise from '@payload-config'
import { Listing } from '@/payload-types'

interface Filterfilters {
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

export const getMapListings = async (data?: {
  filters?: Filterfilters
  page?: number | null | undefined
}) => {
  try {
    const payload = await getPayload({ config: configPromise })
    let listings: PaginatedDocs<Listing> | undefined = undefined

    if (!data) {
      listings = await payload.find({
        collection: 'listings',
      })
      return listings
    }
    const { filters, page } = data
    listings = await payload.find({
      collection: 'listings',
      limit: 2,
      ...(page ? { page: page } : {}),
      where: {
        and: [
          {
            ...(filters?.search
              ? {
                  or: [
                    {
                      streetAddress: {
                        like: filters.search,
                      },
                    },
                    {
                      city: {
                        like: filters.search,
                      },
                    },
                    {
                      state: {
                        like: filters.search,
                      },
                    },
                    {
                      zipCode: {
                        like: filters.search,
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
                      greater_than_equal: filters?.minPrice ? Number(filters.minPrice) : 0,
                    },
                  },
                  {
                    price: {
                      less_than_equal: filters?.maxPrice ? Number(filters.maxPrice) : Infinity,
                    },
                  },
                ],
              },
            ],
          },
          {
            ...(filters?.sizeType && filters.sizeType === 'sqft'
              ? {
                  and: [
                    {
                      area: {
                        greater_than_equal: filters.minSize ? Number(filters.minSize) : 0,
                      },
                    },
                    {
                      area: {
                        less_than_equal: filters.maxSize ? Number(filters.maxSize) : Infinity,
                      },
                    },
                  ],
                }
              : filters?.sizeType && filters.sizeType === 'acres'
                ? {
                    and: [
                      {
                        acreage: {
                          greater_than_equal: filters.minSize ? Number(filters.minSize) : 0,
                        },
                      },
                      {
                        acreage: {
                          less_than_equal: filters.maxSize ? Number(filters.maxSize) : Infinity,
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
              in: filters?.transactionType ? [filters.transactionType] : ['for-sale', 'for-lease'],
            },
          },
          {
            'propertyType.id': {
              in: filters?.propertyType ? filters.propertyType : [...Array(25).keys()],
            },
          },
          {
            availability: {
              in: filters?.availability ? [filters.availability] : ['available', 'unavailable'],
            },
          },
          {
            category: {
              in: filters?.category ? [filters.category] : ['commercial', 'residential'],
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
