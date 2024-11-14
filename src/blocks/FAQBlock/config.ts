import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

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
      name: 'headingAlign',
      type: 'radio',
      options: [
        {
          value: 'left',
          label: 'Left',
        },
        {
          value: 'center',
          label: 'Center',
        },
        {
          value: 'right',
          label: 'Right',
        },
        {
          value: 'justify',
          label: 'Justify',
        },
      ],
      admin: {
        condition: (_, { enableHeading }) => {
          return Boolean(enableHeading) ? true : false
        },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'headingSpacingValue',
          type: 'number',
          min: 0,
          label: 'Spacing',
        },
        {
          name: 'headingSpacingUnit',
          label: 'Unit',
          type: 'select',
          defaultValue: 'rem',
          options: [
            {
              value: 'rem',
              label: 'rem',
            },
            {
              value: 'px',
              label: 'px',
            },
            {
              value: '%',
              label: '%',
            },
          ],
        },
      ],
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
        {
          label: 'Desktop',
          type: 'collapsible',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingVerticalDesktopValue', // required
                  label: 'Vertical Padding',
                  type: 'number', // required
                  defaultValue: '5',
                },
                {
                  name: 'paddingVerticalDesktopUnit',

                  label: 'Unit',
                  type: 'select',
                  defaultValue: 'rem',
                  options: [
                    {
                      value: 'rem',
                      label: 'rem',
                    },
                    {
                      value: 'px',
                      label: 'px',
                    },
                    {
                      value: '%',
                      label: '%',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Tablet',
          type: 'collapsible',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingVerticalTabletValue', // required
                  label: 'Vertical Padding',
                  type: 'number', // required
                  defaultValue: 5,
                },
                {
                  name: 'paddingVerticalTabletUnit',

                  label: 'Unit',
                  type: 'select',
                  defaultValue: 'rem',
                  options: [
                    {
                      value: 'rem',
                      label: 'rem',
                    },
                    {
                      value: 'px',
                      label: 'px',
                    },
                    {
                      value: '%',
                      label: '%',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Mobile',
          type: 'collapsible',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'paddingVerticalMobileValue', // required
                  label: 'Vertical Padding',
                  type: 'number', // required
                  defaultValue: 4,
                },
                {
                  name: 'paddingVerticalMobileUnit',

                  label: 'Unit',
                  type: 'select',
                  defaultValue: 'rem',
                  options: [
                    {
                      value: 'rem',
                      label: 'rem',
                    },
                    {
                      value: 'px',
                      label: 'px',
                    },
                    {
                      value: '%',
                      label: '%',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
