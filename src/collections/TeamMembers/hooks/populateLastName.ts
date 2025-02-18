import type { CollectionBeforeChangeHook } from 'payload'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateLastName: CollectionBeforeChangeHook = async ({ data }) => {
  if (data?.title) {
    data.lastName = data.title.split(' ')[data.title.split(' ').length - 1]
  }

  return data
}
