import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Attachment, Post, PropertyType, TeamMember } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { CopyButton } from '@/components/CopyButton'
import { FloorPlanIcon } from '@/components/Map'
import { faFarm, faFilePdf } from '@awesome.me/kit-a7a0dd333d/icons/sharp-duotone/thin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'
import { TeamMemberCard } from '@/components/TeamMembers/TeamMemberCard'
import { formatPrice } from '@/utilities/formatPrice'
import { formatNumber } from '@/utilities/formatNumber'
import {
  faChevronSquareUp,
  faChevronSquareDown,
  faChevronDown,
  faChevronUp,
} from '@awesome.me/kit-a7a0dd333d/icons/sharp/light'
import { ListingMap } from '@/components/Map/Individual'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { ColumnsBlock } from '@/blocks/ColumnsBlock/Component'
import { BRAND_COLORS } from '@/utilities/constants'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const listings = await payload.find({
    collection: 'listings',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  const params = listings.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Listing({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/listings/' + slug
  const listing = await queryListingBySlug({ slug })
  const payload = await getPayload({ config: configPromise })
  const contactMedia = await payload.findByID({
    collection: 'media',
    id: 18,
  })
  const contactBgMedia = await payload.findByID({
    collection: 'media',
    id: 10,
  })
  if (!listing) return <PayloadRedirects url={url} />

  return (
    <article>
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      <div className="bg-white pt-10 pb-20">
        <div className="container">
          <h1 className="sr-only">{listing.title}</h1>
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 text-base text-brand-gray-03 uppercase tracking-wider font-bold">
                <span>{listing.availability}</span>|
                <span>
                  {listing.type &&
                    typeof listing.type === 'object' &&
                    listing.type.map((listingType, index) => {
                      if (listing.type) {
                        return index !== listing.type.length - 1
                          ? `${(listingType as PropertyType).title}, `
                          : (listingType as PropertyType).title
                      }
                      return ''
                    })}
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-[2.5rem] font-bold text-brand-navy">
                  {listing.streetAddress}
                </span>
                {listing.propertyStatus && (
                  <div className="py-2 px-3 rounded-lg bg-brand-blue bg-opacity-50">
                    <span className="text-xs font-bold text-brand-navy tracking-wider uppercase">
                      {listing.propertyStatus}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-lg font-light text-brand-gray-03">
                {listing.city}, {listing.state} {listing.zipCode}
              </span>
            </div>
            <div className="flex flex-col justify-between gap-4">
              {listing.price && (
                <span className="text-[2.5rem] font-bold text-brand-navy">
                  {formatPrice(listing.price)}
                </span>
              )}
              <CopyButton value={`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-brand-offWhite py-20">
        <div className="container">
          <div className="grid grid-cols-3 gap-10">
            <div className="col-span-2 p-10 bg-white border-t-[10px] border-brand-navy flex flex-col">
              <div className="pb-10 flex gap-10 justify-between items-end border-b border-brand-gray-01">
                <div className="flex flex-col gap-2">
                  {listing.price && (
                    <h2 className="text-[2.5rem] font-bold text-brand-navy">
                      {formatPrice(listing.price)}
                    </h2>
                  )}
                  <span className="text-base font-light text-brand-gray-03">
                    {listing.streetAddress}, {listing.city}, {listing.state} {listing.zipCode}
                  </span>
                </div>
                <div className="flex gap-2 justify-start">
                  {listing.area && (
                    <div className="p-2 rounded-xl border border-brand-gray-01 flex gap-2 items-center">
                      <FloorPlanIcon className="w-6" />
                      <span className="text-base text-brand-gray-06 font-light">
                        {formatNumber(listing.area)} sqft
                      </span>
                    </div>
                  )}
                  {listing.acreage && (
                    <div className="p-2 rounded-xl border border-brand-gray-01 flex gap-2 items-center">
                      <FontAwesomeIcon icon={faFarm} className="w-6 text-brand-navy" />
                      <span className="text-base text-brand-gray-06 font-light fill-brand-navy">
                        {formatNumber(listing.acreage)} acres
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <Accordion type="multiple" defaultValue={['Overview', 'Resources']}>
                <AccordionItem value="Overview">
                  <AccordionTrigger
                    className="text-2xl font-bold text-brand-navy hover:no-underline py-10"
                    closedIcon={
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="border border-brand-gray-01 w-4 h-4 text-brand-navy p-1 close-icon hidden"
                      />
                    }
                    openIcon={
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="border border-brand-gray-01 w-4 h-4 text-brand-navy p-1 open-icon"
                      />
                    }
                  >
                    Property Overview
                  </AccordionTrigger>

                  <AccordionContent className="pb-10">
                    <RichText
                      content={listing.description || {}}
                      className="p-0 text-brand-gray-03 max-w-none"
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="Resources">
                  <AccordionTrigger
                    className="text-2xl font-bold text-brand-navy hover:no-underline py-10"
                    closedIcon={
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="border border-brand-gray-01 w-4 h-4 text-brand-navy p-1 close-icon hidden"
                      />
                    }
                    openIcon={
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className="border border-brand-gray-01 w-4 h-4 text-brand-navy p-1 open-icon"
                      />
                    }
                  >
                    Resources
                  </AccordionTrigger>

                  <AccordionContent className="pb-10">
                    <div className="flex gap-10">
                      {listing.attachments &&
                        listing.attachments.map((attachment, index) => {
                          if (typeof attachment.attachment === 'object') {
                            return (
                              <a
                                key={attachment.id}
                                className="flex items-center gap-2"
                                href={(attachment.attachment as Attachment).url || ''}
                                target="_blank"
                              >
                                <FontAwesomeIcon
                                  icon={faFilePdf}
                                  className="w-6 h-auto text-brand-navy"
                                />
                                <span className="text-base font-bold text-brand-gray-04">
                                  {(attachment.attachment as Attachment).label}
                                </span>
                              </a>
                            )
                          }
                          return ''
                        })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="col-span-1 p-10 bg-white border-t-[10px] border-brand-navy flex flex-col">
              <div className="pb-10 flex gap-10 justify-between items-end border-b border-brand-gray-01">
                <div className="flex flex-col gap-2">
                  <h2 className="text-[2.5rem] font-bold text-brand-navy">Get Connected</h2>
                  <span className="text-base font-light text-brand-gray-03">Reach out today!</span>
                </div>
              </div>
              {listing.agents &&
                typeof listing.agents[0] === 'object' &&
                (listing.agents as TeamMember[]).map((agent) => {
                  return <TeamMemberCard key={agent.id} teamMember={agent} />
                })}
            </div>
          </div>
        </div>
      </div>
      <ListingMap listing={listing} />
      <div className="bg-white py-20">
        <div className="container">
          <div className="flex flex-col gap-10">
            <ArchiveBlock
              heading="Similar Listings in Your Area"
              blockType="archive"
              relationTo={'listings'}
              propertyTypes={listing.type}
            />
          </div>
        </div>
      </div>
      <ColumnsBlock
        blockType="columnsBlock"
        columns={[
          {
            type: 'media',
            media: contactMedia,
            size: 'half',
          },
          {
            type: 'text',
            richText: {
              root: {
                type: '',
                direction: 'ltr',
                format: 'left',
                indent: 0,
                version: 1,

                children: [],
              },
            },
            size: 'half',
            styles: {
              enableTopBorder: true,
              borderColor: BRAND_COLORS.find((color) => color.label === 'blue')?.label,
            },
            backgroundColor: BRAND_COLORS.find((color) => color.label === 'offWhite')?.label,
            backgroundImage: contactBgMedia,
          },
        ]}
        styles={{
          global: {
            width: 'full',
          },
          resp: {},
        }}
      />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const listing = await queryListingBySlug({ slug })

  return generateMeta({ doc: listing })
}

const queryListingBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'listings',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
