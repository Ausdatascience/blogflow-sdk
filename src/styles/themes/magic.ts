/**
 * Magic Kingdom Theme - Disney Classic Red & Blue
 * Inspired by Disney's iconic Magic Kingdom colors
 * Warm, vibrant, and full of wonder - perfect for engaging content
 */

import type { Theme } from '../types'

export const magicTheme: Theme = {
  name: 'magic',
  
  colors: {
    primary: '#E60012', // Disney Classic Red - vibrant and energetic
    background: '#FFFFFF', // Pure white for contrast
    backgroundHover: '#FFF5F5', // Soft red tint on hover
    text: '#1A1A1A', // Deep charcoal for readability
    textSecondary: '#6B7280', // Warm gray for secondary text
    border: '#FED7D7', // Soft pink-red border
    borderHover: '#E60012', // Classic red on hover
    categoryBg: '#FEE2E2', // Light red background for categories
    categoryText: '#991B1B', // Deep red for category text
    shadow: 'rgba(230, 0, 18, 0.15)', // Red-tinted shadow
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
    sm: '0 2px 4px rgba(230, 0, 18, 0.1)',
    md: '0 4px 12px rgba(230, 0, 18, 0.15), 0 2px 4px rgba(230, 0, 18, 0.1)',
    lg: '0 10px 24px rgba(230, 0, 18, 0.2), 0 4px 8px rgba(230, 0, 18, 0.15)',
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

