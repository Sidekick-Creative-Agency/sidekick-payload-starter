import {
  APIError,
  CollectionAfterChangeHook,
  CollectionAfterReadHook,
  CollectionBeforeChangeHook,
  CollectionBeforeValidateHook,
} from 'payload'
import { getPlaiceholder } from 'plaiceholder'
import sharp from 'sharp'

export const generateBlurHash: CollectionBeforeValidateHook = async ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    try {
      if (!data?.mimeType.includes('image')) return
      let buffer = req?.file?.data
      if (!buffer) {
        buffer = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000' + data.url,
        ).then(async (res) => Buffer.from(await res.arrayBuffer()))
      }
      if (buffer) {
        const { base64 } = await getPlaiceholder(buffer, { size: 32 })
        return {
          ...data,
          blurhash: base64,
        }
      }
    } catch (error) {
      throw new APIError('Failed to generate blur data url: ' + error)
    }
  }
}
