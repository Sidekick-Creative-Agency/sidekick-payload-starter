import { Field } from 'payload'

export const DescriptionField: Field = {
  type: 'ui',
  name: 'description',
  admin: {
    components: {
      Field: '@/blocks/JobListingsBlock/UI/Description/Component#DescriptionField',
    },
    disableListColumn: true,
  },
}
