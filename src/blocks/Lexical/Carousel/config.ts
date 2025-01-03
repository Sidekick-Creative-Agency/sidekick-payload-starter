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
import { FormBlock } from '../../Form/config'
import { BackgroundColorField } from '@/fields/Color/Background'
import { SubtitleLexicalBlock } from '../Subtitle/config'

const carouselItemFields: Field[] = [
  {
    type: 'upload',
    relationTo: 'media',
    name: 'icon',
  },
  {
    name: 'heading',
    type: 'text',
  },
  {
    name: 'content',
    type: 'textarea',
  },
]

export const CarouselLexicalBlock: Block = {
  slug: 'carousel',
  interfaceName: 'carouselLexicalBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: carouselItemFields,
    },
  ],
}
