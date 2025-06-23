import { Field } from 'payload'

type StylesFieldType = (options?: {
  globalFields?: Field[]
  desktopFields?: Field[]
  tabletFields?: Field[]
  mobileFields?: Field[]
}) => Field

export const StylesField: StylesFieldType = ({
  globalFields = [],
  desktopFields = [],
  tabletFields = [],
  mobileFields = [],
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
          fields: globalFields,
        },
        {
          type: 'group',
          name: 'resp',
          label: 'Responsive',
          fields: [
            {
              label: 'Desktop',
              type: 'collapsible',
              admin: {
                initCollapsed: true,
                condition: () => desktopFields && desktopFields.length > 0,
              },
              fields: desktopFields || [],
            },
            {
              label: 'Tablet',
              type: 'collapsible',
              admin: {
                initCollapsed: true,
                condition: () => tabletFields && tabletFields.length > 0,
              },
              fields: tabletFields || [],
            },
            {
              label: 'Mobile',
              type: 'collapsible',
              admin: {
                initCollapsed: true,
                condition: () => mobileFields && mobileFields.length > 0,
              },
              fields: mobileFields || [],
            },
          ],
        },
      ],
    },
  ],
})
