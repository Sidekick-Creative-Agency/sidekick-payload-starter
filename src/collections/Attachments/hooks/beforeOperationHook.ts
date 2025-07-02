import { getMeUser } from '@/utilities/getMeUser'
import { CollectionBeforeOperationHook, CollectionBeforeValidateHook } from 'payload'

export const beforeOperationHook: CollectionBeforeOperationHook = async ({ args, req }) => {
  console.log(req.headers.get('cookie'))
  if (!req.user) {
    const user = await getMeUser()
    req.user = {
      ...user.user,
      collection: 'users',
    }
  }
  console.log(req.user)
}
