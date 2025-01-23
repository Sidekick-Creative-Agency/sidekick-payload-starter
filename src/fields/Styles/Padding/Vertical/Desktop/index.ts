import { Field } from 'payload'

export const DesktopVerticalPaddingField: Field = {
  type: 'row',
  fields: [
    {
      name: 'padVertDeskVal', // required
      label: 'Vertical Padding',
      type: 'number', // required
      defaultValue: 0,
    },
    {
      name: 'padVertDeskUnit',
      // enumName: 'pb_columns_block_style_group_pad_vert_desktop_unit',
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
