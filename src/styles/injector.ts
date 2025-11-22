/**
 * Style Injector
 * Handles runtime CSS injection for themes
 */

import { generateCSS } from './generator'
import { getTheme } from './themes'
import type { ThemeName, ThemeVars } from './types'

// Track injected styles to avoid duplicates
const injectedThemes = new Set<string>()

/**
 * Inject theme styles into the document head
 * @param themeName - Name of the theme to inject
 * @param customVars - Optional custom theme variables
 * @returns The style element ID
 */
export function injectThemeStyles(
  themeName: ThemeName,
  customVars?: ThemeVars
): string | null {
  // Skip if theme is 'none'
  if (themeName === 'none') {
    return null
  }

  // Check if running in browser
  if (typeof document === 'undefined') {
    return null
  }

  // Generate unique ID for this theme configuration
  const themeId = `blogflow-theme-${themeName}`
  const customId = customVars ? `-custom-${JSON.stringify(customVars)}` : ''
  const styleId = `${themeId}${customId}`

  // Check if already injected
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
    return injectThemeStyles('default', customVars)
  }

  // Generate CSS
  const css = generateCSS(theme, customVars)

  // Create and inject style element
  const styleElement = document.createElement('style')
  styleElement.id = styleId
  styleElement.setAttribute('data-blogflow-theme', themeName)
  styleElement.textContent = css

  // Insert at the end of head to allow user overrides
  document.head.appendChild(styleElement)

  // Mark as injected
  injectedThemes.add(styleId)

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
  styleElements.forEach((element) => {
    element.remove()
  })
  injectedThemes.clear()
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

