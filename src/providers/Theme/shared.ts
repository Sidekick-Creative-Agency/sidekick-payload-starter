import type { Theme } from './types'

export const themeLocalStorageKey = 'payload-theme'

export const defaultTheme = 'transparent'

export const getImplicitPreference = (): Theme | null => {
  // const mediaQuery = '(prefers-color-scheme: dark)'
  // const mql = window.matchMedia(mediaQuery)
  // const hasImplicitPreference = typeof mql.matches === 'boolean'
  // if (hasImplicitPreference) {
  //   return mql.matches ? 'transparent' : 'filled'
  // }

  return null
}
