import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

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
    pasteURL: {
      allowList: [
        {
          hostname: 'images.unsplash.com',
          protocol: 'https',
        },
      ],
    },
  },
}
