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
    {
      type: 'code',
      label: 'Custom CSS',
      name: 'customCss',
      admin: {
        language: 'css',
        description: 'Omit the opening and closing <style> tags',
      },
    },
  ],
  admin: {
    initCollapsed: true,
  },
}
