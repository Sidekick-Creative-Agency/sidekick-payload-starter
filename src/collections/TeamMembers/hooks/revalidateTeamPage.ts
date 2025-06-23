import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { TeamMember } from '../../../payload-types'

export const revalidateTeamPage: CollectionAfterChangeHook<TeamMember> = ({
  doc,
  req: { payload },
}) => {
  if (doc.slug) {
    const path = '/team-members'
    payload.logger.info(`Revalidating team page at path: ${path}`)
    revalidatePath(path)
  }

  return doc
}
