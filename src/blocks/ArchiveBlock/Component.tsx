import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { Collection, DataFromCollectionSlug, getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchiveGrid } from '@/components/CollectionArchive/GridArchive'
import { CollectionArchiveCarousel } from '@/components/CollectionArchive/CarouselArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    propertyTypes,
    limit: limitFromProps,
    layout,
    navigationType,
    relationTo,
    heading,
    subtitle,
  } = props

  const limit = limitFromProps || 3

  let archive: DataFromCollectionSlug<'posts' | 'team-members' | 'listings'>[] = []

  const payload = await getPayload({ config: configPromise })

  const flattenedTaxonomies =
    relationTo === 'posts'
      ? categories?.map((category) => {
          if (typeof category === 'object') return category.id
          else return category
        })
      : propertyTypes?.map((propertyType) => {
          if (typeof propertyType === 'object') return propertyType.id
          else return propertyType
        })

  const fetchedDocs = await payload.find({
    collection: relationTo || 'posts',
    depth: 1,
    limit,
    ...(flattenedTaxonomies && flattenedTaxonomies.length > 0
      ? {
          where: {
            categories: {
              in: flattenedTaxonomies,
            },
          },
        }
      : {}),
  })

  archive = fetchedDocs.docs

  return (
    <div className={`archive-block-${id}`}>
      <div className="container py-20 md:py-32 flex flex-col gap-16 md:gap-20">
        <div className="flex flex-col gap-4 md:flex-row md:gap-10 md:justify-between md:items-center">
          <h2 className="text-[2.5rem] font-bold text-brand-gray-06">{heading}</h2>
          <p className="max-w-[30rem] text-brand-gray-04 font-light">{subtitle}</p>
        </div>
        {layout && layout === 'grid' && (
          <CollectionArchiveGrid archive={archive} relationTo={relationTo} />
        )}
        {/* {layout && layout === 'carousel' && (
          // <CollectionArchiveCarousel posts={posts} navigationType={navigationType || 'none'} />
        )} */}
      </div>
    </div>
  )
}
