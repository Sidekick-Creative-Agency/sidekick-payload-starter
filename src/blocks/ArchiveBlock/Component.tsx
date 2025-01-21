import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { Collection, DataFromCollectionSlug, getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchiveGrid } from '@/components/CollectionArchive/GridArchive'
import { CollectionArchiveCarousel } from '@/components/CollectionArchive/CarouselArchive'
import { PropertyTypes } from '../../collections/PropertyTypes/index'

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

  const taxonomySlug =
    relationTo === 'posts'
      ? 'categories'
      : relationTo === 'listings'
        ? 'property-types'
        : 'undefined'

  const payload = await getPayload({ config: configPromise })

  const flattenedTaxonomies =
    taxonomySlug === 'categories'
      ? categories?.map((category) => {
          if (typeof category === 'object') return category.id
          else return category
        })
      : taxonomySlug === 'property-types'
        ? propertyTypes?.map((propertyType) => {
            if (typeof propertyType === 'object') return propertyType.id
            else return propertyType
          })
        : undefined

  const fetchedDocs = await payload.find({
    collection: relationTo || 'posts',
    depth: 1,
    limit: limit || 10,
    ...(flattenedTaxonomies && flattenedTaxonomies.length > 0
      ? {
          where: {
            type: {
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
          <h2 className="text-[2.5rem] font-bold text-brand-gray-06 flex-1">{heading}</h2>
          <p className="max-w-[30rem] text-brand-gray-04 font-light flex-1">{subtitle}</p>
        </div>
        {layout !== 'carousel' && (
          <CollectionArchiveGrid archive={archive} relationTo={relationTo} />
        )}
        {/* {layout && layout === 'carousel' && (
          // <CollectionArchiveCarousel posts={posts} navigationType={navigationType || 'none'} />
        )} */}
      </div>
    </div>
  )
}
