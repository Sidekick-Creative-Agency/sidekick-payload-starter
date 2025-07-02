import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { TeamMember } from '../../../payload-types'

export const revalidateSignaturesPage: CollectionAfterChangeHook<TeamMember> = ({
  doc,
  req: { payload },
}) => {
  if (doc.slug) {
    const path = '/signatures'
    payload.logger.info(`Revalidating email signatures page at path: ${path}`)
    revalidatePath(path)
  }

  return doc
}
