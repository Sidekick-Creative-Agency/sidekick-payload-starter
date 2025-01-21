export const validateNumberFieldInput = (input: string): boolean => {
  const validKeys = ['Backspace', 'Delete', 'Tab', 'Enter', 'Escape']
  if (!/[0-9]/.test(input) && !validKeys.includes(input)) {
    return false
  }
  return true
}
