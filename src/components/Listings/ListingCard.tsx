import { Listing } from '@/payload-types'
import React from 'react'
import { Media } from '../Media'
import Link from 'next/link'
import { formatPrice } from '../../utilities/formatPrice'
import * as motion from 'motion/react-client'

interface ListingCardProps {
  listing: Listing
}
export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="w-full relative p-8 pl-12 flex items-end min-h-[20rem] md:min-h-[25rem] h-full "
    >
      <Media
        resource={listing.featuredImage}
        className="absolute top-0 left-4 w-calc(100%-1rem) h-full overflow-hidden z-0"
        imgClassName="object-cover w-full h-full relative"
        size="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (min-width: 1025px) 33.3vw"
      />
      <div className="absolute top-0 left-4 w-[calc(100%-1rem)] h-full bg-gradient-to-t from-black to-transparent via-transparent z-10"></div>
      {listing.category && (
        <div
          className={`absolute top-4 left-0 py-2 px-6 ${listing.category === 'commercial' ? 'bg-brand-brown before:border-l-brand-brown' : 'bg-brand-blue before:border-l-brand-blue'} before:content-[''] before:absolute before:top-full before:left-0 before:w-0 before:h-0 before:border-[.725rem] before:border-transparent  before:opacity-50 before:-rotate-45 before:origin-top-left`}
        >
          <span className="text-white text-sm font-bold tracking-wider leading-none uppercase">
            {listing.category}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2 w-full relative z-10">
        <motion.h3
          className="text-white text-2xl font-bold uppercase tracking-wider leading-tight"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 'some', margin: '-128px -16px -16px -16px' }}
        >
          {listing.city}, {listing.state}
        </motion.h3>
        <motion.span
          className="text-white uppercase text-sm font-bold tracking-wider leading-tight"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 'some', margin: '-128px -16px -16px -16px' }}
        >
          {listing.streetAddress}
        </motion.span>
        {typeof listing.price === 'number' && listing.price !== 0 ? (
          <motion.span
            className="text-xl font-light text-white leading-tight"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 'some', margin: '-128px -16px -16px -16px' }}
          >
            {formatPrice(listing.price)}{' '}
            {listing.textAfterPrice && <span className="text-sm">{listing.textAfterPrice}</span>}
          </motion.span>
        ) : (
          <motion.span
            className="text-xl font-light text-white"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 'some', margin: '-128px -16px -16px -16px' }}
          >
            Contact for price
          </motion.span>
        )}
      </div>
    </Link>
  )
}
