import React from 'react'
import { DataFromCollectionSlug } from 'payload'
import { ListingCard } from '@/components/Listings/ListingCard'

export type Props = {
  data: DataFromCollectionSlug<'listings'>[]
}

export const ListingArchiveGrid: React.FC<Props> = (props) => {
  const { data } = props
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-y-20">
      {data?.map((listing, index) => {
        if (typeof listing === 'object' && listing !== null) {
          return (
            <div className="w-full" key={listing.id}>
              <ListingCard listing={listing} />
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
