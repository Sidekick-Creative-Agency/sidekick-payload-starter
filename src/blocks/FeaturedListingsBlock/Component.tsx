import type {
  Post,
  TeamMember,
  Listing,
  FeaturedListingsBlock as FeaturedListingsBlockProps,
} from '@/payload-types'

import configPromise from '@payload-config'
import { DataFromCollectionSlug, getPayload } from 'payload'
import React from 'react'
import { TeamMemberArchiveGrid } from '@/components/Archive/TeamMemberArchive'
import { ListingArchiveGrid } from '@/components/Archive/ListingArchive'
import { PostArchiveGrid } from '@/components/Archive/PostArchive'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CMSLink } from '@/components/Link'

export const FeaturedListingsBlock: React.FC<
  FeaturedListingsBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, headingAlign = 'left', heading, subtitle, categoryFilter, enableLink, link } = props

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const flexJustifyClasses = {
    left: 'md:justify-between',
    center: 'md:justify-center',
    right: 'md:justify-between',
  }

  const flexDirectionClasses = {
    left: 'md:flex-row',
    center: 'md:flex-col',
    right: 'md:flex-row-reverse',
  }

  let archive: DataFromCollectionSlug<'listings'>[] = []

  const payload = await getPayload({ config: configPromise })
  console.log(categoryFilter)
  const fetchedDocs = await payload.find({
    collection: 'listings',
    depth: 1,
    limit: 3,
    where: {
      and: [
        {
          category: {
            in: categoryFilter !== 'all' ? [categoryFilter] : ['commercial', 'residential'],
          },
        },
        {
          isFeatured: {
            equals: true,
          },
        },
      ],
    },
  })

  archive = fetchedDocs.docs

  if (!archive || archive.length === 0) {
    return
  }
  return (
    <div className={`archive-block-${id} overflow-hidden`}>
      <div className="container py-20 md:py-32 flex flex-col gap-16 md:gap-20">
        <div
          className={`flex flex-col gap-4 md:gap-4 md:items-center ${headingAlign && flexJustifyClasses[headingAlign]} ${headingAlign && flexDirectionClasses[headingAlign]}`}
        >
          <h2
            className={`text-[2.5rem] font-bold text-brand-gray-06 flex-1 ${headingAlign && alignClasses[headingAlign]}`}
          >
            {heading}
          </h2>
          {subtitle && (
            <p
              className={`max-w-[30rem] text-brand-gray-04 font-light flex-1 ${headingAlign && headingAlign !== 'right' && alignClasses[headingAlign]}`}
            >
              {subtitle}
            </p>
          )}
        </div>
        <ListingArchiveGrid
          data={archive as Listing[]}
          enableCategoryFilters={false}
          defaultCategoryFilter={categoryFilter || undefined}
        />
        {enableLink && (
          <div className="flex justify-center">
            <CMSLink {...link} appearance={'default'} />
          </div>
        )}
      </div>
    </div>
  )
}
