import type { Metadata } from 'next/types'

import { CollectionArchiveGrid } from '@/components/CollectionArchive/GridArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const listings = await payload.find({
    collection: 'listings',
    depth: 1,
    limit: 12,
    overrideAccess: false,
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Listings</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="listings"
          currentPage={listings.page}
          limit={12}
          totalDocs={listings.totalDocs}
        />
      </div>

      <CollectionArchiveGrid posts={listings.docs} />

      <div className="container">
        {listings.totalPages > 1 && listings.page && (
          <Pagination page={listings.page} totalPages={listings.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Onward Real Estate Team | Listings`,
  }
}
