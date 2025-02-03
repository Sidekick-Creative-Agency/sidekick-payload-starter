import { AdvancedFields } from '@/fields/Advanced'
import type { Block, Field } from 'payload'

const ReviewFields: Field[] = [
  {
    name: 'reviewerName',
    type: 'text',
    required: true,
  },
  {
    name: 'reviewerTitle',
    type: 'text',
    required: true,
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  {
    name: 'review',
    type: 'textarea',
    required: true,
  },
]

export const ReviewsBlock: Block = {
  slug: 'reviewsBlock',
  interfaceName: 'ReviewsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'reviews',
      type: 'array',
      fields: ReviewFields,
    },
    AdvancedFields,
  ],
  labels: {
    plural: 'Reviews',
    singular: 'Review',
  },
}
