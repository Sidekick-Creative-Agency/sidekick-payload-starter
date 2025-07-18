import type { Access } from 'payload'

export const authenticatedOrPublished: Access = ({ req: { user, headers } }) => {
  if (user) {
    return true
  }
  const payloadSecret = process.env.PAYLOAD_SECRET
  const authSecret = headers?.get('Authorization')?.split(' ')[1]
  if (authSecret === payloadSecret) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
