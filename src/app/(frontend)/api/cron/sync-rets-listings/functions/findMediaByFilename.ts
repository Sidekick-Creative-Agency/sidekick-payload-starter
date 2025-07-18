import { Media } from '@/payload-types'
export const findMediaByFilename = (filename: string | undefined, media: Media[]) => {
  if (!filename) {
    console.log('NO FILENAME PROVIDED')
    return undefined
  }
  const foundMedia = media.find(
    (item) => item?.filename?.substring(0, item?.filename?.lastIndexOf('.')) === filename,
  )
  return foundMedia
}
