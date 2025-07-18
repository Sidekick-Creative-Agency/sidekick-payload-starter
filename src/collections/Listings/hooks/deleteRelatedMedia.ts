import type { CollectionAfterDeleteHook } from 'payload'
import type { Listing, Media } from '../../../payload-types'

export const deleteRelatedMedia: CollectionAfterDeleteHook<Listing> = async ({
  doc,
  req: { payload },
}) => {
  console.log(doc.featuredImage)

  const relatedMedia = await payload.find({
    collection: 'media',
    where: {
      or: [
        {
          id: {
            equals:
              typeof doc.featuredImage === 'object' ? doc.featuredImage.id : doc.featuredImage,
          },
        },
        {
          id: {
            in:
              doc.imageGallery && doc.imageGallery.length > 0
                ? typeof doc.imageGallery[0].image === 'object'
                  ? doc.imageGallery.map(({ image }) => (image as Media).id).join(',')
                  : doc.imageGallery.map(({ image }) => image).join(',')
                : '',
          },
        },
      ],
    },
  })

  console.log('DELTED RELATED MEDIA: ', relatedMedia)
}
