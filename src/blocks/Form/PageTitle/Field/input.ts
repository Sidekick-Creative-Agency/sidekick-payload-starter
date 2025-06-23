import { formatFormFieldName } from '@/utilities/validateFieldName'
import { Block } from 'payload'

export interface PageTitleField {
  blockName?: string
  blockType: 'pageTitle'
  defaultValue?: string
  name: string
}

export const PageTitle: Block = {
  slug: 'pageTitle',
  fields: [
    {
      name: 'name',
      type: 'text',
      hooks: {
        beforeValidate: [({ value }) => formatFormFieldName(value)],
      },
    },
    {
      name: 'title',
      type: 'text',
      hidden: true,
    },
    {
      type: 'ui',
      name: 'message',
      admin: {
        components: {
          Field: '@/blocks/Form/PageTitle/FieldMessage/index#FieldMessage',
        },
      },
    },
  ],
}
