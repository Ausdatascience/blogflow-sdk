/**
 * Theme Registry
 * Exports all available themes
 */

import { defaultTheme } from './default'
import { blueTheme } from './blue'
import { minimalTheme } from './minimal'
import { modernTheme } from './modern'
import { darkTheme } from './dark'
import { magicTheme } from './magic'
import { fantasyTheme } from './fantasy'
import { adventureTheme } from './adventure'
import { tomorrowTheme } from './tomorrow'
import { mainstreetTheme } from './mainstreet'
import { eyecareTheme } from './eyecare'
import { purewhiteTheme } from './purewhite'
import { pureblackTheme } from './pureblack'
import { cyanblueTheme } from './cyanblue'
import type { Theme, ThemeName } from '../types'

export const themes: Record<Exclude<ThemeName, 'none'>, Theme> = {
  default: defaultTheme,
  blue: blueTheme,
  minimal: minimalTheme,
  modern: modernTheme,
  dark: darkTheme,
  magic: magicTheme,
  fantasy: fantasyTheme,
  adventure: adventureTheme,
  tomorrow: tomorrowTheme,
  mainstreet: mainstreetTheme,
  eyecare: eyecareTheme,
  purewhite: purewhiteTheme,
  pureblack: pureblackTheme,
  cyanblue: cyanblueTheme,
}

export function getTheme(name: ThemeName): Theme | null {
  if (name === 'none') return null
  return themes[name] || themes.default
}

export { 
  defaultTheme, 
  blueTheme, 
  minimalTheme, 
  modernTheme, 
  darkTheme,
  magicTheme,
  fantasyTheme,
  adventureTheme,
  tomorrowTheme,
  mainstreetTheme,
  eyecareTheme,
  purewhiteTheme,
  pureblackTheme,
  cyanblueTheme,
}

