import { AdvancedFields } from '@/fields/Advanced'
import type { Block, Field } from 'payload'

const mediaGridItemFields: Field[] = [
  {
    type: 'upload',
    relationTo: 'media',
    name: 'media',
  },
  {
    name: 'aspectRatio',
    type: 'select',
    defaultValue: 'auto',
    options: [
      {
        label: 'Auto',
        value: 'auto',
      },
      {
        label: '16:9',
        value: 'video',
      },
      {
        label: 'Square',
        value: 'square',
      },
    ],
  },
]

export const MediaGridLexicalBlock: Block = {
  slug: 'mediaGrid',
  interfaceName: 'mediaGridBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: mediaGridItemFields,
    },
    AdvancedFields,
  ],
}
