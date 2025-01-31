import type { Post, ArchiveBlock as ArchiveBlockProps, TeamMember, Listing } from '@/payload-types'
import configPromise from '@payload-config'
import { DataFromCollectionSlug, getPayload } from 'payload'
import React from 'react'
import { TeamMemberArchiveGrid } from '@/components/Archive/TeamMemberArchive'
import { ListingArchiveGrid } from '@/components/Archive/ListingArchive'
import { PostArchiveGrid } from '@/components/Archive/PostArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    limit: limitFromProps,
    headingAlign = 'left',
    relationTo,
    heading,
    subtitle,
    enablePropertyCategoryFilters,
    defaultCategoryFilter,
  } = props

  const limit = limitFromProps || 3

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
      : undefined
  const fetchedDocs = await payload.find({
    collection: relationTo || 'posts',
    depth: 1,
    limit: limit || 10,
    ...(flattenedTaxonomies &&
      flattenedTaxonomies.length > 0 &&
      relationTo === 'posts' && {
        where: {
          category: {
            in: flattenedTaxonomies,
          },
        },
      }),
    ...(relationTo === 'listings' &&
      enablePropertyCategoryFilters && {
        where: {
          category: {
            equals: defaultCategoryFilter,
          },
        },
      }),
  })

  archive = fetchedDocs.docs

  const renderArchive = () => {
    switch (relationTo) {
      case 'team-members':
        return <TeamMemberArchiveGrid data={archive as TeamMember[]} />
      case 'listings':
        return (
          <ListingArchiveGrid
            data={archive as Listing[]}
            enableCategoryFilters={enablePropertyCategoryFilters}
            defaultCategoryFilter={defaultCategoryFilter}
          />
        )
      case 'posts':
        return <PostArchiveGrid data={archive as Post[]} />
      default:
        return null
    }
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
          {!enablePropertyCategoryFilters && (
            <p
              className={`max-w-[30rem] text-brand-gray-04 font-light flex-1 ${headingAlign && headingAlign !== 'right' && alignClasses[headingAlign]}`}
            >
              {subtitle}
            </p>
          )}
        </div>
        {renderArchive()}
      </div>
    </div>
  )
}
