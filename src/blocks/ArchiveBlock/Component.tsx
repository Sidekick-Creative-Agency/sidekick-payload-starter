import type { Post, ArchiveBlock as ArchiveBlockProps, TeamMember, Listing } from '@/payload-types'
import configPromise from '@payload-config'
import { DataFromCollectionSlug, getPayload } from 'payload'
import React from 'react'
import { TeamMemberArchiveGrid } from '@/components/Archive/TeamMemberArchive'
import { ListingArchiveGrid } from '@/components/Archive/ListingArchive'
import { PostArchiveCarousel } from '@/components/Archive/PostArchive/Carousel'
import { PostArchiveGrid } from '@/components/Archive/PostArchive/Grid'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    selectionType,
    manualSelection,
    categories,
    limit: limitFromProps,
    headingAlign = 'left',
    relationTo,
    heading,
    subtitle,
    enablePropertyCategoryFilters,
    defaultCategoryFilter,
    elementId,
    propertyTypes,
    layout,
    buttonColor,
    enablePostCategoryFilter,
    enableExcerpt,
    enableDate,
    enableGutter,
    enableCategoryBanner
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
    left: 'md:flex-row md:items-end',
    center: 'md:flex-col md:items-center',
    right: 'md:flex-row-reverse md:items-end',
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
    ...(relationTo === 'team-members'
      ? {
        sort: ['lastName', 'title'],
      }
      : {}),
    ...(relationTo === 'posts'
      ? {
        sort: ['-publishedAt', '-updatedAt'],
      }
      : {}),
    where: {
      ...((flattenedTaxonomies && flattenedTaxonomies.length > 0 && relationTo === 'posts')
        ? {
          category: {
            in: flattenedTaxonomies,
          },
        }
        : {}),
      ...(relationTo === 'listings'
        ? {
          availability: {
            in: ['available', 'active'],
          },
        }
        : {}),
      ...(relationTo === 'listings' && propertyTypes
        ? {
          category: {
            equals: defaultCategoryFilter,
          },
        }
        : {}),
      ...(relationTo === 'listings' && enablePropertyCategoryFilters
        ? {
          category: {
            equals: defaultCategoryFilter,
          },
        }
        : {}),
      ...((relationTo === 'listings' && defaultCategoryFilter === 'residential') && {
        'MLS.ListOfficeName': {
          equals: process.env.NEXT_PUBLIC_RETS_LIST_OFFICE_NAME || ''
        }
      }),
      ...(relationTo === 'listings' || relationTo === 'posts'
        ? {
          or: [
            {
              _status: {
                exists: false,
              },
            },
            {
              _status: {
                equals: 'published',
              },
            },
          ],
        }
        : {}),
      ...((relationTo === 'posts' && selectionType === 'manual' && manualSelection)
        ? {
          id: {
            in: manualSelection?.map((post) => (post as Post).id),
          },
        }
        : {}),
    },
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
            limit={limit}
          />
        )
      case 'posts':
        return layout === 'grid' ? (
          <PostArchiveGrid
            data={archive as Post[]}
            limit={limit}
            hasNextPage={fetchedDocs.hasNextPage}
            buttonColor={buttonColor}
            enableFilter={enablePostCategoryFilter}
            enableExcerpt={enableExcerpt}
            enableDate={enableDate}
            enableGutter={enableGutter}
            enableBanner={enableCategoryBanner}
          />
        ) : (
          <PostArchiveCarousel
            data={archive as Post[]}
            buttonColor={buttonColor}
            enableExcerpt={enableExcerpt}
            enableDate={enableDate}
            enableGutter={enableGutter}
          />
        )
      default:
        return null
    }
  }
  if (!archive || archive.length === 0) {
    return
  }

  return (
    <div
      className={`archive-block-${id} overflow-hidden py-20 md:py-32`}
      {...(elementId ? { id: elementId } : {})}
    >
      <div className="container flex flex-col gap-16 md:gap-20">
        <div
          className={`flex flex-col gap-4 md:gap-4 ${headingAlign && flexJustifyClasses[headingAlign]} ${headingAlign && flexDirectionClasses[headingAlign]}`}
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
          {enablePostCategoryFilter && <div className="flex-grow hidden md:block"></div>}
        </div>
        {renderArchive()}
      </div>
    </div>
  )
}
