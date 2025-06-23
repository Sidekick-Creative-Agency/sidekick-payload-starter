import type { Block, Field } from 'payload'
import { ColorField } from '@/fields/Color'

const CheckMarkListItemFields: Field[] = [
  ColorField({ name: 'iconColor' }),
  {
    name: 'text',
    type: 'text',
  },
  ColorField({ name: 'textColor' }),
]

export const CheckmarkListLexicalBlock: Block = {
  slug: 'checkmarkList',
  interfaceName: 'checkmarkListLexicalBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: CheckMarkListItemFields,
    },
  ],
}
