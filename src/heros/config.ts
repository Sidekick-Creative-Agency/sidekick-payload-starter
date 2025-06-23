import type { Field } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { ColumnsBlock } from '@/blocks/ColumnsBlock/config'
import { link } from '@/fields/link'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Home',
          value: 'home',
        },
      ],
      required: true,
    },
    {
      name: 'enableOverrideTitle',
      type: 'checkbox',
      label: 'Override Title',
    },
    {
      name: 'overrideTitle',
      type: 'text',
      admin: {
        condition: (_, { enableOverrideTitle }) => enableOverrideTitle,
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        condition: (_, { type } = {}) => {
          if (type === 'mediumImpact') {
            return true
          }
          return false
        },
      },
    },
    {
      name: 'enableLinks',
      type: 'checkbox',
      label: 'Enable Links',
      admin: {
        condition: (_, { type } = {}) => {
          if (type === 'highImpact') {
            return true
          }
          return false
        },
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type, enableLinks }) => {
            if (type === 'highImpact' && enableLinks) {
              return true
            }
            return false
          },
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'home'].includes(type),
      },
      relationTo: 'media',
      required: false,
    },
    {
      type: 'array',
      name: 'heroLogos',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
      maxRows: 2,
      admin: {
        condition: (_, { type } = {}) => type === 'home',
      },
    },
    {
      type: 'array',
      name: 'homeHeroLinks',
      fields: [
        {
          name: 'beforeLabelText',
          type: 'text',
        },
        link(),
      ],
      maxRows: 3,
      admin: {
        condition: (_, { type } = {}) => type === 'home',
      },
    },
  ],
  label: false,
}
