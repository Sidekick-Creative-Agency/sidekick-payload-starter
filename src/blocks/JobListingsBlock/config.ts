import type { Block, Field } from 'payload'

import {
  AlignFeature,
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature } from '@/components/RichText/Color/features/textColor/feature.server'
import { BRAND_COLORS } from '@/utilities/constants'
import { FormBlock } from '../Form/config'
import { CarouselLexicalBlock } from '../Lexical/Carousel/config'
import { SubtitleLexicalBlock } from '../Lexical/Subtitle/config'
import { AdvancedFields } from '@/fields/Advanced'
import { DescriptionField } from './UI/Description/config'

export const JobListingsBlock: Block = {
  slug: 'jobListingsBlock',
  interfaceName: 'JobListingsBlock',
  admin: {
    components: {},
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature(), LinkFeature()]
        },
      }),
    },
    AdvancedFields,
    DescriptionField,
  ],
}
