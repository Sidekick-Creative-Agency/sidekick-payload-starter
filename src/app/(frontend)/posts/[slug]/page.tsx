import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Category, Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { notFound, redirect } from 'next/navigation'
import { PostArchiveGrid } from '@/components/Archive/PostArchive'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  const params = posts.docs.map(({ slug }) => {
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
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })
  const payload = await getPayload({ config: configPromise })
  const relatedPostsResult = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        not_equals: slug,
      },
      ...(post.category
        ? {
            'category.id': {
              equals: (post?.category as Category)?.id,
            },
          }
        : {}),
    },
  })
  const relatedPosts = relatedPostsResult.docs
  console.log(relatedPosts)
  if (!post) return <PayloadRedirects url={url} />

  return (
    <article>
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 py-20">
        <div className="container max-w-6xl">
          <RichText className="max-w-none p-0" content={post.content} enableGutter={false} />
        </div>

        <div className="py-20 w-full">
          <div className="container w-full max-w-6xl flex flex-col gap-10">
            <div>
              <h2 className="font-bold">Related Posts</h2>
            </div>
            <PostArchiveGrid data={relatedPosts} />
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
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
