import { getMeUser } from '@/utilities/getMeUser'
import { CollectionBeforeOperationHook, CollectionBeforeValidateHook } from 'payload'

export const beforeOperationHook: CollectionBeforeOperationHook = async ({ args, req }) => {
  if (!req.user) {
    const user = await getMeUser()
    req.user = {
      ...user.user,
      collection: 'users',
    }
  }
}
