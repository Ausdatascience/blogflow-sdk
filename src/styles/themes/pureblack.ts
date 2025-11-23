/**
 * Pure Black Theme - 纯黑主题
 * Deep black design with high contrast
 * Best for dark mode enthusiasts
 */

import type { Theme } from '../types'

export const pureblackTheme: Theme = {
  name: 'pureblack',
  
  colors: {
    primary: '#ffffff', // 纯白作为主色
    background: '#000000', // 纯黑背景
    backgroundHover: '#1a1a1a', // 深灰 hover
    text: '#ffffff', // 纯白文字
    textSecondary: '#cccccc', // 浅灰次要文字
    border: '#333333', // 深灰边框
    borderHover: '#ffffff', // 纯白 hover
    categoryBg: '#1a1a1a', // 深灰分类背景
    categoryText: '#ffffff', // 纯白分类文字
    shadow: 'rgba(255, 255, 255, 0.1)', // 白色阴影
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
    md: '0 4px 6px -1px rgba(255, 255, 255, 0.08), 0 2px 4px -1px rgba(255, 255, 255, 0.05)',
    lg: '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.06)',
  },
  
  transitions: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease',
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

