export const formatFormFieldName = (value: string) => {
  return value
    ? value
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z-_]/g, '')
    : ''
}
