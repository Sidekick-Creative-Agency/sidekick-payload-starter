'use server'

import { getPayload, PaginatedDocs, Where } from 'payload'
import configPromise from '@payload-config'
import { Listing } from '@/payload-types'
import { MAP_PAGINATION_LIMIT } from '@/utilities/constants'
import { Point } from 'lexical'

interface Filterfilters {
  search: string | null | undefined
  category: string | null | undefined
  propertyType: string | null | undefined
  minPrice: number | string | null | undefined
  maxPrice: number | string | null | undefined
  minSize: number | string | null | undefined
  maxSize: number | string | null | undefined
  sizeType: string | null | undefined
  // availability: string | null | undefined
  transactionType: string | null | undefined
}

export const getCardListings = async (data: {
  filters?: Filterfilters
  page?: number | null | undefined
  sort?: string | null | undefined
  bounds?: [number, number][]
}) => {
  try {
    const payload = await getPayload({ config: configPromise })
    let listings: PaginatedDocs<Listing> | undefined = undefined

    const { filters, page, sort, bounds } = data

    const whereQuery: Where = {
      and: [
        // PUBLISHED STATUS
        {
          _status: {
            equals: 'published',
          },
        },
        // AVAILABILITY STATUS
        {
          availability: {
            in: ['available', 'active'],
          },
        },
        // SEARCH
        {
          ...(filters?.search
            ? {
                or: [
                  {
                    title: {
                      like: filters.search,
                    },
                  },
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

        // // AVAILABILITY
        // {
        //   ...(filters?.availability
        //     ? {
        //         availability: {
        //           equals: filters.availability,
        //         },
        //       }
        //     : {}),
        // },

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
        // BOUNDS
        {
          ...(bounds
            ? {
                coordinates: {
                  within: {
                    type: 'Polygon',
                    coordinates: [bounds],
                  },
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

export const getMapListings = async (data: {
  filters?: Filterfilters
  bounds?: [number, number][]
}) => {
  try {
    const payload = await getPayload({ config: configPromise })
    const { filters, bounds } = data

    const whereQuery: Where = {
      and: [
        // PUBLISHED STATUS
        {
          _status: {
            equals: 'published',
          },
        },
        // AVAILABILITY STATUS
        {
          availability: {
            in: ['available', 'active'],
          },
        },
        // SEARCH
        {
          ...(filters?.search
            ? {
                or: [
                  {
                    title: {
                      like: filters.search,
                    },
                  },
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

        // // AVAILABILITY
        // {
        //   ...(filters?.availability
        //     ? {
        //         availability: {
        //           equals: filters.availability,
        //         },
        //       }
        //     : {}),
        // },

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
        // BOUNDS
        {
          ...(bounds
            ? {
                coordinates: {
                  within: {
                    type: 'Polygon',
                    coordinates: [bounds],
                  },
                },
              }
            : {}),
        },
      ],
    }

    const listings = await payload.find({
      collection: 'listings',
      pagination: false,
      where: whereQuery,
      select: {
        coordinates: true,
        title: true,
        featuredImage: true,
        slug: true,
        streetAddress: true,
        price: true,
        textAfterPrice: true,
        transactionType: true,
        category: true,
        MLS: {
          ListOfficeName: true,
        },
      },
    })
    return listings
  } catch (error) {
    console.error(error)
    throw error
  }
}
