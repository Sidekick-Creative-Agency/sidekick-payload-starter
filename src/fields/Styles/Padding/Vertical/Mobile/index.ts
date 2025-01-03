import { Field } from 'payload'

export const MobileVerticalPaddingField: Field = {
  type: 'row',
  fields: [
    {
      name: 'padVertMbVal', // required
      label: 'Vertical Padding',
      type: 'number', // required
      defaultValue: 4,
    },
    {
      name: 'padVertMbUnit',
      // enumName: 'pb_columns_block_style_group_pad_vert_mobile_unit',
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
