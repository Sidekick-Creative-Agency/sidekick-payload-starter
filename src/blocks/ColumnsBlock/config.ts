import type { Block, Field } from 'payload'

import {
  AlignFeature,
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
import { BackgroundColorField } from '@/fields/Color/Background'
import { SubtitleLexicalBlock } from '../Lexical/Subtitle/config'
import { CarouselLexicalBlock } from '../Lexical/Carousel/config'
import { TextColorField } from '@/fields/Color/Text'
import { ColorField } from '@/fields/Color'
import { BRAND_COLORS } from '@/utilities/constants'
import { color } from 'framer-motion'
import { TextColorFeature } from '@/components/RichText/Color/features/textColor/feature.server'

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
    defaultValue: 'half',
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
  BackgroundColorField({
    adminOverrides: {
      condition: (_, siblingData) => {
        return siblingData.type === 'media' ? false : true
      },
    },
  }),
  {
    name: 'backgroundImage',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, siblingData) => {
        return siblingData.type === 'media' ? false : true
      },
    },
  },
  {
    name: 'enableSubtitle',
    type: 'checkbox',
    admin: {
      condition: (_, siblingData) => {
        return siblingData.type === 'media' ? false : true
      },
    },
  },
  {
    name: 'subtitle',
    type: 'text',
    admin: {
      condition: (_, siblingData) => {
        return siblingData.type === 'text' && siblingData.enableSubtitle === true ? true : false
      },
    },
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
          AlignFeature(),
          BlocksFeature({ blocks: [FormBlock, SubtitleLexicalBlock, CarouselLexicalBlock] }),
          TextColorFeature({
            colors: BRAND_COLORS.map((color) => {
              return {
                type: 'button',
                label: color.label,
                color: color.value,
              }
            }),
          }),
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
  {
    type: 'group',
    name: 'styles',
    fields: [
      {
        type: 'checkbox',
        name: 'enableTopBorder',
        label: 'Enable Top Border',
        defaultValue: false,
      },
      ColorField({
        name: 'borderColor',
        adminOverrides: {
          condition: (_, siblingData) => {
            return siblingData.enableTopBorder
          },
        },
      }),
    ],
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
      maxRows: 2,
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
        BackgroundColorField(),
      ],
      // desktopOverrides: [DesktopHorizontalPaddingField, DesktopVerticalPaddingField],
      // tabletOverrides: [TabletHorizontalPaddingField, TabletVerticalPaddingField],
      mobileOverrides: [
        // MobileHorizontalPaddingField,
        // MobileVerticalPaddingField,
        {
          name: 'reverseWrap',
          label: 'Reverse Wrap',
          type: 'checkbox',
        },
      ],
    }),
  ],
}
