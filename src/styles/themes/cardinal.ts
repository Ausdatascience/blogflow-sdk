/**
 * Cardinal Theme - 卡迪尔深红主题
 * Rich cardinal red gradient design
 * Elegant and warm color scheme inspired by cardinal red
 */

import type { Theme } from '../types'

export const cardinalTheme: Theme = {
  name: 'cardinal',
  
  colors: {
    primary: '#C41E3A', // 卡迪尔深红色主色
    background: 'linear-gradient(135deg, #8B0000 0%, #A52A2A 50%, #C41E3A 100%)', // 深红到卡迪尔红渐变背景
    backgroundHover: 'linear-gradient(135deg, #A52A2A 0%, #C41E3A 50%, #DC143C 100%)', // 稍浅的卡迪尔红渐变 hover
    text: '#FFE4E1', // 浅粉红色文字
    textSecondary: '#FFB6C1', // 浅粉红色次要文字
    border: '#C41E3A', // 卡迪尔红边框
    borderHover: '#DC143C', // 亮红色 hover
    categoryBg: 'linear-gradient(135deg, #C41E3A 0%, #DC143C 100%)', // 卡迪尔红渐变分类背景
    categoryText: '#FFFFFF', // 白色分类文字
    shadow: 'rgba(196, 30, 58, 0.3)', // 卡迪尔红阴影
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
    sm: '0 1px 2px 0 rgba(196, 30, 58, 0.15)',
    md: '0 4px 6px -1px rgba(196, 30, 58, 0.2), 0 2px 4px -1px rgba(196, 30, 58, 0.15)',
    lg: '0 10px 15px -3px rgba(196, 30, 58, 0.25), 0 4px 6px -2px rgba(196, 30, 58, 0.2)',
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

