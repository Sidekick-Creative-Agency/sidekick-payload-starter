import { TextColorFeature } from '@/components/RichText/Color/features/textColor/feature.server'
import { AdvancedFields } from '@/fields/Advanced'
import { BackgroundColorField } from '@/fields/Color/Background'
import { StylesField } from '@/fields/Styles'
import { BRAND_COLORS } from '@/utilities/constants'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

const cardFields: Field[] = [
  {
    name: 'icon',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'content',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
        ]
      },
    }),
  },
]

export const CardGridBlock: Block = {
  slug: 'cardGridBlock',
  interfaceName: 'CardGridBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      type: 'select',
      name: 'headingAlign',
      defaultValue: 'left',
      options: [
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      fields: cardFields,
    },
    StylesField({
      globalOverrides: [BackgroundColorField()],
    }),
    AdvancedFields,
  ],
}
