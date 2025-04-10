import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const LinkGroupLexicalBlock: Block = {
  slug: 'linkGroup',
  interfaceName: 'linkGroupLexicalBlock',
  fields: [
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
