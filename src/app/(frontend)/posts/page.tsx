import type { Metadata } from 'next/types'

import { CollectionArchiveGrid } from '@/components/CollectionArchive/GridArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { PostCard } from '@/components/Posts/PostCard'

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 24,
    overrideAccess: false,
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16 flex flex-col gap-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {posts && posts.docs && posts.docs.map((post, index) => {
            return (
              <PostCard key={index} post={post} />
            )
          })}

        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={24}
          totalDocs={posts.totalDocs}
        />
      </div>

      {/* <CollectionArchiveGrid posts={posts.docs} /> */}

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} collection='posts' />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Posts | Onward Real Estate Team`,
  }
}
