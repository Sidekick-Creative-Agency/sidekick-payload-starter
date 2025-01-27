import { TeamMember, Media as MediaType, Listing, PropertyType } from '@/payload-types'
import React from 'react'
import { Media } from '../Media'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@awesome.me/kit-a7a0dd333d/icons/sharp-duotone/thin'
import { Button } from '../ui/button'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { faPlus } from '@awesome.me/kit-a7a0dd333d/icons/sharp/regular'
import RichText from '../RichText'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { formatPrice } from '../../utilities/formatPrice'

interface ListingCardProps {
  listing: Listing
}
export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="w-full relative p-8 flex items-end pt-40 h-full "
    >
      <Media
        resource={listing.featuredImage}
        className="absolute top-0 left-0 w-full h-full overflow-hidden bg-gradient-to-t from-black to-transparent via-transparent"
        imgClassName="object-cover w-full h-full relative -z-10"
      />
      {listing.type && listing.type[0] && (
        <div className="absolute top-4 -left-4 py-2 px-6 bg-brand-blue before:content-[''] before:absolute before:top-full before:left-0 before:w-0 before:h-0 before:border-[.725rem] before:border-transparent before:border-l-brand-blue before:opacity-50 before:-rotate-45 before:origin-top-left before:-z-20">
          <span className="text-white text-sm font-bold tracking-wider leading-none uppercase">
            {(listing.type[0] as PropertyType).title}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2 w-full relative z-10">
        <h3 className="text-white font-bold uppercase tracking-wider">
          {listing.city}, {listing.state}
        </h3>
        <span className="text-white uppercase text-sm font-bold tracking-wider">
          {listing.streetAddress}
        </span>
        {listing.price && (
          <span className="text-xl font-light text-white">
            {formatPrice(listing.price)}{' '}
            {listing.availability === 'for-lease' && <span className="text-sm">per sqft</span>}
          </span>
        )}
        {!listing.price && <span className="text-xl font-light text-white">Contact for price</span>}
      </div>
    </Link>
  )
}
