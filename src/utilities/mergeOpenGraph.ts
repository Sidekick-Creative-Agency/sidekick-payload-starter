import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Onward Real Estate Team',
  images: [
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/onward-logoprimary-color-light.webp`,
    },
  ],
  siteName: 'Onward Real Estate Team',
  title: 'Onward Real Estate Team',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
