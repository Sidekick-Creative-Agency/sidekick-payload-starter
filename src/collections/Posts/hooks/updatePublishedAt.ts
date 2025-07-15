import type { CollectionBeforeChangeHook } from 'payload'

import type { Post } from '../../../payload-types'

export const updatePublishedAt: CollectionBeforeChangeHook<Post> = ({
  req: { payload },
  data,
  originalDoc,
}) => {
  if (originalDoc?._status !== 'published' && data._status === 'published') {
    payload.logger.info(`Setting publishedAt for post: ${data.slug}`)
    data.publishedAt = new Date().toISOString()
  }

  return data
}
