import { Listing } from '@/payload-types'
import { RETSListing } from '../types/types'

export const checkNeedsUpdate = (listing: Listing, retsListing: RETSListing) => {
  if (listing.MLS?.ModificationTimestamp === retsListing.ModificationTimestamp) {
    console.log(`NO UPDATE NEEDED FOR LISTING: ${listing.title}\n\n`)
    return false
  }
  return true
}
