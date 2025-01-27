import type { Block } from 'payload'

export const MediaCarouselBlock: Block = {
  slug: 'mediaCarouselBlock',
  interfaceName: 'MediaCarouselBlock',
  fields: [
    {
      name: 'enableAutoPlay',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'carouselItems',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
