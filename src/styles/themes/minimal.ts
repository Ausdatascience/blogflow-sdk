/**
 * Minimal Theme - Monochrome
 * Clean and simple design with minimal colors
 */

import type { Theme } from '../types'

export const minimalTheme: Theme = {
  name: 'minimal',
  
  colors: {
    primary: '#000000',
    background: '#f8f8f8', // 浅灰色背景（更明显）
    backgroundHover: '#f0f0f0', // 稍深的灰色
    text: '#1a1a1a', // 深灰色文字（更明显）
    textSecondary: '#4a4a4a', // 中灰色次要文字
    border: '#d4d4d4', // 灰色边框
    borderHover: '#000000',
    categoryBg: '#e8e8e8', // 灰色分类背景
    categoryText: '#000000',
    shadow: 'rgba(0, 0, 0, 0.08)', // 稍深的阴影
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    md: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    lg: '0 4px 8px 0 rgba(0, 0, 0, 0.08)',
  },
  
  transitions: {
    fast: '100ms ease',
    normal: '150ms ease',
    slow: '200ms ease',
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

