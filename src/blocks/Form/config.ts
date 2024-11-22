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

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      defaultValue: async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forms`)
        const data: PaginatedDocs<{ id: string }> = await response.json()
        return data?.docs?.at(0)?.id
      },
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
          ]
        },
      }),
      label: 'Intro Content',
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
            { label: 'Narrow', value: 'narrow' },
          ],
        },
      ],
      desktopOverrides: [DesktopHorizontalPaddingField, DesktopVerticalPaddingField],
      tabletOverrides: [TabletHorizontalPaddingField, TabletVerticalPaddingField],
      mobileOverrides: [MobileHorizontalPaddingField, MobileVerticalPaddingField],
    }),
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
