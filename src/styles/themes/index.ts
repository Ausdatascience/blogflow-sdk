/**
 * Theme Registry
 * Exports all available themes
 */

import { defaultTheme } from './default'
import { blueTheme } from './blue'
import { minimalTheme } from './minimal'
import { modernTheme } from './modern'
import { darkTheme } from './dark'
import type { Theme, ThemeName } from '../types'

export const themes: Record<Exclude<ThemeName, 'none'>, Theme> = {
  default: defaultTheme,
  blue: blueTheme,
  minimal: minimalTheme,
  modern: modernTheme,
  dark: darkTheme,
}

export function getTheme(name: ThemeName): Theme | null {
  if (name === 'none') return null
  return themes[name] || themes.default
}

export { defaultTheme, blueTheme, minimalTheme, modernTheme, darkTheme }

