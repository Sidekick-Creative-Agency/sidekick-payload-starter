import { Field } from 'payload'

export const MobileHorizontalPaddingField: Field = {
  type: 'row',
  fields: [
    {
      name: 'padHorMbVal', // required
      label: 'Horizontal Padding',
      type: 'number', // required
      defaultValue: 0,
    },
    {
      name: 'padHorMbUnit',
      // enumName: 'pb_columns_block_style_group_pad_horiz_mobile_unit',
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
