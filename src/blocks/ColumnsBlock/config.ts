import type { Block, Field } from 'payload'

import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  IndentFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  TreeViewFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { StylesField } from '@/fields/Styles'
import { FormBlock } from '../Form/config'
import { BackgroundColorField } from '@/fields/Color/Background'
import { SubtitleLexicalBlock } from '../Lexical/Subtitle/config'
import { CarouselLexicalBlock } from '../Lexical/Carousel/config'
import { ColorField } from '@/fields/Color'
import { BRAND_COLORS } from '@/utilities/constants'
import { TextColorFeature } from '@/components/RichText/Color/features/textColor/feature.server'
import { CheckmarkListLexicalBlock } from '../Lexical/CheckmarkList/config'
import { AdvancedFields } from '@/fields/Advanced'
import { SpacerLexicalBlock } from '../Lexical/Spacer/config'
import { MediaGridLexicalBlock } from '../Lexical/MediaGrid/config'

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
    name: 'subtitleAlign',
    type: 'select',
    defaultValue: 'left',
    options: [
      {
        label: 'Left',
        value: 'left',
      },
      {
        label: 'Center',
        value: 'center',
      },
      {
        label: 'Right',
        value: 'right',
      },
    ],
    admin: {
      condition: (_, siblingData) => {
        return siblingData.type === 'text' && siblingData.enableSubtitle
      },
    },
  },
  ColorField({
    name: 'subtitleColor',
    adminOverrides: {
      condition: (_, siblingData) => {
        return siblingData.type === 'text' && siblingData.enableSubtitle
      },
    },
  }),
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
          UnorderedListFeature(),
          OrderedListFeature(),

          IndentFeature(),
          BlocksFeature({
            blocks: [
              FormBlock,
              CarouselLexicalBlock,
              CheckmarkListLexicalBlock,
              SpacerLexicalBlock,
              MediaGridLexicalBlock,
              SubtitleLexicalBlock,
            ],
          }),
          TextColorFeature({
            colors: [
              ...BRAND_COLORS.map((color) => {
                return {
                  type: 'button' as 'button' | 'palette',
                  label: color.label,
                  color: color.value,
                }
              }),
            ],
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
    name: 'enableLinks',
    type: 'checkbox',
    admin: {
      condition: (_, siblingData) => {
        return siblingData.type === 'media' ? false : true
      },
    },
  },
  {
    name: 'links',
    type: 'array',
    fields: [
      link({
        appearanceEnumName: 'pb_columns_block_content_columns_links_link_appearance',
      }),
    ],
    admin: {
      condition: (_, { enableLinks, type }) => {
        if (Boolean(enableLinks) && type === 'text') {
          return true
        }
        return false
      },
    },
    maxRows: 2,
  },

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
      maxRows: 3,
    },

    StylesField({
      globalFields: [
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
        {
          type: 'checkbox',
          name: 'enableDivider',
          label: 'Enable Column Divider',
          defaultValue: false,
        },
        ColorField({
          name: 'dividerColor',
          adminOverrides: {
            condition: (_, siblingData) => {
              return siblingData.enableDivider
            },
          },
        }),
      ],
      // desktopFields: [DesktopHorizontalPaddingField, DesktopVerticalPaddingField],
      // tabletFields: [TabletHorizontalPaddingField, TabletVerticalPaddingField],
      mobileFields: [
        // MobileHorizontalPaddingField,
        // MobileVerticalPaddingField,
        {
          name: 'reverseWrap',
          label: 'Reverse Wrap',
          type: 'checkbox',
        },
      ],
    }),
    AdvancedFields,
  ],
}
