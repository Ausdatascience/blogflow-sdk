/**
 * Violet Gradient Theme - 紫罗兰渐变主题
 * Beautiful violet to purple gradient design
 * Elegant and sophisticated color scheme
 */

import type { Theme } from '../types'

export const violetTheme: Theme = {
  name: 'violet',
  
  colors: {
    primary: '#9D4EDD', // 紫罗兰主色
    background: 'linear-gradient(135deg, #4A148C 0%, #6A0DAD 50%, #9D4EDD 100%)', // 深紫到紫罗兰渐变背景
    backgroundHover: 'linear-gradient(135deg, #6A0DAD 0%, #9D4EDD 50%, #C77DFF 100%)', // 稍浅的紫罗兰渐变 hover
    text: '#F3E8FF', // 浅紫色文字
    textSecondary: '#E0AAFF', // 浅紫色次要文字
    border: '#9D4EDD', // 紫罗兰边框
    borderHover: '#C77DFF', // 浅紫罗兰 hover
    categoryBg: 'linear-gradient(135deg, #9D4EDD 0%, #C77DFF 100%)', // 紫罗兰渐变分类背景
    categoryText: '#FFFFFF', // 白色分类文字
    shadow: 'rgba(157, 78, 221, 0.3)', // 紫罗兰阴影
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
    sm: '0 1px 2px 0 rgba(157, 78, 221, 0.15)',
    md: '0 4px 6px -1px rgba(157, 78, 221, 0.2), 0 2px 4px -1px rgba(157, 78, 221, 0.15)',
    lg: '0 10px 15px -3px rgba(157, 78, 221, 0.25), 0 4px 6px -2px rgba(157, 78, 221, 0.2)',
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

