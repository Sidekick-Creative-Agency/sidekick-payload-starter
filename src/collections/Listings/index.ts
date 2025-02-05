import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'

import { revalidateListing } from './hooks/revalidateListing'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/Slug'

export const Listings: CollectionConfig = {
  slug: 'listings',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'listings',
        })

        return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'listings',
      })

      return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${path}`
    },
    components: {
      beforeList: ['/components/Admin/LinkToImportView#LinkToImportView'],
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'imageGallery',
              type: 'array',
              labels: {
                singular: 'Image',
                plural: 'Images',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'category',
              type: 'select',
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
            },
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    OrderedListFeature(),
                    UnorderedListFeature(),
                    LinkFeature(),
                  ]
                },
              }),
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                },
                {
                  name: 'propertyType',
                  type: 'relationship',
                  relationTo: 'property-types',
                  hasMany: true,
                  unique: false,
                },
              ],
            },

            {
              type: 'row',
              fields: [
                {
                  name: 'transactionType',
                  type: 'select',
                  options: [
                    {
                      label: 'For Sale',
                      value: 'for-sale',
                    },
                    {
                      label: 'For Lease',
                      value: 'for-lease',
                    },
                  ],
                },
                {
                  name: 'availability',
                  label: 'Status',
                  type: 'select',
                  options: [
                    {
                      label: 'Available',
                      value: 'available',
                    },
                    {
                      label: 'Unavailable',
                      value: 'unavailable',
                    },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'area',
                  type: 'number',
                  admin: {
                    description: 'Square footage of the property',
                  },
                },
                {
                  name: 'acreage',
                  type: 'number',
                },
              ],
            },

            {
              name: 'streetAddress',
              type: 'text',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'city',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'state',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'zipCode',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'coordinates',
                  type: 'point',
                  required: true,
                },
              ],
            },
            {
              name: 'attachments',
              type: 'array',
              fields: [
                {
                  name: 'attachment',
                  type: 'upload',
                  relationTo: 'attachments',
                },
              ],
            },
            {
              name: 'isFeatured',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'agents',
              type: 'relationship',
              relationTo: 'team-members',
              hasMany: true,
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateListing],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
