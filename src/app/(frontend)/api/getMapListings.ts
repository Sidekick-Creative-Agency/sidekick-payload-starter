'use server'

import { getPayload, PaginatedDocs, Where } from 'payload'
import configPromise from '@payload-config'
import { Listing } from '@/payload-types'
import { MAP_PAGINATION_LIMIT } from '@/utilities/constants'

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

export const getMapListings = async (data: {
  filters?: Filterfilters
  page?: number | null | undefined
  sort?: string | null | undefined
}) => {
  try {
    const payload = await getPayload({ config: configPromise })
    let listings: PaginatedDocs<Listing> | undefined = undefined

    const { filters, page, sort } = data

    const whereQuery: Where = {
      and: [
        // PUBLISHED STATUS
        {
          _status: {
            equals: 'published',
          },
        },

        // SEARCH
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
            : {}),
        },

        // PRICE
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

        // SIZE
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
              : {}),
        },

        // TRANSACTION TYPE
        {
          ...(filters?.transactionType && filters.transactionType !== 'all'
            ? {
                transactionType: {
                  equals: filters.transactionType,
                },
              }
            : {}),
        },

        // PROPERTY TYPE
        {
          ...(filters?.propertyType && filters.propertyType !== 'all'
            ? {
                'propertyType.id': {
                  equals: filters.propertyType,
                },
              }
            : {}),
        },

        // AVAILABILITY
        {
          ...(filters?.availability
            ? {
                availability: {
                  equals: filters.availability,
                },
              }
            : {}),
        },

        // CATEGORY
        {
          ...(filters?.category && filters.category !== 'all'
            ? {
                category: {
                  equals: filters.category,
                },
              }
            : {}),
        },
      ],
    }

    listings = await payload.find({
      collection: 'listings',
      ...(MAP_PAGINATION_LIMIT
        ? {
            limit: MAP_PAGINATION_LIMIT,
          }
        : {}),
      ...(page ? { page } : {}),
      where: whereQuery,
      ...(sort
        ? {
            sort: sort.split(','),
          }
        : {}),
    })

    return listings
  } catch (error) {
    console.error(error)
    throw error
  }
}
