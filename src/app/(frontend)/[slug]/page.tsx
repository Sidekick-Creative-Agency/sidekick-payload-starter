import type { Metadata } from 'next'

// import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'

import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { getPayload } from 'payload'
import { notFound, redirect } from 'next/navigation'
import { queryPageBySlug } from '@/utilities/queryPageBySlug'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: PageType | null
  page = await queryPageBySlug({
    slug,
  })
  if (!page) {
    // return <PayloadRedirects url={url} />
    // notFound()
    redirect('/')
  }

  const { hero, layout, title } = page

  return (
    <div>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      {/* <PayloadRedirects disableNotFound url={url} /> */}

      <RenderHero {...hero} title={title} />
      <RenderBlocks blocks={layout} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}
