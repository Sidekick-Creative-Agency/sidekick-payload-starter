export function cleanNumber(str: string): number | undefined {
  const cleanedStr = str.replace(/[^0-9\.-]/g, '')
  return isNaN(Number(cleanedStr)) ? undefined : Number(cleanedStr)
}
