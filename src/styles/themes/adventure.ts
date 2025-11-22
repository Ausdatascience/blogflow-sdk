/**
 * Adventureland Theme - Natural Green & Gold
 * Inspired by Disney's Adventureland - earthy, adventurous, and energetic
 * Perfect for travel blogs, outdoor content, and nature-focused posts
 */

import type { Theme } from '../types'

export const adventureTheme: Theme = {
  name: 'adventure',
  
  colors: {
    primary: '#16A34A', // Vibrant green - nature and growth
    background: '#F0FDF4', // Soft green-white background
    backgroundHover: '#DCFCE7', // Light green hover
    text: '#1F2937', // Deep charcoal for readability
    textSecondary: '#059669', // Green-tinted secondary text
    border: '#BBF7D0', // Soft green border
    borderHover: '#22C55E', // Bright green on hover
    categoryBg: '#D1FAE5', // Light green background for categories
    categoryText: '#047857', // Deep green for category text
    shadow: 'rgba(22, 163, 74, 0.18)', // Green-tinted shadow
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
    sm: '0 2px 6px rgba(22, 163, 74, 0.12)',
    md: '0 4px 14px rgba(22, 163, 74, 0.18), 0 2px 6px rgba(22, 163, 74, 0.12)',
    lg: '0 10px 28px rgba(22, 163, 74, 0.25), 0 4px 10px rgba(22, 163, 74, 0.18)',
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

