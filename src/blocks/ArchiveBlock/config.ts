import { AdvancedFields } from '@/fields/Advanced'
import { ColorField } from '@/fields/Color'
import type { Block } from 'payload'

export const ArchiveBlock: Block = {
  slug: 'archiveBlock',
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
      type: 'select',
      name: 'headingAlign',
      defaultValue: 'left',
      options: [
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      defaultValue: 'posts',
      label: 'Collection',
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
      name: 'selectionType',
      type: 'select',
      defaultValue: 'categories',
      options: [
        {
          label: 'Manual',
          value: 'manual',
        },
        {
          label: 'Categories',
          value: 'categories',
        },
      ],
    },
    {
      name: 'manualSelection',
      type: 'relationship',
      relationTo: 'posts',
      admin: {
        condition: (_, siblingData) =>
          siblingData.relationTo === 'posts' && siblingData.selectionType === 'manual',
      },
      hasMany: true,
    },
    {
      name: 'enableCategoryBanner',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        condition: (_, siblingData) => siblingData.relationTo === 'posts',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) =>
          siblingData.relationTo === 'posts' && siblingData.selectionType === 'categories',
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
      relationTo: 'property-types',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 10,
      label: 'Limit',
    },

    {
      name: 'enablePropertyCategoryFilters',
      label: 'Enable Category Filters',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData.relationTo === 'listings',
      },
    },
    {
      name: 'defaultCategoryFilter',
      type: 'select',
      defaultValue: 'commercial',
      options: [
        {
          value: 'commercial',
          label: 'Commercial',
        },
        {
          value: 'residential',
          label: 'Residential',
        },
      ],
      admin: {
        condition: (_, siblingData) =>
          siblingData.relationTo === 'listings' && siblingData.enablePropertyCategoryFilters,
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        {
          value: 'grid',
          label: 'Grid',
        },
        {
          value: 'carousel',
          label: 'Carousel',
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.relationTo === 'posts',
      },
    },
    ColorField({
      name: 'buttonColor',
      adminOverrides: {
        condition: (_, siblingData) => {
          return siblingData.relationTo === 'posts'
        },
      },
    }),
    {
      name: 'enablePostCategoryFilter',
      label: 'Enable Category Filter',
      type: 'checkbox',
      admin: {
        condition: (_, siblingData) =>
          siblingData.relationTo === 'posts' && siblingData.layout === 'grid',
      },
    },
    {
      name: 'enableExcerpt',
      label: 'Enable Excerpt',
      type: 'checkbox',
      admin: {
        condition: (_, siblingData) => siblingData.relationTo === 'posts',
      },
    },
    {
      name: 'enableDate',
      label: 'Enable Date',
      type: 'checkbox',
      admin: {
        condition: (_, siblingData) => siblingData.relationTo === 'posts',
      },
    },
    {
      name: 'enableGutter',
      label: 'Enable Gutter',
      type: 'checkbox',
      admin: {
        condition: (_, siblingData) => siblingData.relationTo === 'posts',
        description: 'Adds padding on the sides of the Post Card text',
      },
    },
    AdvancedFields,
  ],
  labels: {
    plural: 'Archives',
    singular: 'Archive',
  },
}
