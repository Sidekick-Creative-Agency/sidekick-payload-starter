import type { GlobalConfig } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { linkGroup } from '@/fields/linkGroup'
import { revalidateCookieBanner } from './hooks/revalidateCookieBanner'

export const CookieBanner: GlobalConfig = {
  slug: 'cookie-banner',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, LinkFeature(), FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    linkGroup({ appearances: false }),
  ],
  hooks: {
    afterChange: [revalidateCookieBanner],
  },
}
