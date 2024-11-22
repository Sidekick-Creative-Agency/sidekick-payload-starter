import { Field } from 'payload'

type StylesFieldType = (options?: {
  globalOverrides?: Field[]
  desktopOverrides?: Field[]
  tabletOverrides?: Field[]
  mobileOverrides?: Field[]
}) => Field

export const StylesField: StylesFieldType = ({
  globalOverrides = [],
  desktopOverrides = [],
  tabletOverrides = [],
  mobileOverrides = [],
} = {}) => ({
  type: 'group',
  name: 'styles',
  fields: [
    {
      type: 'collapsible',
      label: 'Styles',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          type: 'group',
          name: 'global',
          fields: globalOverrides,
        },
        {
          type: 'group',
          name: 'responsive',
          fields: [
            {
              label: 'Desktop',
              type: 'collapsible',
              admin: {
                initCollapsed: true,
              },
              fields: desktopOverrides || [],
            },
            {
              label: 'Tablet',
              type: 'collapsible',
              admin: {
                initCollapsed: true,
              },
              fields: tabletOverrides || [],
            },
            {
              label: 'Mobile',
              type: 'collapsible',
              admin: {
                initCollapsed: true,
              },
              fields: mobileOverrides || [],
            },
          ],
        },
      ],
    },
  ],
})
