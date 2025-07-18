import { Listing } from '@/payload-types'
export const findExistingListing = (listingKeyNumeric: number | undefined, listings: Listing[]) => {
  if (!listingKeyNumeric) return undefined
  return listings.find((listing) => listing.MLS?.ListingKeyNumeric === listingKeyNumeric)
}
