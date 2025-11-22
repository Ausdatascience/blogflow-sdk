/**
 * Modern Theme - Vibrant & Bold
 * Contemporary design with gradients and bold colors
 */

import type { Theme } from '../types'

export const modernTheme: Theme = {
  name: 'modern',
  
  colors: {
    primary: '#8b5cf6',
    background: '#faf5ff', // 浅紫色背景（更明显）
    backgroundHover: '#f3e8ff', // 稍深的紫色背景
    text: '#6b21a8', // 深紫色文字（更明显）
    textSecondary: '#8b5cf6', // 紫色次要文字
    border: '#c4b5fd', // 紫色边框
    borderHover: '#8b5cf6',
    categoryBg: '#ede9fe', // 紫色分类背景
    categoryText: '#6b21a8',
    shadow: 'rgba(139, 92, 246, 0.2)', // 紫色阴影
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
    sm: '0 2px 4px 0 rgba(139, 92, 246, 0.08)',
    md: '0 6px 12px 0 rgba(139, 92, 246, 0.12)',
    lg: '0 12px 24px 0 rgba(139, 92, 246, 0.16)',
  },
  
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
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

