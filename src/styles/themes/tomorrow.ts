/**
 * Tomorrowland Theme - Futuristic Blue & Purple
 * Inspired by Disney's Tomorrowland - modern, tech-forward, and innovative
 * Perfect for tech blogs, innovation content, and futuristic designs
 */

import type { Theme } from '../types'

export const tomorrowTheme: Theme = {
  name: 'tomorrow',
  
  colors: {
    primary: '#3B82F6', // Bright blue - technology and innovation
    background: '#0F172A', // Deep slate background (dark mode ready)
    backgroundHover: '#1E293B', // Lighter slate on hover
    text: '#F1F5F9', // Light slate for text
    textSecondary: '#94A3B8', // Medium slate for secondary text
    border: '#334155', // Slate border
    borderHover: '#60A5FA', // Bright blue on hover
    categoryBg: '#1E3A8A', // Deep blue background for categories
    categoryText: '#93C5FD', // Light blue for category text
    shadow: 'rgba(59, 130, 246, 0.3)', // Blue-tinted shadow with glow
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
    sm: '0 2px 8px rgba(59, 130, 246, 0.2)',
    md: '0 4px 16px rgba(59, 130, 246, 0.25), 0 2px 8px rgba(59, 130, 246, 0.2)',
    lg: '0 10px 32px rgba(59, 130, 246, 0.35), 0 4px 12px rgba(59, 130, 246, 0.25)',
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

