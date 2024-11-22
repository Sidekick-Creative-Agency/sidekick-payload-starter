import type { Block, Field } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { StylesField } from '@/fields/Styles'
import { DesktopVerticalPaddingField } from '@/fields/Styles/Padding/Vertical/Desktop'
import { TabletVerticalPaddingField } from '@/fields/Styles/Padding/Vertical/Tablet'
import { MobileVerticalPaddingField } from '@/fields/Styles/Padding/Vertical/Mobile'
import { TabletHorizontalPaddingField } from '@/fields/Styles/Padding/Horizontal/Tablet'
import { DesktopHorizontalPaddingField } from '@/fields/Styles/Padding/Horizontal/Desktop'
import { MobileHorizontalPaddingField } from '@/fields/Styles/Padding/Horizontal/Mobile'
import { FormBlock } from '../Form/config'

const columnFields: Field[] = [
  {
    name: 'type',
    type: 'radio',
    defaultValue: 'text',
    options: [
      {
        label: 'Text',
        value: 'text',
      },
      {
        label: 'Media',
        value: 'media',
      },
    ],
    admin: {
      layout: 'vertical',
    },
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',

    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          BlocksFeature({ blocks: [FormBlock] }),
          HorizontalRuleFeature(),
        ]
      },
    }),
    admin: {
      condition: (_, siblingData) => {
        return siblingData.type === 'media' ? false : true
      },
    },
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    admin: {
      condition: (_, siblingData) => {
        return siblingData.type === 'media' ? false : true
      },
    },
  },
  link({
    appearanceEnumName: 'pb_columns_block_content_columns_link_appearance',
    overrides: {
      admin: {
        condition: (_, { enableLink, type }) => {
          if (Boolean(enableLink) && type === 'text') {
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
    relationTo: 'media',
    admin: {
      condition: (_, siblingData) => {
        return siblingData.type === 'media' ? true : false
      },
    },
  },
  {
    name: 'mediaBorderRadius', // required
    label: 'Border Radius',
    enumName: 'p_blocks_columns_block_content_columns_media_border_radius',
    type: 'select', // required
    defaultValue: 'none',
    options: [
      {
        label: 'None',
        value: 'none',
      },
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
      {
        label: 'XL',
        value: 'xl',
      },
      {
        label: '2XL',
        value: 'xxl',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
    admin: {
      condition: (_, siblingData) => {
        return siblingData.type === 'media' ? true : false
      },
    },
  },
]

export const ColumnsBlock: Block = {
  slug: 'columnsBlock',
  interfaceName: 'ColumnsBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
    },

    StylesField({
      globalOverrides: [
        {
          name: 'width',
          type: 'select',
          defaultValue: 'boxed',
          options: [
            { label: 'Full Width', value: 'full' },
            { label: 'Boxed', value: 'boxed' },
          ],
        },
      ],
      desktopOverrides: [DesktopHorizontalPaddingField, DesktopVerticalPaddingField],
      tabletOverrides: [TabletHorizontalPaddingField, TabletVerticalPaddingField],
      mobileOverrides: [
        MobileHorizontalPaddingField,
        MobileVerticalPaddingField,
        {
          name: 'reverseWrap',
          label: 'Reverse Wrap',
          type: 'checkbox',
        },
      ],
    }),
  ],
}
