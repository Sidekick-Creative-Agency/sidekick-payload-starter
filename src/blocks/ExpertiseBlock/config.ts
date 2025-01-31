import { ColorField } from '@/fields/Color'
import { link } from '@/fields/link'
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
    name: 'borderColor',
  }),
  link({ appearanceEnumName: 'enum_pages_bks_expterise_bk_areas_link_appearance' }),
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
