import type { Listing, FeaturedListingsBlock as FeaturedListingsBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { DataFromCollectionSlug, getPayload } from 'payload'
import React from 'react'
import { ListingArchiveGrid } from '@/components/Archive/ListingArchive'
import { CMSLink } from '@/components/Link'
import * as motion from 'motion/react-client'

export const FeaturedListingsBlock: React.FC<
  FeaturedListingsBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    headingAlign = 'left',
    heading,
    subtitle,
    categoryFilter,
    enableLink,
    link,
    elementId,
  } = props

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

  const fetchedDocs = await payload.find({
    collection: 'listings',
    depth: 1,
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
    <div
      className={`archive-block-${id} overflow-hidden`}
      {...(elementId ? { id: elementId } : {})}
    >
      <div className="container py-20 md:py-32 flex flex-col gap-16 md:gap-20">
        <div
          className={`flex flex-col gap-4 md:gap-4 md:items-center ${headingAlign && flexJustifyClasses[headingAlign]} ${headingAlign && flexDirectionClasses[headingAlign]}`}
        >
          <motion.h2
            className={`text-[2.5rem] font-bold text-brand-gray-06 flex-1 ${headingAlign && alignClasses[headingAlign]}`}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 'all' }}
          >
            {heading}
          </motion.h2>
          {subtitle && (
            <motion.p
              className={`max-w-[30rem] text-brand-gray-04 font-light flex-1 ${headingAlign && headingAlign !== 'right' && alignClasses[headingAlign]}`}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 'all' }}
            >
              {subtitle}
            </motion.p>
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
