import type { Block } from 'payload'

export const SpacerLexicalBlock: Block = {
  slug: 'spacer',
  interfaceName: 'spacerLexicalBlock',
  fields: [
    {
      name: 'size',
      type: 'select',
      defaultValue: 'small',
      options: [
        {
          label: 'Small',
          value: 'small',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Large',
          value: 'large',
        },
      ],
    },
  ],
}
