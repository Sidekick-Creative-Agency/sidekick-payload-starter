import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user, headers } }) => {
  if (user) {
    return true
  }

  const payloadSecret = process.env.PAYLOAD_SECRET
  const authSecret = headers?.get('Authorization')?.split(' ')[1]
  if (authSecret === payloadSecret) {
    return true
  }
  return false
}
