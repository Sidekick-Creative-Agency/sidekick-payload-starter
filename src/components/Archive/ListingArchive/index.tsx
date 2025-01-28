'use client'
import React, { useState } from 'react'
import { DataFromCollectionSlug, Find, PaginatedDocs, Where } from 'payload'
import { ListingCard } from '@/components/Listings/ListingCard'
import { Listing } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { stringify } from 'qs-esm'

interface ListingArchiveGridProps {
  data: DataFromCollectionSlug<'listings'>[]
  enableCategoryFilters?: boolean | undefined | null
  defaultCategoryFilter?: 'commercial' | 'residential' | undefined | null
}

export const ListingArchiveGrid: React.FC<ListingArchiveGridProps> = ({
  data,
  enableCategoryFilters,
  defaultCategoryFilter,
}) => {
  const [activeFilter, setActiveFilter] = useState(defaultCategoryFilter)
  const [activeListings, setActiveListings] = useState<Listing[]>(data || [])
  const [isLoading, setIsLoading] = useState(false)

  const handleFilterChange = async (filter: 'commercial' | 'residential') => {
    try {
      setIsLoading(true)
      setActiveFilter(filter)

      const query: Where = {
        category: {
          equals: filter,
        },
      }
      const stringifiedQuery = stringify(
        {
          where: query,
          limit: 3,
        },
        { addQueryPrefix: true },
      )
      const response = await fetch(`/api/listings${stringifiedQuery}`)
      const json = (await response.json()) as PaginatedDocs<Listing>
      if (json.docs) {
        setActiveListings(json.docs)
      } else {
        console.error('Failed to fetch listings')
      }
    } catch (error: any) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-y-20 relative ${enableCategoryFilters && 'pt-20 md:py-0'}`}
    >
      {activeListings?.map((listing, index) => {
        if (typeof listing === 'object' && listing !== null) {
          return (
            <div
              className={`w-full duration-1000 ${isLoading && 'animate-pulse'}`}
              key={listing.id}
            >
              <ListingCard listing={listing} />
            </div>
          )
        }
        return null
      })}
      {enableCategoryFilters && (
        <div className="absolute left-0 right-auto -translate-y-1/2 md:right-0 md:left-auto top-0 md:bottom-[calc(100%+2rem)] md:top-auto md:translate-y-0 flex flex-wrap gap-2 sm:gap-6 gap-y-0">
          <Button
            onClick={(e) => handleFilterChange('residential')}
            className={`px-2 py-4 text-lg font-bold tracking-wider bg-transparent hover:bg-transparent focus-visible:bg-transparent border-0 border-b ${activeFilter === 'residential' ? 'border-brand-tan text-brand-navy' : 'border-brand-gray-01 text-brand-gray-03'} `}
          >
            Residential
          </Button>

          <Button
            onClick={(e) => handleFilterChange('commercial')}
            className={`px-2 py-4 text-lg font-bold tracking-wider bg-transparent hover:bg-transparent focus-visible:bg-transparent border-0 border-b ${activeFilter === 'commercial' ? 'border-brand-tan text-brand-navy' : 'border-brand-gray-01 text-brand-gray-03'} `}
          >
            Commercial
          </Button>
        </div>
      )}
    </div>
  )
}
