import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { TextColorField } from '@/fields/Color/Text'

export const SubtitleLexicalBlock: Block = {
  slug: 'subtitle',
  interfaceName: 'subtitleLexicalBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
    },
    TextColorField(),
  ],
}
