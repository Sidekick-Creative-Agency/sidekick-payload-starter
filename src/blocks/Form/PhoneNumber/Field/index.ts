import { formatFormFieldName } from '@/utilities/validateFieldName'
import { Block } from 'payload'

const validatePhoneNumber = (value: string) => {
  return !value || value === '' || Boolean(/^\d{10}$/.test(value))
}

export interface PhoneNumberField {
  blockName?: string
  blockType: 'phoneNumber'
  defaultValue?: string
  label?: string
  name: string
  required?: boolean
  width?: string
}

export const PhoneNumber = {
  name: 'phoneNumber',
  slug: 'phoneNumber',
  labels: {
    singular: 'Phone Number',
    plural: 'Phone Numbers',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          validate: (value: string) => {
            return /^[a-z-_]+$/.test(value) || 'Invalid input'
          },
          hooks: {
            beforeValidate: [({ value }) => formatFormFieldName(value)],
          },
        },
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Phone Number',
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
          admin: {
            width: '50%',
          },
        },
        {
          name: 'defaultValue',
          type: 'text',
          validate: (value: string) => validatePhoneNumber(value) || 'Invalid phone number',
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
