import type { Block, Field } from 'payload'

const numberCounterFields: Field[] = [
  {
    name: 'prefix',
    type: 'text',
  },
  {
    name: 'number',
    type: 'number',
    required: true,
  },
  {
    name: 'label',
    type: 'text',
    required: true,
  },
  {
    name: 'suffix',
    type: 'text',
  },
]

export const NumberCountersBlock: Block = {
  slug: 'numberCountersBlock',
  interfaceName: 'NumberCountersBlock',
  fields: [
    {
      name: 'numberCounters',
      type: 'array',
      fields: numberCounterFields,
      maxRows: 4,
    },
  ],
}
