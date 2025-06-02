import { FieldHook } from 'payload'

export const populateLastName: FieldHook = async ({ siblingData, req: { payload } }) => {
  if (siblingData?.title?.split(' ').length > 1) {
    const lastName = siblingData.title.split(' ')[siblingData.title.split(' ').length - 1]
    payload.logger.info(`Populating Last Name: ${lastName}`)
    return lastName
  }
  payload.logger.info('No last name found. Skipping population of last name.')
  return ''
}
