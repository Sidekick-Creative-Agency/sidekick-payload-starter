import type { Block, Field } from 'payload'

const carouselItemFields: Field[] = [
  {
    type: 'upload',
    relationTo: 'media',
    name: 'icon',
  },
  {
    name: 'heading',
    type: 'text',
  },
  {
    name: 'content',
    type: 'textarea',
  },
]

export const CarouselLexicalBlock: Block = {
  slug: 'carousel',
  interfaceName: 'carouselLexicalBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: carouselItemFields,
    },
  ],
}
