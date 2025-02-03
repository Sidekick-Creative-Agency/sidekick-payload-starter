import { Field } from 'payload'

export const AdvancedFields: Field = {
  label: 'Advanced',
  type: 'collapsible',
  fields: [
    {
      name: 'elementId',
      type: 'text',
      admin: {
        description: 'The HTML ID attribute of this block.',
      },
    },
  ],
  admin: {
    initCollapsed: true,
  },
}
