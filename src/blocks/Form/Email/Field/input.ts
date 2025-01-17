import { formatFormFieldName } from '@/utilities/validateFieldName'
import { Block } from 'payload'

export const EmailField: Block = {
  slug: 'email',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name (lowercase, no special characters)',
          required: true,
          validate: (value: string) => {
            return /^[a-z-_]+$/.test(value) || 'Invalid input'
          },
          hooks: {
            beforeValidate: [({ value }) => formatFormFieldName(value)],
          },
          admin: {
            width: '50%',
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          localized: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'width',
          type: 'select',
          label: 'Field Width',
          options: [
            { label: 'One Third', value: 'oneThird' },
            { label: 'Half', value: 'half' },
            { label: 'Two Thirds', value: 'twoThirds' },
            { label: 'Full', value: 'full' },
          ],
        },
        {
          name: 'placeholder',
          type: 'text',
          admin: {
            width: '50%',
          },
          localized: true,
        },
      ],
    },
    {
      name: 'required',
      type: 'checkbox',
      label: 'Required',
    },
  ],
}
