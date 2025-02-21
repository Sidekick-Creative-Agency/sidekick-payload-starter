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
    {
      type: 'join',
      collection: 'listings',
      name: 'relatedListingFeaturedImage',
      on: 'featuredImage',
      // hooks: {
      //   beforeChange: [
      //     ({ data }) => {
      //       console.log(data)
      //       return data
      //     },
      //   ],
      // },
    },
    {
      type: 'join',
      collection: 'listings',
      name: 'relatedListingImageGallery',
      on: 'imageGallery.image',
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
    // beforeChange: [
    //   async ({ data, req, context }) => {
    //     const existingMedia = await req.payload.find({
    //       collection: 'media',
    //       where: {
    //         filename: {
    //           equals: data.filename,
    //         },
    //       },
    //     })
    //     console.log(data.filename)
    //     if (existingMedia.docs && existingMedia.docs.length > 0) {
    //       data.filename = `${data.filename.split('.')[0]}-${existingMedia.docs.length}.${data.filename.split('.')[1]}`
    //     }
    //     return data
    //   },
    // ],
  },
}
