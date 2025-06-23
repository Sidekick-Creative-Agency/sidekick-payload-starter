'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const findTeamMemberIdByName = async (name: string) => {
  const payload = await getPayload({ config: configPromise })
  const agents = await payload.find({
    collection: 'team-members',
    limit: 1,
    where: {
      title: {
        like: name,
      },
    },
  })
  return agents?.docs?.at(0)?.id || undefined
}
