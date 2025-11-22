/**
 * Blue Theme - Blue & White
 * Professional and clean design with blue accent colors
 */

import type { Theme } from '../types'

export const blueTheme: Theme = {
  name: 'blue',
  
  colors: {
    primary: '#3b82f6',
    background: '#f0f7ff', // 浅蓝色背景
    backgroundHover: '#e0efff', // 稍深的蓝色背景
    text: '#1e40af', // 深蓝色文字（更明显）
    textSecondary: '#3b82f6', // 蓝色次要文字
    border: '#3b82f6', // 蓝色边框
    borderHover: '#2563eb', // 深蓝色 hover
    categoryBg: '#dbeafe',
    categoryText: '#1e40af',
    shadow: 'rgba(59, 130, 246, 0.15)', // 蓝色阴影
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
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
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

