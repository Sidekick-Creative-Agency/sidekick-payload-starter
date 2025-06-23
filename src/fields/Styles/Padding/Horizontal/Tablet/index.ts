import { Field } from 'payload'

export const TabletHorizontalPaddingField: Field = {
  type: 'row',
  fields: [
    {
      name: 'padHorTabVal', // required
      label: 'Horizontal Padding',
      type: 'number', // required
    },
    {
      name: 'padHorTabUnit',
      // enumName: 'pb_columns_block_style_group_pad_horiz_tablet_unit',
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
