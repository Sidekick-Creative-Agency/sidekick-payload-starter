import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { AdvancedFields } from '@/fields/Advanced'

const faqFields: Field[] = [
  {
    name: 'question',
    type: 'text',
  },
  {
    name: 'content',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
      },
    }),
  },
]

export const FAQBlock: Block = {
  slug: 'faqBlock',

  labels: {
    singular: 'FAQ Block',
    plural: 'FAQ Blocks',
  },
  interfaceName: 'FAQBlock',
  fields: [
    {
      name: 'enableHeading',
      type: 'checkbox',
    },
    {
      name: 'heading',
      type: 'text',
      admin: {
        condition: (_, { enableHeading }) => {
          return Boolean(enableHeading) ? true : false
        },
      },
    },

    {
      name: 'faqs',
      label: 'FAQs',
      type: 'array',
      fields: faqFields,
    },
    {
      type: 'collapsible',
      label: 'Styles',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'size',
          type: 'select',
          defaultValue: 'md',
          options: [
            {
              value: 'sm',
              label: 'Small',
            },
            {
              value: 'md',
              label: 'Medium',
            },
            {
              value: 'lg',
              label: 'Large',
            },
            {
              value: 'full',
              label: 'Full Width',
            },
          ],
        },
      ],
    },
    AdvancedFields,
  ],
}
