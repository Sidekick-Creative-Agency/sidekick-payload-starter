import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { fetchRETSListings } from './functions/fetchRETSListings'
import { findExistingListing } from './functions/findExistingListing'
import { updateListing } from './functions/updateListing'
import { createListing } from './functions/createListing'
import { Listing } from '@/payload-types'
import { checkNeedsUpdate } from './functions/checkNeedsUpdate'
import { NextRequest } from 'next/server'

export const maxDuration = 300

export async function GET(request: NextRequest) {
  try {
    const headers = request.headers
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams?.get('limit') || '500'
    const offset = searchParams?.get('offset') || '0'
    const cronSecret = process.env.CRON_SECRET
    const authSecret = headers.get('Authorization')?.split(' ')[1]

    if (cronSecret !== authSecret) {
      console.log('ERROR: INVALID CREDENTIALS')
      return new Response(
        JSON.stringify({
          error: 'Unauthorized',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
    console.log('LIMIT: ' + limit)
    console.log('OFFSET: ' + offset)

    const payload = await getPayload({ config: configPromise })
    const existingListings = await payload
      .find({
        collection: 'listings',
        pagination: false,
      })
      .then((res) => res.docs)
    const existingMedia = await payload
      .find({
        collection: 'media',
        pagination: false,
      })
      .then((res) => res.docs)
    const retsListings = await fetchRETSListings(limit, offset)
    if (!retsListings) return
    const BATCH_SIZE = 100
    const createdOrUpdatedListings: Listing[] = []
    const batchedListings = retsListings.filter((retsListing) => {
      const existingListing = findExistingListing(retsListing.ListingKeyNumeric, existingListings)
      if (existingListing) {
        console.log('LISTING ALREADY EXISTS: ' + existingListing.title)
        console.log('CHECKING FOR UPDATE FOR: ' + existingListing.title)
        return checkNeedsUpdate(existingListing, retsListing)
      }
      return true
    })

    console.log('BATCHING ' + batchedListings.length + ' LISTINGS\n\n')

    for (let i = 0; i < batchedListings.length; i += BATCH_SIZE) {
      const batchNum = Math.floor(i / BATCH_SIZE)
      console.log('RUNNING BATCH: ' + batchNum)
      const offsetMs = batchNum * 5000 // 1 second per batch, adjust as needed
      const retsListingPromises = batchedListings
        .slice(i, i + BATCH_SIZE)
        .map(async (retsListing) => {
          return new Promise<Listing | undefined>((resolve) => {
            setTimeout(async () => {
              const existingListing = findExistingListing(
                retsListing.ListingKeyNumeric,
                existingListings,
              )
              if (existingListing) {
                console.log('UPDATING LISTING: ' + existingListing.title)
                const updatedListing = await updateListing(
                  existingListing,
                  retsListing,
                  existingMedia,
                )
                if (updatedListing) {
                  createdOrUpdatedListings.push(updatedListing)
                }
                resolve(updatedListing)
              } else {
                const createdListing = await createListing(retsListing, existingMedia)
                if (createdListing) {
                  createdOrUpdatedListings.push(createdListing)
                }
                resolve(createdListing)
              }
            }, 5000)
          })
        })
      await Promise.all(retsListingPromises)
    }

    return new Response(
      JSON.stringify({
        listings: createdOrUpdatedListings.filter((listing) => listing),
      }),
      {
        status: 200,
        statusText: 'Success',
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('ERROR SYNCING RETS LISTINGS: ' + error)
    return new Response(
      JSON.stringify({
        listings: undefined,
      }),
      {
        status: 500,
        statusText: 'Unexpected error while syincing RETS Listings',
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
