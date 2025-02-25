import type { Block, PaginatedDocs } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { DesktopHorizontalPaddingField } from '@/fields/Styles/Padding/Horizontal/Desktop'
import { DesktopVerticalPaddingField } from '@/fields/Styles/Padding/Vertical/Desktop'
import { TabletHorizontalPaddingField } from '@/fields/Styles/Padding/Horizontal/Tablet'
import { TabletVerticalPaddingField } from '@/fields/Styles/Padding/Vertical/Tablet'
import { MobileHorizontalPaddingField } from '@/fields/Styles/Padding/Horizontal/Mobile'
import { MobileVerticalPaddingField } from '@/fields/Styles/Padding/Vertical/Mobile'
import { StylesField } from '@/fields/Styles'
import { TextColorFeature } from '@/components/RichText/Color/features/textColor/feature.server'
import { BRAND_COLORS } from '@/utilities/constants'
import { AdvancedFields } from '@/fields/Advanced'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
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
      label: 'Intro Content',
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
            { label: 'Narrow', value: 'narrow' },
          ],
        },
        {
          name: 'theme',
          type: 'select',
          defaultValue: 'default',
          options: [
            {
              label: 'Default',
              value: 'default',
            },
            {
              label: 'Thin',
              value: 'thin',
            },
          ],
        },
      ],
      desktopFields: [DesktopHorizontalPaddingField, DesktopVerticalPaddingField],
      tabletFields: [TabletHorizontalPaddingField, TabletVerticalPaddingField],
      mobileFields: [MobileHorizontalPaddingField, MobileVerticalPaddingField],
    }),
    AdvancedFields,
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
