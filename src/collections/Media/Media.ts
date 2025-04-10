import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { generateBlurHash } from './hooks/generateBlurHash'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
    {
      type: 'join',
      collection: 'listings',
      name: 'relatedListingFeaturedImage',
      on: 'featuredImage',
    },
    {
      type: 'join',
      collection: 'listings',
      name: 'relatedListingImageGallery',
      on: 'imageGallery.image',
    },
    {
      name: 'blurhash',
      type: 'text',
      admin: {
        hidden: true,
        disableListColumn: true,
        disableListFilter: true,
      },
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
    ],
    formatOptions: {
      format: 'webp',
      options: {
        compression: 'webp',
      },
    },
    mimeTypes: [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/svg+xml',
      'application/pdf',
    ],
    pasteURL: {
      allowList: [
        {
          hostname: 'images.unsplash.com',
          protocol: 'https',
        },
      ],
    },
  },
  hooks: {
    beforeValidate: [generateBlurHash],
  },
}
