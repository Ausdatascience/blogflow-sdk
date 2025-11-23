/**
 * Pure White Theme - 纯白主题
 * Clean white design with minimal colors
 * Best for minimalist and clean designs
 */

import type { Theme } from '../types'

export const purewhiteTheme: Theme = {
  name: 'purewhite',
  
  colors: {
    primary: '#000000', // 纯黑作为主色
    primaryText: '#ffffff', // 主色背景上的文字颜色（白色）
    background: '#ffffff', // 纯白背景
    backgroundHover: '#f5f5f5', // 极浅灰 hover
    text: '#000000', // 纯黑文字
    textSecondary: '#666666', // 中灰色次要文字
    border: '#e0e0e0', // 浅灰边框
    borderHover: '#000000', // 纯黑 hover
    categoryBg: '#f5f5f5', // 极浅灰分类背景
    categoryText: '#000000', // 纯黑分类文字
    shadow: 'rgba(0, 0, 0, 0.08)', // 极淡阴影
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
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.06)',
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

