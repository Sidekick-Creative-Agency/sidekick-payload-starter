import { getPlaiceholder } from 'plaiceholder'
export const getImagePlaceholder = async (url: string) => {
  try {
    const src = 'https://images.unsplash.com/photo-1621961458348-f013d219b50c'

    const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()))

    const { base64 } = await getPlaiceholder(buffer)

    return base64
  } catch (err) {
    console.log('Error: ', err)
    return undefined
  }
}
