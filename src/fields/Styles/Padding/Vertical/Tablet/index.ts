import { Field } from 'payload'

export const TabletVerticalPaddingField: Field = {
  type: 'row',
  fields: [
    {
      name: 'padVertTabVal', // required
      label: 'Vertical Padding',
      type: 'number', // required
      defaultValue: 5,
    },
    {
      name: 'padVertTabUnit',
      // enumName: 'pb_columns_block_style_group_pad_vert_tablet_unit',
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
