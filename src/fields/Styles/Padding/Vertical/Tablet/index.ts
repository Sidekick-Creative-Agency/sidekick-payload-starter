import { Field } from 'payload'

export const TabletVerticalPaddingField: Field = {
  type: 'row',
  fields: [
    {
      name: 'padVertTabVal', // required
      label: 'Vertical Padding',
      type: 'number', // required
    },
    {
      name: 'padVertTabUnit',
      enumName: 'pdVtTbUnit',
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
