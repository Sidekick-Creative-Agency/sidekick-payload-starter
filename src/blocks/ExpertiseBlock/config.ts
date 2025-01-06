import { ColorField } from '@/fields/Color'
import type { Block, Field } from 'payload'

const expertiseAreaFields: Field[] = [
  {
    name: 'title',
    type: 'text',
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
  },
  ColorField({
    name: 'accentColor',
  }),
  {
    name: 'link',
    type: 'relationship',
    relationTo: 'pages',
  },
]

export const ExpertiseBlock: Block = {
  slug: 'expertiseBlock',
  interfaceName: 'ExpertiseBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'expertiseAreas',
      type: 'array',
      fields: expertiseAreaFields,
    },
  ],
}
