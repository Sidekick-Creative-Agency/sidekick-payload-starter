import { Field } from 'payload'

export const DesktopVerticalPaddingField: Field = {
  type: 'row',
  fields: [
    {
      name: 'padVertDeskVal', // required
      label: 'Vertical Padding',
      type: 'number', // required
    },
    {
      name: 'padVertDeskUnit',
      enumName: 'pdVtDkUnit',
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
