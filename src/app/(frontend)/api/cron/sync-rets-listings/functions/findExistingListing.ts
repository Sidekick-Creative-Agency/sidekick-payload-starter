import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Listing } from '@/payload-types'
export const findExistingListing = (listingKeyNumeric: number | undefined, listings: Listing[]) => {
  if (!listingKeyNumeric) return undefined
  return listings.find((listing) => listing.MLS?.ListingKeyNumeric === listingKeyNumeric)
}
