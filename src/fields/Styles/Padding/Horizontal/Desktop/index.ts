import { Field } from 'payload'

export const DesktopHorizontalPaddingField: Field = {
  type: 'row',
  fields: [
    {
      name: 'padHorDeskVal', // required
      label: 'Horizontal Padding',
      type: 'number', // required
    },
    {
      name: 'padHorDeskUnit',
      // enumName: 'pdHrDkUnit',

      label: 'Unit',
      type: 'select',
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
