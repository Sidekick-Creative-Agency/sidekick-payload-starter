import { Field } from 'payload'

export const TabletHorizontalPaddingField: Field = {
  type: 'row',
  fields: [
    {
      name: 'padHorTabVal', // required
      label: 'Horizontal Padding',
      type: 'number', // required
      defaultValue: 2.5,
    },
    {
      name: 'padHorTabUnit',
      // enumName: 'pb_columns_block_style_group_pad_horiz_tablet_unit',
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
