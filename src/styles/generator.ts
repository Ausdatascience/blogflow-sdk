/**
 * CSS Generator
 * Generates CSS from theme configuration
 */

import type { Theme, ThemeVars } from './types'

export function generateCSS(theme: Theme, customVars?: ThemeVars): string {
  // Apply custom variable overrides
  const colors = {
    primary: customVars?.primaryColor || theme.colors.primary,
    background: customVars?.backgroundColor || theme.colors.background,
    text: customVars?.textColor || theme.colors.text,
    border: customVars?.borderColor || theme.colors.border,
    ...theme.colors,
  }
  
  const borderRadius = customVars?.borderRadius || theme.borderRadius.md
  const spacing = customVars?.spacing || theme.spacing.md
  const fontFamily = customVars?.fontFamily || theme.fonts.sans
  
  return `
/* BlogFlow SDK - ${theme.name} Theme */
/* Auto-generated styles - Do not edit directly */

:root {
  /* Colors */
  --blogflow-primary: ${colors.primary};
  --blogflow-bg: ${colors.background};
  --blogflow-bg-hover: ${theme.colors.backgroundHover};
  --blogflow-text: ${colors.text};
  --blogflow-text-secondary: ${theme.colors.textSecondary};
  --blogflow-border: ${colors.border};
  --blogflow-border-hover: ${theme.colors.borderHover};
  --blogflow-category-bg: ${theme.colors.categoryBg};
  --blogflow-category-text: ${theme.colors.categoryText};
  --blogflow-shadow: ${theme.colors.shadow};
  
  /* Spacing */
  --blogflow-space-xs: ${theme.spacing.xs};
  --blogflow-space-sm: ${theme.spacing.sm};
  --blogflow-space-md: ${spacing};
  --blogflow-space-lg: ${theme.spacing.lg};
  --blogflow-space-xl: ${theme.spacing.xl};
  
  /* Border Radius */
  --blogflow-radius-sm: ${theme.borderRadius.sm};
  --blogflow-radius-md: ${borderRadius};
  --blogflow-radius-lg: ${theme.borderRadius.lg};
  
  /* Shadows */
  --blogflow-shadow-sm: ${theme.shadows.sm};
  --blogflow-shadow-md: ${theme.shadows.md};
  --blogflow-shadow-lg: ${theme.shadows.lg};
  
  /* Transitions */
  --blogflow-transition-fast: ${theme.transitions.fast};
  --blogflow-transition-normal: ${theme.transitions.normal};
  --blogflow-transition-slow: ${theme.transitions.slow};
  
  /* Fonts */
  --blogflow-font-sans: ${fontFamily};
  --blogflow-font-mono: ${theme.fonts.mono};
  
  /* Font Sizes */
  --blogflow-text-xs: ${theme.fontSizes.xs};
  --blogflow-text-sm: ${theme.fontSizes.sm};
  --blogflow-text-base: ${theme.fontSizes.base};
  --blogflow-text-lg: ${theme.fontSizes.lg};
  --blogflow-text-xl: ${theme.fontSizes.xl};
  --blogflow-text-2xl: ${theme.fontSizes['2xl']};
}

/* ========================================
   BlogPostList - Grid View
   ======================================== */

.blog-post-list-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--blogflow-space-lg);
}

@media (min-width: 640px) {
  .blog-post-list-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .blog-post-list-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .blog-post-list-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ========================================
   BlogPostList - Card View
   ======================================== */

.blog-post-list-card {
  display: flex;
  flex-direction: column;
  gap: var(--blogflow-space-lg);
}

/* ========================================
   BlogPostList - List View
   ======================================== */

.blog-post-list-list {
  display: flex;
  flex-direction: column;
  gap: var(--blogflow-space-md);
}

.blog-post-list-item {
  display: flex;
  gap: var(--blogflow-space-md);
  padding: var(--blogflow-space-md);
  background: var(--blogflow-bg);
  border-radius: var(--blogflow-radius-md);
  border: 1px solid var(--blogflow-border);
  cursor: pointer;
  transition: all var(--blogflow-transition-normal);
  font-family: var(--blogflow-font-sans);
}

.blog-post-list-item:hover {
  box-shadow: var(--blogflow-shadow-md);
  border-color: var(--blogflow-border-hover);
  transform: translateY(-2px);
  background: var(--blogflow-bg-hover);
}

.blog-post-list-item:focus {
  outline: 2px solid var(--blogflow-primary);
  outline-offset: 2px;
}

.blog-post-list-item-image {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  overflow: hidden;
  border-radius: var(--blogflow-radius-sm);
  background: var(--blogflow-bg-hover);
}

.blog-post-list-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--blogflow-transition-slow);
}

.blog-post-list-item:hover .blog-post-list-item-image img {
  transform: scale(1.05);
}

.blog-post-list-item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--blogflow-space-sm);
  min-width: 0;
}

.blog-post-list-item-title {
  font-size: var(--blogflow-text-lg);
  font-weight: 600;
  color: var(--blogflow-text);
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.blog-post-list-item-excerpt {
  font-size: var(--blogflow-text-sm);
  color: var(--blogflow-text-secondary);
  margin: 0;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.blog-post-list-item-meta {
  display: flex;
  align-items: center;
  gap: var(--blogflow-space-sm);
  font-size: var(--blogflow-text-xs);
  color: var(--blogflow-text-secondary);
  margin-top: auto;
}

.blog-post-list-item-category {
  padding: 0.125rem var(--blogflow-space-sm);
  background: var(--blogflow-category-bg);
  color: var(--blogflow-category-text);
  border-radius: var(--blogflow-radius-sm);
  font-weight: 500;
  white-space: nowrap;
}

.blog-post-list-item-date {
  white-space: nowrap;
}

/* ========================================
   BlogPostCard Component
   ======================================== */

.blog-post-card {
  background: var(--blogflow-bg);
  border-radius: var(--blogflow-radius-md);
  border: 1px solid var(--blogflow-border);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--blogflow-transition-normal);
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: var(--blogflow-font-sans);
}

.blog-post-card:hover {
  box-shadow: var(--blogflow-shadow-lg);
  border-color: var(--blogflow-border-hover);
  transform: translateY(-4px);
}

.blog-post-card:focus {
  outline: 2px solid var(--blogflow-primary);
  outline-offset: 2px;
}

.blog-post-card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--blogflow-bg-hover);
}

.blog-post-card-image-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--blogflow-transition-slow);
}

.blog-post-card:hover .blog-post-card-image-img {
  transform: scale(1.1);
}

.blog-post-card-content {
  padding: var(--blogflow-space-lg);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-post-card-title {
  font-size: var(--blogflow-text-xl);
  font-weight: 600;
  color: var(--blogflow-text);
  margin: 0 0 var(--blogflow-space-sm) 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.blog-post-card-excerpt {
  font-size: var(--blogflow-text-sm);
  color: var(--blogflow-text-secondary);
  margin: 0 0 var(--blogflow-space-md) 0;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  flex: 1;
}

.blog-post-card-meta {
  display: flex;
  align-items: center;
  gap: var(--blogflow-space-sm);
  font-size: var(--blogflow-text-xs);
  color: var(--blogflow-text-secondary);
  margin-top: auto;
  padding-top: var(--blogflow-space-sm);
  border-top: 1px solid var(--blogflow-border);
}

.blog-post-card-category {
  padding: 0.125rem var(--blogflow-space-sm);
  background: var(--blogflow-category-bg);
  color: var(--blogflow-category-text);
  border-radius: var(--blogflow-radius-sm);
  font-weight: 500;
  white-space: nowrap;
}

.blog-post-card-date {
  color: var(--blogflow-text-secondary);
  white-space: nowrap;
}

/* ========================================
   BlogSearch Component
   ======================================== */

.blog-search {
  margin-bottom: var(--blogflow-space-xl);
  font-family: var(--blogflow-font-sans);
}

.blog-search-header {
  margin-bottom: var(--blogflow-space-lg);
}

.blog-search-title {
  font-size: var(--blogflow-text-2xl);
  font-weight: 700;
  color: var(--blogflow-text);
  margin: 0 0 var(--blogflow-space-xs) 0;
  line-height: 1.2;
}

.blog-search-count {
  font-size: var(--blogflow-text-sm);
  color: var(--blogflow-text-secondary);
  margin: 0;
}

.blog-search-controls {
  display: flex;
  flex-direction: column;
  gap: var(--blogflow-space-md);
}

@media (min-width: 640px) {
  .blog-search-controls {
    flex-direction: row;
    align-items: center;
  }
}

.blog-search-input-wrapper {
  flex: 1;
  position: relative;
}

.blog-search-input {
  width: 100%;
  padding: var(--blogflow-space-sm) var(--blogflow-space-md);
  font-size: var(--blogflow-text-base);
  font-family: var(--blogflow-font-sans);
  color: var(--blogflow-text);
  background: var(--blogflow-bg);
  border: 1px solid var(--blogflow-border);
  border-radius: var(--blogflow-radius-md);
  transition: all var(--blogflow-transition-normal);
  outline: none;
}

.blog-search-input:focus {
  border-color: var(--blogflow-border-hover);
  box-shadow: 0 0 0 3px var(--blogflow-shadow);
  outline: none;
}

.blog-search-input::placeholder {
  color: var(--blogflow-text-secondary);
  opacity: 0.6;
}

.blog-search-actions {
  display: flex;
  gap: var(--blogflow-space-sm);
  align-items: center;
  flex-wrap: wrap;
}

.blog-search-language-toggle {
  display: flex;
  gap: var(--blogflow-space-xs);
  border: 1px solid var(--blogflow-border);
  border-radius: var(--blogflow-radius-md);
  overflow: hidden;
  background: var(--blogflow-bg);
}

.blog-search-language-toggle button {
  padding: var(--blogflow-space-xs) var(--blogflow-space-sm);
  font-size: var(--blogflow-text-sm);
  font-family: var(--blogflow-font-sans);
  color: var(--blogflow-text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--blogflow-transition-fast);
  outline: none;
}

.blog-search-language-toggle button:hover {
  background: var(--blogflow-bg-hover);
  color: var(--blogflow-text);
}

.blog-search-language-toggle button.active {
  background: var(--blogflow-primary);
  color: #ffffff;
  font-weight: 500;
}

.blog-search-refresh {
  padding: var(--blogflow-space-xs) var(--blogflow-space-md);
  font-size: var(--blogflow-text-sm);
  font-family: var(--blogflow-font-sans);
  color: var(--blogflow-text);
  background: var(--blogflow-bg);
  border: 1px solid var(--blogflow-border);
  border-radius: var(--blogflow-radius-md);
  cursor: pointer;
  transition: all var(--blogflow-transition-normal);
  outline: none;
}

.blog-search-refresh:hover:not(:disabled) {
  background: var(--blogflow-bg-hover);
  border-color: var(--blogflow-border-hover);
  color: var(--blogflow-text);
}

.blog-search-refresh:focus {
  outline: 2px solid var(--blogflow-primary);
  outline-offset: 2px;
}

.blog-search-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ========================================
   Empty State
   ======================================== */

.blog-post-list-empty {
  padding: var(--blogflow-space-xl) var(--blogflow-space-lg);
  text-align: center;
  color: var(--blogflow-text-secondary);
  background: var(--blogflow-bg-hover);
  border-radius: var(--blogflow-radius-md);
  border: 2px dashed var(--blogflow-border);
  font-family: var(--blogflow-font-sans);
}

/* ========================================
   Accessibility
   ======================================== */

.blog-post-list-item:focus-visible,
.blog-post-card:focus-visible {
  outline: 2px solid var(--blogflow-primary);
  outline-offset: 2px;
}

/* ========================================
   Reduced Motion
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  .blog-post-list-item,
  .blog-post-card,
  .blog-post-list-item-image img,
  .blog-post-card-image-img {
    transition: none;
  }

  .blog-post-list-item:hover,
  .blog-post-card:hover {
    transform: none;
  }

  .blog-post-list-item:hover .blog-post-list-item-image img,
  .blog-post-card:hover .blog-post-card-image-img {
    transform: none;
  }
}

/* ========================================
   Mobile Optimizations
   ======================================== */

@media (max-width: 640px) {
  .blog-post-list-item {
    flex-direction: column;
  }

  .blog-post-list-item-image {
    width: 100%;
    height: 160px;
  }

  .blog-post-card-image {
    height: 180px;
  }

  .blog-post-card-content {
    padding: var(--blogflow-space-md);
  }

  .blog-post-card-title {
    font-size: var(--blogflow-text-lg);
  }
}

/* ========================================
   Desktop Optimizations
   ======================================== */

@media (min-width: 1024px) {
  .blog-post-list-item-image {
    width: 160px;
    height: 120px;
  }
}
`.trim()
}

