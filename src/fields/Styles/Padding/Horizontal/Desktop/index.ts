import { Field } from 'payload'

export const DesktopHorizontalPaddingField: Field = {
  type: 'row',
  fields: [
    {
      name: 'paddingHorizontalDesktopValue', // required
      label: 'Horizontal Padding',
      type: 'number', // required
      defaultValue: 2.5,
    },
    {
      name: 'paddingHorizontalDesktopUnit',
      enumName: 'pb_columns_block_style_group_pad_horiz_desktop_unit',
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
