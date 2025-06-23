import type { Metadata } from 'next'

import type { Listing, Page, Post, TeamMember } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'

export const generateMeta = async (args: {
  doc: Page | Post | Listing | TeamMember
}): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc.meta.image !== null &&
    'url' in doc.meta.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${doc.meta.image.url}`

  const title = doc?.meta?.title ? doc?.meta?.title : 'Onward Real Estate Team'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
