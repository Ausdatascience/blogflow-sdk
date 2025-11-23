/**
 * Eye Care Theme - 护眼主题
 * Soft green tones designed to reduce eye strain
 * Best for long reading sessions
 */

import type { Theme } from '../types'

export const eyecareTheme: Theme = {
  name: 'eyecare',
  
  colors: {
    primary: '#7cb342', // 柔和的绿色
    background: '#f1f8e9', // 浅绿色背景，护眼
    backgroundHover: '#e8f5e9', // 稍深的绿色 hover
    text: '#2e7d32', // 深绿色文字，对比度适中
    textSecondary: '#558b2f', // 中绿色次要文字
    border: '#aed581', // 浅绿色边框
    borderHover: '#7cb342', // 主色 hover
    categoryBg: '#c5e1a5', // 浅绿色分类背景
    categoryText: '#33691e', // 深绿色分类文字
    shadow: 'rgba(124, 179, 66, 0.15)', // 绿色阴影
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
    sm: '0 1px 2px 0 rgba(124, 179, 66, 0.1)',
    md: '0 4px 6px -1px rgba(124, 179, 66, 0.15), 0 2px 4px -1px rgba(124, 179, 66, 0.1)',
    lg: '0 10px 15px -3px rgba(124, 179, 66, 0.2), 0 4px 6px -2px rgba(124, 179, 66, 0.15)',
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

