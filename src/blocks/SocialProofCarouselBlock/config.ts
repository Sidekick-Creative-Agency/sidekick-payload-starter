import type { Block } from 'payload'

export const SocialProofCarouselBlock: Block = {
  slug: 'socialProofCarouselBlock',
  interfaceName: 'SocialProofCarouselBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'logos',
      type: 'array',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
