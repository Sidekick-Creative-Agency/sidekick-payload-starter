import { AdvancedFields } from '@/fields/Advanced'
import { link } from '@/fields/link'
import type { Block } from 'payload'

export const FeaturedListingsBlock: Block = {
  slug: 'featuredListingsBlock',
  interfaceName: 'FeaturedListingsBlock',
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
      type: 'select',
      name: 'headingAlign',
      defaultValue: 'left',
      options: [
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'categoryFilter',
      type: 'select',
      defaultValue: 'all',
      options: [
        {
          value: 'all',
          label: 'All',
        },
        {
          value: 'commercial',
          label: 'Commercial',
        },
        {
          value: 'residential',
          label: 'Residential',
        },
      ],
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      defaultValue: true,
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          condition: (_, siblingData) => {
            return siblingData.enableLink
          },
        },
      },
    }),
    AdvancedFields,
  ],
}
