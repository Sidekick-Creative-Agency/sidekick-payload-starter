import { AdvancedFields } from '@/fields/Advanced'
import type { Block } from 'payload'

export const SearchBarBlock: Block = {
  slug: 'searchBarBlock',
  interfaceName: 'SearchBarBlock',
  fields: [
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Commercial',
          value: 'commercial',
        },
        {
          label: 'Residential',
          value: 'residential',
        },
      ],
    },
    AdvancedFields,
  ],
}
