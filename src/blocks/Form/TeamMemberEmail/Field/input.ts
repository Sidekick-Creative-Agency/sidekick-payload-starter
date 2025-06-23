import { formatFormFieldName } from '@/utilities/validateFieldName'
import { Block } from 'payload'

export interface TeamMemberEmailField {
  blockName?: string
  blockType: 'teamMemberEmail'
  defaultValue?: string
  name: string
}

export const TeamMemberEmail: Block = {
  slug: 'teamMemberEmail',
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
          Field: '@/blocks/Form/TeamMemberEmail/FieldMessage/index#FieldMessage',
        },
      },
    },
  ],
}
