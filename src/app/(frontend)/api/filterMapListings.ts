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
    const propertyTypes = await payload.find({
      collection: 'property-types',
    })

    if (!body) {
      listings = await payload.find({
        collection: 'listings',
      })
      return listings
    }

    const propertyTypesString = propertyTypes.docs.map((type) => type.title.toLowerCase()).join(',')
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
                transactionType: {
                  in: body.transactionType ? [body.transactionType] : ['for-sale', 'for-lease'],
                },
              },
              {
                propertyType: {
                  contains: body.propertyType ? Number(body.propertyType) : [...Array(25).keys()],
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
                transactionType: {
                  in: body.transactionType ? [body.transactionType] : ['for-sale', 'for-lease'],
                },
              },
              {
                propertyType: {
                  contains: body.propertyType ? Number(body.propertyType) : [...Array(25).keys()],
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
                      like: body.search ? body.search : '',
                    },
                  },
                  {
                    city: {
                      like: body.search ? body.search : '',
                    },
                  },
                  {
                    state: {
                      like: body.search ? body.search : '',
                    },
                  },
                  {
                    zipCode: {
                      like: body.search ? body.search : '',
                    },
                  },
                ],
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
                transactionType: {
                  in: body.transactionType ? body.transactionType : 'for-sale,for-lease',
                },
              },
              // {
              //   propertyType: {
              //     contains: body.propertyType ? Number(body.propertyType) : 1,
              //   },
              // },
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
        break
    }

    return listings
  } catch (error) {
    console.error(error)
    throw error
  }
}
