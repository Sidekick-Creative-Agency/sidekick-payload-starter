import { Field } from 'payload'

export const MobileVerticalPaddingField: Field = {
  type: 'row',
  fields: [
    {
      name: 'padVertMbVal', // required
      label: 'Vertical Padding',
      type: 'number', // required
    },
    {
      name: 'padVertMbUnit',
      // enumName: 'pdVtMbUnit',
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
