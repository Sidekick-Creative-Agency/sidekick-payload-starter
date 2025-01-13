export type Theme = 'filled' | 'transparent'

export interface ThemeContextType {
  setTheme: (theme: Theme | null) => void // eslint-disable-line no-unused-vars
  theme?: Theme | null
}

export function themeIsValid(string: null | string): string is Theme {
  return string ? ['filled', 'transparent'].includes(string) : false
}
