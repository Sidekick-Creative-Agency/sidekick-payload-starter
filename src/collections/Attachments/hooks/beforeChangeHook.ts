import { generateId } from '@/utilities/generateId'
import { CollectionBeforeChangeHook } from 'payload'

export const beforeChangeHook: CollectionBeforeChangeHook = async ({ data, operation }) => {
  if (operation !== 'create') return data

  const filename = (data.filename as string)?.slice(0, -4)
  data.filename = `${filename}-${generateId(10)}.pdf`
  return data
}
