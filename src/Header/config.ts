import type { Field, GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

const NavItemField: Field = {
  name: 'navItem',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'radio',
      options: [
        {
          label: 'Link',
          value: 'link',
        },
        {
          label: 'Parent',
          value: 'parent',
        },
      ],
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          condition: (_, { type }) => type === 'link',
        },
      },
    }),
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        condition: (_, { type }) => type === 'parent',
      },
    },
    {
      name: 'enableParentLink',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (_, { type }) => type === 'parent',
      },
    },
    link({
      appearances: false,
      overrides: {
        name: 'parentLink',
        admin: {
          condition: (_, { enableParentLink, type }) => {
            return enableParentLink && type === 'parent'
          },
        },
      },
    }),
    {
      name: 'childrenLinks',
      type: 'array',
      labels: {
        singular: 'Child Link',
        plural: 'Children Links',
      },
      fields: [link({ appearances: false })],
      admin: {
        condition: (_, { type }) => type === 'parent',
      },
    },
  ],
}

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navItems',
      type: 'array',

      fields: [NavItemField],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
