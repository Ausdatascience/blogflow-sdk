/**
 * Style Injector
 * Handles runtime CSS injection for themes
 */

import { generateCSS } from './generator'
import { getTheme } from './themes'
import type { ThemeName, ThemeVars, StylesConfig } from './types'

// Track injected styles to avoid duplicates
const injectedThemes = new Set<string>()

/**
 * Inject theme styles into the document head
 * @param themeName - Name of the theme to inject
 * @param customVars - Optional custom theme variables
 * @param replaceExisting - If true, remove all existing themes before injecting
 * @returns The style element ID
 */
export function injectThemeStyles(
  themeName: ThemeName,
  customVars?: ThemeVars,
  replaceExisting: boolean = true,
  stylesConfig?: Pick<StylesConfig, 'cardBorderWidth' | 'cardBorderRadius' | 'cardBorderColor' | 'cardShadow'>
): string | null {
  // Skip if theme is 'none'
  if (themeName === 'none') {
    return null
  }

  // Check if running in browser
  if (typeof document === 'undefined') {
    return null
  }

  // Remove all existing themes if replaceExisting is true
  if (replaceExisting) {
    removeAllThemeStyles()
  }

  // Generate unique ID for this theme configuration
  const themeId = `blogflow-theme-${themeName}`
  const customId = customVars ? `-custom-${JSON.stringify(customVars)}` : ''
  const stylesConfigId = stylesConfig ? `-styles-${JSON.stringify(stylesConfig)}` : ''
  const styleId = `${themeId}${customId}${stylesConfigId}`

  // Check if already injected (after removal, this should be false)
  if (injectedThemes.has(styleId)) {
    return styleId
  }

  // Check if style element already exists in DOM
  if (document.getElementById(styleId)) {
    injectedThemes.add(styleId)
    return styleId
  }

  // Get theme configuration
  const theme = getTheme(themeName)
  if (!theme) {
    console.warn(`[BlogFlow] Theme "${themeName}" not found, falling back to default`)
    return injectThemeStyles('default', customVars, replaceExisting, stylesConfig)
  }

  // Generate CSS
  const css = generateCSS(theme, customVars, stylesConfig)
  
  // Debug log for shadow intensity (development only)
  if (process.env.NODE_ENV === 'development' && stylesConfig?.cardShadow !== undefined) {
    console.log(`[BlogFlow] Shadow config:`, {
      cardShadow: stylesConfig.cardShadow,
      type: typeof stylesConfig.cardShadow,
      shadowIntensity: typeof stylesConfig.cardShadow === 'number' 
        ? Math.min(3, Math.max(0, Math.floor(stylesConfig.cardShadow)))
        : (stylesConfig.cardShadow ? 2 : 0)
    })
  }

  // Create and inject style element
  const styleElement = document.createElement('style')
  styleElement.id = styleId
  styleElement.setAttribute('data-blogflow-theme', themeName)
  styleElement.textContent = css

  // Insert at the end of head to allow user overrides
  document.head.appendChild(styleElement)

  // Mark as injected
  injectedThemes.add(styleId)

  // Debug log (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log(`[BlogFlow] Theme "${themeName}" injected with ID: ${styleId}`)
  }

  return styleId
}

/**
 * Remove injected theme styles
 * @param styleId - The style element ID to remove
 */
export function removeThemeStyles(styleId: string): void {
  if (typeof document === 'undefined') return

  const styleElement = document.getElementById(styleId)
  if (styleElement) {
    styleElement.remove()
    injectedThemes.delete(styleId)
  }
}

/**
 * Remove all BlogFlow theme styles
 */
export function removeAllThemeStyles(): void {
  if (typeof document === 'undefined') return

  const styleElements = document.querySelectorAll('[data-blogflow-theme]')
  const removedCount = styleElements.length
  styleElements.forEach((element) => {
    element.remove()
  })
  injectedThemes.clear()

  // Debug log (only in development)
  if (process.env.NODE_ENV === 'development' && removedCount > 0) {
    console.log(`[BlogFlow] Removed ${removedCount} theme style(s)`)
  }
}

/**
 * Check if a theme is currently injected
 * @param themeName - Name of the theme to check
 */
export function isThemeInjected(themeName: ThemeName): boolean {
  if (themeName === 'none') return false
  return Array.from(injectedThemes).some((id) => id.includes(themeName))
}

/**
 * Get all currently injected theme IDs
 */
export function getInjectedThemes(): string[] {
  return Array.from(injectedThemes)
}

