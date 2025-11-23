/**
 * Cyan Blue Gradient Theme - 青蓝渐变主题
 * Beautiful cyan to blue gradient design
 * Best for modern and vibrant websites
 */

import type { Theme } from '../types'

export const cyanblueTheme: Theme = {
  name: 'cyanblue',
  
  colors: {
    primary: '#06b6d4', // 青色主色
    background: 'linear-gradient(135deg, #0d1b2a 0%, #1a237e 50%, #1565c0 100%)', // 深蓝渐变背景
    backgroundHover: 'linear-gradient(135deg, #1a237e 0%, #1565c0 50%, #1976d2 100%)', // 稍浅的深蓝渐变 hover
    text: '#e3f2fd', // 浅蓝色文字
    textSecondary: '#90caf9', // 浅蓝色次要文字
    border: '#1565c0', // 深蓝色边框
    borderHover: '#42a5f5', // 中蓝色 hover
    categoryBg: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)', // 深蓝渐变分类背景
    categoryText: '#ffffff', // 白色分类文字
    shadow: 'rgba(21, 101, 192, 0.3)', // 深蓝色阴影
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
    sm: '0 1px 2px 0 rgba(6, 182, 212, 0.15)',
    md: '0 4px 6px -1px rgba(6, 182, 212, 0.2), 0 2px 4px -1px rgba(6, 182, 212, 0.15)',
    lg: '0 10px 15px -3px rgba(6, 182, 212, 0.25), 0 4px 6px -2px rgba(6, 182, 212, 0.2)',
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

