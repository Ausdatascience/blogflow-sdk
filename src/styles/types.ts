/**
 * Theme Types for BlogFlow SDK
 * Defines the structure of themes and styling configuration
 */

export interface ThemeColors {
  primary: string
  background: string
  backgroundHover: string
  text: string
  textSecondary: string
  border: string
  borderHover: string
  categoryBg: string
  categoryText: string
  shadow: string
}

export interface ThemeSpacing {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}

export interface ThemeBorderRadius {
  sm: string
  md: string
  lg: string
}

export interface ThemeShadows {
  sm: string
  md: string
  lg: string
}

export interface ThemeTransitions {
  fast: string
  normal: string
  slow: string
}

export interface ThemeFonts {
  sans: string
  mono: string
}

export interface ThemeFontSizes {
  xs: string
  sm: string
  base: string
  lg: string
  xl: string
  '2xl': string
}

export interface Theme {
  name: string
  colors: ThemeColors
  spacing: ThemeSpacing
  borderRadius: ThemeBorderRadius
  shadows: ThemeShadows
  transitions: ThemeTransitions
  fonts: ThemeFonts
  fontSizes: ThemeFontSizes
}

export type ThemeName = 'default' | 'blue' | 'minimal' | 'modern' | 'dark' | 'none'

export interface ThemeVars {
  primaryColor?: string
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  borderRadius?: string
  spacing?: string
  fontFamily?: string
}

export interface StylesConfig {
  /**
   * Theme to use
   * @default 'default'
   */
  theme?: ThemeName
  
  /**
   * Auto-inject styles on mount
   * @default true
   */
  autoInject?: boolean
  
  /**
   * Custom theme variables to override
   */
  themeVars?: ThemeVars
  
  /**
   * Custom class name prefix
   * @default 'blog-post'
   */
  classNamePrefix?: string
}

