/**
 * Fantasyland Theme - Dreamy Purple & Pink
 * Inspired by Disney's Fantasyland - magical, whimsical, and enchanting
 * Perfect for creative content, lifestyle blogs, and inspirational posts
 */

import type { Theme } from '../types'

export const fantasyTheme: Theme = {
  name: 'fantasy',
  
  colors: {
    primary: '#9333EA', // Rich purple - magical and regal
    background: '#FDF4FF', // Soft lavender-white background
    backgroundHover: '#FAE8FF', // Light purple hover
    text: '#1F2937', // Deep gray for readability
    textSecondary: '#7C3AED', // Purple-tinted secondary text
    border: '#E9D5FF', // Soft purple border
    borderHover: '#A855F7', // Vibrant purple on hover
    categoryBg: '#F3E8FF', // Light purple background for categories
    categoryText: '#6B21A8', // Deep purple for category text
    shadow: 'rgba(147, 51, 234, 0.2)', // Purple-tinted shadow
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
    sm: '0 2px 6px rgba(147, 51, 234, 0.12)',
    md: '0 4px 14px rgba(147, 51, 234, 0.18), 0 2px 6px rgba(147, 51, 234, 0.12)',
    lg: '0 10px 28px rgba(147, 51, 234, 0.25), 0 4px 10px rgba(147, 51, 234, 0.18)',
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

