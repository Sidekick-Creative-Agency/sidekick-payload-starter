import { Field } from 'payload'

type StyleFieldType = (options?: { enumName?: string }) => Field

export const DesktopHorizontalPaddingField: Field = {
  type: 'row',
  fields: [
    {
      name: 'padHorDeskVal', // required
      label: 'Horizontal Padding',
      type: 'number', // required
      defaultValue: 2.5,
    },
    {
      name: 'padHorDeskUnit',
      // enumName: enumName,

      label: 'Unit',
      type: 'select',
      defaultValue: 'rem',
      options: [
        {
          value: 'rem',
          label: 'rem',
        },
        {
          value: 'px',
          label: 'px',
        },
        {
          value: '%',
          label: '%',
        },
      ],
    },
  ],
}
