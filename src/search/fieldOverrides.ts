import { Field } from 'payload'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'meta',
    label: 'Meta',
    type: 'group',
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        label: 'Title',
      },
      {
        type: 'text',
        name: 'description',
        label: 'Description',
      },
      {
        name: 'image',
        label: 'Image',
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
  {
    label: 'Categories',
    name: 'categories',
    type: 'array',
    admin: {
      readOnly: true,
      condition: (props) => {
        return props.doc.relationTo === 'posts'
      },
    },
    fields: [
      {
        name: 'relationTo',
        type: 'text',
      },
      {
        name: 'id',
        type: 'text',
      },
      {
        name: 'title',
        type: 'text',
      },
    ],
  },
  {
    label: 'Property Types',
    name: 'propertyTypes',
    type: 'array',
    admin: {
      readOnly: true,
      condition: (props) => {
        return props.doc.relationTo === 'propertyTypes'
      },
    },
    fields: [
      {
        name: 'relationTo',
        type: 'text',
      },
      {
        name: 'id',
        type: 'text',
      },
      {
        name: 'title',
        type: 'text',
      },
    ],
  },
]
