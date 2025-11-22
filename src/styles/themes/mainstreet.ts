/**
 * Main Street Theme - Warm & Nostalgic
 * Inspired by Disney's Main Street U.S.A. - cozy, welcoming, and timeless
 * Perfect for lifestyle blogs, personal stories, and warm, inviting content
 */

import type { Theme } from '../types'

export const mainstreetTheme: Theme = {
  name: 'mainstreet',
  
  colors: {
    primary: '#D97706', // Warm amber - cozy and inviting
    background: '#FFFBEB', // Soft cream background
    backgroundHover: '#FEF3C7', // Light amber hover
    text: '#1C1917', // Deep brown for readability
    textSecondary: '#78716C', // Warm brown-gray for secondary text
    border: '#FDE68A', // Soft amber border
    borderHover: '#F59E0B', // Bright amber on hover
    categoryBg: '#FEF3C7', // Light amber background for categories
    categoryText: '#92400E', // Deep amber for category text
    shadow: 'rgba(217, 119, 6, 0.15)', // Amber-tinted shadow
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
  },
  
  shadows: {
    sm: '0 2px 6px rgba(217, 119, 6, 0.12)',
    md: '0 4px 14px rgba(217, 119, 6, 0.18), 0 2px 6px rgba(217, 119, 6, 0.12)',
    lg: '0 10px 28px rgba(217, 119, 6, 0.25), 0 4px 10px rgba(217, 119, 6, 0.18)',
  },
  
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '400ms ease',
  },
  
  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  },
  
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
}

