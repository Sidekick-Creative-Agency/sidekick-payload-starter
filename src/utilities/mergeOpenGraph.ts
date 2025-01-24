import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Onward Real Estate Team',
  images: [
    {
      url: process.env.VERCEL
        ? `${process.env.VERCEL_PROJECT_PRODUCTION_URL}/website-template-OG.webp`
        : `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/website-template-OG.webp`,
    },
  ],
  siteName: 'Payload Website Template',
  title: 'Onward Real Estate Team',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
