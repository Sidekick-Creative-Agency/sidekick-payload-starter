import type { Block } from 'payload'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'relationTo',
      type: 'select',
      defaultValue: 'posts',
      label: 'Collections To Show',
      options: [
        {
          label: 'Posts',
          value: 'posts',
        },
        {
          label: 'Team Members',
          value: 'team-members',
        },
        {
          label: 'Listings',
          value: 'listings',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.relationTo === 'posts',
      },
      hasMany: true,
      label: 'Categories To Show',
      relationTo: 'categories',
    },
    {
      name: 'propertyTypes',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.relationTo === 'listings',
      },
      hasMany: true,
      label: 'Property Types To Show',
      relationTo: 'propertyTypes',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { value: 'grid', label: 'Grid' },
        {
          value: 'carousel',
          label: 'Carousel',
        },
      ],
    },
    {
      name: 'navigationType',
      type: 'radio',
      defaultValue: 'arrows',
      options: [
        { value: 'arrows', label: 'Arrows' },
        {
          value: 'dots',
          label: 'Dots',
        },
        {
          value: 'both',
          label: 'Both',
        },
        {
          value: 'none',
          label: 'None',
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.layout === 'carousel',
      },
    },
  ],
  labels: {
    plural: 'Archives',
    singular: 'Archive',
  },
}
