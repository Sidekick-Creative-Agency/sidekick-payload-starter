import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Post, PropertyType } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'

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

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/listings/' + slug
  const listing = await queryListingBySlug({ slug })
  const payload = await getPayload({ config: configPromise })

  if (!listing) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <div className="flex flex-col items-center gap-4">
        <div className="container">
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
                <h1 className="text-[2.5rem] font-bold text-brand-navy">{listing.streetAddress}</h1>
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
                  {listing.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                  })}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* {listing.relatedPosts && listing.relatedPosts.length > 0 && (
          <RelatedPosts
            className="mt-12"
            docs={listing.relatedPosts.filter((post) => typeof post === 'object')}
          />
        )} */}
      </div>
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
