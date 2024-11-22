import { Field } from 'payload'

export const MobileHorizontalPaddingField: Field = {
  type: 'row',
  fields: [
    {
      name: 'paddingHorizontalMobileValue', // required
      label: 'Horizontal Padding',
      type: 'number', // required
      defaultValue: 1.25,
    },
    {
      name: 'paddingHorizontalMobileUnit',
      enumName: 'pb_columns_block_style_group_pad_horiz_mobile_unit',
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
