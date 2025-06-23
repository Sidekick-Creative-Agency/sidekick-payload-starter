import { FieldHook } from 'payload'

export const populateLastName: FieldHook = async ({ siblingData, req: { payload } }) => {
  if (siblingData?.title?.split(' ').length > 1) {
    const lastName = siblingData.title.split(' ')[siblingData.title.split(' ').length - 1]
    return lastName
  }
  return ''
}
