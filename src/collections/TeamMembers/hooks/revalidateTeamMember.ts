import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { TeamMember } from '../../../payload-types'

export const revalidateTeamMember: CollectionAfterChangeHook<TeamMember> = ({
  doc,
  req: { payload },
}) => {
  const path = `/team-members/${doc.slug}`

  payload.logger.info(`Revalidating team member at path: ${path}`)

  revalidatePath(path)

  return doc
}
