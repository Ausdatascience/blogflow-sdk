/**
 * CSS Generator
 * Generates CSS from theme configuration
 */

import type { Theme, ThemeVars } from './types'

export function generateCSS(theme: Theme, customVars?: ThemeVars, stylesConfig?: { cardBorderWidth?: string; cardBorderRadius?: string; cardBorderColor?: string; cardShadow?: boolean | number }): string {
  // Apply custom variable overrides
  const colors = {
    primary: customVars?.primaryColor || theme.colors.primary,
    background: customVars?.backgroundColor || theme.colors.background,
    text: customVars?.textColor || theme.colors.text,
    border: customVars?.borderColor || theme.colors.border,
    ...theme.colors,
  }
  
  const borderRadius = customVars?.borderRadius || theme.borderRadius.md
  const cardBorderRadius = stylesConfig?.cardBorderRadius || customVars?.borderRadius || theme.borderRadius.md
  // 处理 borderWidth：如果为 '0'、'0px' 或空字符串，则设为 '0'
  const borderWidthRaw = customVars?.borderWidth || stylesConfig?.cardBorderWidth || '1px'
  const borderWidthValue = borderWidthRaw.trim()
  const borderWidth = (borderWidthValue === '0' || borderWidthValue === '0px' || borderWidthValue === '') ? '0' : borderWidthRaw
  // 处理边框颜色
  const cardBorderColor = stylesConfig?.cardBorderColor || customVars?.borderColor || 'var(--blogflow-border)'
  const spacing = customVars?.spacing || theme.spacing.md
  const fontFamily = customVars?.fontFamily || theme.fonts.sans
  // 阴影控制：支持布尔值或数字（0=关闭，1-10=不同强度）
  const cardShadowRaw = customVars?.cardShadow !== undefined ? customVars.cardShadow : (stylesConfig?.cardShadow !== undefined ? stylesConfig.cardShadow : true)
  // shadowIntensity: 如果是数字，直接使用（0-10），如果是布尔值，true=5, false=0
  // 映射：0=无, 1-2=sm, 3-4=md, 5-6=lg, 7-8=xl, 9-10=2xl
  const shadowIntensityRaw = typeof cardShadowRaw === 'number' ? Math.min(10, Math.max(0, Math.floor(cardShadowRaw))) : (cardShadowRaw ? 5 : 0)
  const shadowIntensity = shadowIntensityRaw
  
  // For default theme, try to use website's global CSS variables with fallbacks
  const useWebsiteColors = theme.name === 'default'
  
  return `
/* BlogFlow SDK - ${theme.name} Theme */
/* Auto-generated styles - Do not edit directly */

:root {
  /* Colors */
  ${useWebsiteColors 
    ? `/* Default theme: Attempts to use website's global colors with fallbacks */
  --blogflow-primary: var(--primary, var(--color-primary, var(--accent, ${colors.primary})));
  --blogflow-bg: var(--background, var(--color-background, var(--bg, ${colors.background})));
  --blogflow-bg-hover: var(--background-hover, var(--color-background-hover, var(--bg-hover, ${theme.colors.backgroundHover})));
  --blogflow-text: var(--foreground, var(--color-foreground, var(--text, var(--color-text, ${colors.text}))));
  --blogflow-text-secondary: var(--foreground-secondary, var(--color-foreground-secondary, var(--text-secondary, ${theme.colors.textSecondary})));
  --blogflow-border: var(--border, var(--color-border, var(--border-color, ${colors.border})));
  --blogflow-border-hover: var(--border-hover, var(--color-border-hover, ${theme.colors.borderHover}));
  --blogflow-category-bg: var(--category-bg, var(--color-category-bg, ${theme.colors.categoryBg}));
  --blogflow-category-text: var(--category-text, var(--color-category-text, ${theme.colors.categoryText}));
  --blogflow-shadow: var(--shadow, var(--color-shadow, ${theme.colors.shadow}));`
    : `--blogflow-primary: ${colors.primary};
  --blogflow-bg: ${colors.background};
  --blogflow-bg-hover: ${theme.colors.backgroundHover};
  --blogflow-text: ${colors.text};
  --blogflow-text-secondary: ${theme.colors.textSecondary};
  --blogflow-border: ${colors.border};
  --blogflow-border-hover: ${theme.colors.borderHover};
  --blogflow-category-bg: ${theme.colors.categoryBg};
  --blogflow-category-text: ${theme.colors.categoryText};
  --blogflow-shadow: ${theme.colors.shadow};`
  }
  
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
  --blogflow-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
  --blogflow-shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  /* Transitions */
  --blogflow-transition-fast: ${theme.transitions.fast};
  --blogflow-transition-normal: ${theme.transitions.normal};
  --blogflow-transition-slow: ${theme.transitions.slow};
  
  /* Fonts */
  ${useWebsiteColors
    ? `--blogflow-font-sans: var(--font-family-base, var(--font-sans, var(--font-family, ${fontFamily})));
  --blogflow-font-mono: var(--font-mono, var(--font-family-mono, ${theme.fonts.mono}));`
    : `--blogflow-font-sans: ${fontFamily};
  --blogflow-font-mono: ${theme.fonts.mono};`
  }
  
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
   BlogPostList - Masonry View (Waterfall)
   ======================================== */

.blog-post-list-masonry {
  column-count: 1;
  column-gap: var(--blogflow-space-lg);
  column-fill: balance;
}

.blog-post-list-masonry .blog-post-card {
  break-inside: avoid;
  page-break-inside: avoid;
  margin-bottom: var(--blogflow-space-lg);
  display: inline-block;
  width: 100%;
}

@media (min-width: 640px) {
  .blog-post-list-masonry {
    column-count: 2;
  }
}

@media (min-width: 1024px) {
  .blog-post-list-masonry {
    column-count: 3;
  }
}

@media (min-width: 1280px) {
  .blog-post-list-masonry {
    column-count: 4;
  }
}

/* ========================================
   BlogPostList - Waterfall View
   ======================================== */

.blog-post-list-waterfall {
  position: relative;
  min-height: 400px;
}

.blog-post-list-waterfall [data-waterfall-item] {
  position: absolute;
  transition: all var(--blogflow-transition-normal);
}

.blog-post-list-waterfall [data-waterfall-item] .blog-post-card {
  width: 100%;
  height: 100%;
}

/* ========================================
   BlogPostList - Magazine View
   ======================================== */

.blog-post-list-magazine {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--blogflow-space-md);
}

@media (min-width: 640px) {
  .blog-post-list-magazine {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .blog-post-list-magazine {
    grid-template-columns: repeat(3, 1fr);
  }
}

.blog-post-magazine-item {
  display: flex;
  flex-direction: column;
}

.blog-post-magazine-item-large {
  grid-column: span 2;
}

@media (min-width: 640px) {
  .blog-post-magazine-item-large .blog-post-card {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .blog-post-magazine-item-large .blog-post-card-image {
    width: 40%;
    flex-shrink: 0;
    height: auto;
  }

  .blog-post-magazine-item-large .blog-post-card-image-img {
    height: 100%;
    object-fit: cover;
  }

  .blog-post-magazine-item-large .blog-post-card-content {
    flex: 1;
    padding: var(--blogflow-space-lg);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.blog-post-magazine-item-small .blog-post-card {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.blog-post-magazine-item-small .blog-post-card-image {
  width: 100%;
  aspect-ratio: 4 / 3;
}

.blog-post-magazine-item-small .blog-post-card-image-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ========================================
   BlogPostList - Dense View
   ======================================== */

.blog-post-list-dense {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--blogflow-space-sm);
}

@media (min-width: 640px) {
  .blog-post-list-dense {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) {
  .blog-post-list-dense {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1024px) {
  .blog-post-list-dense {
    grid-template-columns: repeat(6, 1fr);
  }
}

.blog-post-dense-item {
  transition: transform var(--blogflow-transition-normal);
}

.blog-post-dense-item:hover {
  transform: scale(1.05);
}

.blog-post-dense-item .blog-post-card {
  width: 100%;
}

/* ========================================
   BlogPostList - Timeline View
   ======================================== */

.blog-post-list-timeline {
  position: relative;
  padding-left: var(--blogflow-space-xl);
}

.blog-post-timeline-line {
  position: absolute;
  left: calc(var(--blogflow-space-xl) / 2);
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--blogflow-border);
}

.blog-post-timeline-content {
  position: relative;
}

.blog-post-timeline-item {
  position: relative;
  margin-bottom: var(--blogflow-space-xl);
}

.blog-post-timeline-dot {
  position: absolute;
  left: calc(-1 * var(--blogflow-space-xl) - 8px);
  top: var(--blogflow-space-md);
  width: 16px;
  height: 16px;
  background: var(--blogflow-primary);
  border-radius: 50%;
  border: 4px solid var(--blogflow-bg);
  box-shadow: 0 0 0 2px var(--blogflow-primary);
  z-index: 10;
}

.blog-post-timeline-card {
  margin-left: var(--blogflow-space-lg);
}

/* ========================================
   BlogPostList - Fullscreen View
   ======================================== */

.blog-post-list-fullscreen {
  display: flex;
  flex-direction: column;
}

.blog-post-fullscreen-item {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  cursor: pointer;
}

.blog-post-fullscreen-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.blog-post-fullscreen-image-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease-out;
}

.blog-post-fullscreen-image-zoom {
  transform: scale(1.05);
}

.blog-post-fullscreen-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5), transparent);
}

.blog-post-fullscreen-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--blogflow-space-xl);
  color: var(--blogflow-text);
}

.blog-post-fullscreen-content-inner {
  max-width: 64rem;
  margin: 0 auto;
}

.blog-post-fullscreen-tags {
  display: flex;
  gap: var(--blogflow-space-sm);
  margin-bottom: var(--blogflow-space-lg);
  flex-wrap: wrap;
}

.blog-post-fullscreen-tag {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  color: var(--blogflow-text);
  padding: var(--blogflow-space-xs) var(--blogflow-space-md);
  border-radius: 9999px;
  font-size: var(--blogflow-text-sm);
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.blog-post-fullscreen-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: var(--blogflow-space-lg);
  line-height: 1.2;
  color: var(--blogflow-text);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .blog-post-fullscreen-title {
    font-size: 2rem;
  }
}

.blog-post-fullscreen-excerpt {
  font-size: 1.25rem;
  color: var(--blogflow-text-secondary);
  margin-bottom: var(--blogflow-space-xl);
  line-height: 1.75;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-post-fullscreen-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--blogflow-space-md);
}

.blog-post-fullscreen-meta {
  display: flex;
  align-items: center;
  gap: var(--blogflow-space-lg);
}

.blog-post-fullscreen-date {
  font-size: 1.125rem;
  color: var(--blogflow-text-secondary);
}

.blog-post-fullscreen-actions {
  display: flex;
  align-items: center;
  gap: var(--blogflow-space-md);
}

.blog-post-fullscreen-counter {
  font-size: 1.125rem;
  color: var(--blogflow-text-secondary);
}

.blog-post-fullscreen-cta {
  background: var(--blogflow-text);
  color: var(--blogflow-bg);
  padding: var(--blogflow-space-sm) var(--blogflow-space-lg);
  border-radius: var(--blogflow-radius-md);
  font-weight: 500;
  transition: background-color var(--blogflow-transition-normal);
}

.blog-post-fullscreen-cta:hover {
  background: var(--blogflow-text-secondary);
}

.blog-post-fullscreen-scroll-indicator {
  position: absolute;
  bottom: var(--blogflow-space-xl);
  left: 50%;
  transform: translateX(-50%);
}

.blog-post-fullscreen-scroll-icon {
  width: 24px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.blog-post-fullscreen-scroll-icon::after {
  content: '';
  width: 4px;
  height: 12px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 9999px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

/* ========================================
   BlogPostList - Fast View
   ======================================== */

.blog-post-list-fast {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--blogflow-space-sm);
}

.blog-post-fast-item .blog-post-card {
  width: 100%;
}

.blog-post-fast-item .blog-post-card-content {
  padding: var(--blogflow-space-sm);
}

.blog-post-fast-item .blog-post-card-title {
  font-size: var(--blogflow-text-sm);
  margin-bottom: var(--blogflow-space-xs);
}

.blog-post-fast-item .blog-post-card-date {
  font-size: var(--blogflow-text-xs);
}

/* ========================================
   BlogPostList - Modern View
   ======================================== */

.blog-post-list-modern {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--blogflow-space-lg);
}

.blog-post-modern-item .blog-post-card {
  transition: all var(--blogflow-transition-normal);
  border-radius: var(--blogflow-radius-lg);
  overflow: hidden;
  box-shadow: var(--blogflow-shadow-md);
}

.blog-post-modern-item .blog-post-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--blogflow-shadow-lg);
}

.blog-post-modern-item .blog-post-card-image-img {
  transition: transform var(--blogflow-transition-slow);
}

.blog-post-modern-item .blog-post-card:hover .blog-post-card-image-img {
  transform: scale(1.05);
}

/* ========================================
   BlogPostList - Carousel View
   ======================================== */

.blog-post-list-carousel {
  position: relative;
}

.blog-post-carousel-main {
  position: relative;
  margin-bottom: var(--blogflow-space-lg);
}

.blog-post-carousel-item {
  position: relative;
  height: 24rem;
  border-radius: var(--blogflow-radius-lg);
  overflow: hidden;
  cursor: pointer;
}

.blog-post-carousel-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.blog-post-carousel-image-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}

.blog-post-carousel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}

.blog-post-carousel-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--blogflow-space-xl);
  color: var(--blogflow-text);
}

.blog-post-carousel-content-inner {
  max-width: 64rem;
}

.blog-post-carousel-tags {
  display: flex;
  gap: var(--blogflow-space-xs);
  margin-bottom: var(--blogflow-space-md);
  flex-wrap: wrap;
}

.blog-post-carousel-tag {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  color: var(--blogflow-text);
  padding: var(--blogflow-space-xs) var(--blogflow-space-sm);
  border-radius: 9999px;
  font-size: var(--blogflow-text-sm);
  font-weight: 500;
}

.blog-post-carousel-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: var(--blogflow-space-md);
  line-height: 1.2;
  color: var(--blogflow-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-post-carousel-excerpt {
  font-size: 1.125rem;
  color: var(--blogflow-text-secondary);
  margin-bottom: var(--blogflow-space-lg);
  line-height: 1.75;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-post-carousel-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--blogflow-space-md);
}

.blog-post-carousel-meta {
  display: flex;
  align-items: center;
  gap: var(--blogflow-space-md);
}

.blog-post-carousel-date {
  color: var(--blogflow-text-secondary);
}

.blog-post-carousel-cta {
  background: var(--blogflow-text);
  color: var(--blogflow-bg);
  padding: var(--blogflow-space-sm) var(--blogflow-space-lg);
  border-radius: var(--blogflow-radius-md);
  font-weight: 500;
  transition: background-color var(--blogflow-transition-normal);
  border: none;
  cursor: pointer;
}

.blog-post-carousel-cta:hover {
  background: var(--blogflow-text-secondary);
}

.blog-post-carousel-indicator {
  position: absolute;
  top: var(--blogflow-space-md);
  right: var(--blogflow-space-md);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  color: var(--blogflow-text);
  padding: var(--blogflow-space-xs) var(--blogflow-space-sm);
  border-radius: 9999px;
  font-size: var(--blogflow-text-sm);
}

.blog-post-carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  color: var(--blogflow-text);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: background-color var(--blogflow-transition-normal);
  z-index: 10;
}

.blog-post-carousel-nav:hover {
  background: rgba(255, 255, 255, 0.3);
}

.blog-post-carousel-nav-prev {
  left: var(--blogflow-space-md);
}

.blog-post-carousel-nav-next {
  right: var(--blogflow-space-md);
}

.blog-post-carousel-pagination {
  display: flex;
  justify-content: center;
  gap: var(--blogflow-space-xs);
  margin-bottom: var(--blogflow-space-lg);
}

.blog-post-carousel-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: var(--blogflow-border);
  cursor: pointer;
  transition: all var(--blogflow-transition-normal);
  padding: 0;
}

.blog-post-carousel-dot:hover {
  background: var(--blogflow-primary);
}

.blog-post-carousel-dot-active {
  background: var(--blogflow-primary);
  width: 24px;
  border-radius: 6px;
}

.blog-post-carousel-thumbs {
  display: flex;
  gap: var(--blogflow-space-xs);
  overflow-x: auto;
  padding: var(--blogflow-space-xs) 0;
  scrollbar-width: thin;
}

.blog-post-carousel-thumb {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: var(--blogflow-radius-md);
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--blogflow-transition-normal);
  padding: 0;
  background: var(--blogflow-bg);
}

.blog-post-carousel-thumb:hover {
  border-color: var(--blogflow-primary);
}

.blog-post-carousel-thumb-active {
  border-color: var(--blogflow-primary);
  box-shadow: 0 0 0 2px var(--blogflow-primary);
}

.blog-post-carousel-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  border-radius: ${cardBorderRadius};
  ${borderWidth !== '0' ? `border: ${borderWidth} solid ${cardBorderColor};` : 'border: none;'}
  cursor: pointer;
  transition: all var(--blogflow-transition-normal);
  font-family: var(--blogflow-font-sans);
  ${shadowIntensity > 0 ? `box-shadow: var(--blogflow-shadow-${
    shadowIntensity <= 2 ? 'sm' : 
    shadowIntensity <= 4 ? 'md' : 
    shadowIntensity <= 6 ? 'lg' : 
    shadowIntensity <= 8 ? 'xl' : '2xl'
  });` : `box-shadow: none;`}
}

.blog-post-list-item:hover {
  ${shadowIntensity > 0 ? `box-shadow: var(--blogflow-shadow-${
    shadowIntensity <= 2 ? 'md' : 
    shadowIntensity <= 4 ? 'lg' : 
    shadowIntensity <= 6 ? 'xl' : 
    shadowIntensity <= 8 ? '2xl' : '2xl'
  });` : `box-shadow: none;`}
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
  border-radius: ${cardBorderRadius};
  ${borderWidth !== '0' ? `border: ${borderWidth} solid ${cardBorderColor};` : 'border: none;'}
  overflow: hidden;
  cursor: pointer;
  transition: all var(--blogflow-transition-normal);
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: var(--blogflow-font-sans);
  ${shadowIntensity > 0 ? `box-shadow: var(--blogflow-shadow-${
    shadowIntensity <= 2 ? 'sm' : 
    shadowIntensity <= 4 ? 'md' : 
    shadowIntensity <= 6 ? 'lg' : 
    shadowIntensity <= 8 ? 'xl' : '2xl'
  });` : `box-shadow: none;`}
}

.blog-post-card:hover {
  ${shadowIntensity > 0 ? `box-shadow: var(--blogflow-shadow-${
    shadowIntensity <= 2 ? 'md' : 
    shadowIntensity <= 4 ? 'lg' : 
    shadowIntensity <= 6 ? 'xl' : 
    shadowIntensity <= 8 ? '2xl' : '2xl'
  });` : `box-shadow: none;`}
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
   Pagination Component
   ======================================== */

.blog-pagination {
  margin-top: var(--blogflow-space-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--blogflow-space-md);
  font-family: var(--blogflow-font-sans);
}

.blog-pagination-controls {
  display: flex;
  align-items: center;
  gap: var(--blogflow-space-xs);
  flex-wrap: wrap;
  justify-content: center;
}

.blog-pagination-pages {
  display: flex;
  align-items: center;
  gap: var(--blogflow-space-xs);
}

.blog-pagination-button {
  padding: var(--blogflow-space-xs) var(--blogflow-space-sm);
  min-width: 2.5rem;
  font-size: var(--blogflow-text-sm);
  font-family: var(--blogflow-font-sans);
  font-weight: 500;
  color: var(--blogflow-text);
  background: var(--blogflow-bg);
  border: 1px solid var(--blogflow-border);
  border-radius: var(--blogflow-radius-md);
  cursor: pointer;
  transition: all var(--blogflow-transition-normal);
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.blog-pagination-button:hover:not(:disabled) {
  background: var(--blogflow-bg-hover);
  border-color: var(--blogflow-border-hover);
  color: var(--blogflow-text);
  transform: translateY(-1px);
  box-shadow: var(--blogflow-shadow-sm);
}

.blog-pagination-button:focus {
  outline: 2px solid var(--blogflow-primary);
  outline-offset: 2px;
}

.blog-pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--blogflow-bg-hover);
  border-color: var(--blogflow-border);
}

.blog-pagination-button-active {
  background: var(--blogflow-primary);
  color: #ffffff;
  border-color: var(--blogflow-primary);
  font-weight: 600;
}

.blog-pagination-button-active:hover:not(:disabled) {
  background: var(--blogflow-border-hover);
  border-color: var(--blogflow-border-hover);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: var(--blogflow-shadow-md);
}

.blog-pagination-button-first,
.blog-pagination-button-last {
  padding: var(--blogflow-space-xs) var(--blogflow-space-md);
}

.blog-pagination-button-prev,
.blog-pagination-button-next {
  padding: var(--blogflow-space-xs) var(--blogflow-space-md);
  font-weight: 500;
}

.blog-pagination-button-text {
  margin-left: var(--blogflow-space-xs);
  margin-right: var(--blogflow-space-xs);
}

.blog-pagination-button svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: inline-block;
  vertical-align: middle;
}

/* Variant: Icon Only */
.blog-pagination-variant-icon .blog-pagination-button {
  padding: var(--blogflow-space-xs);
  min-width: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.blog-pagination-variant-icon .blog-pagination-button svg {
  width: 18px;
  height: 18px;
}

/* Variant: Mixed (Icon + Text) */
.blog-pagination-variant-mixed .blog-pagination-button {
  display: inline-flex;
  align-items: center;
  gap: var(--blogflow-space-xs);
}

.blog-pagination-variant-mixed .blog-pagination-button svg {
  width: 16px;
  height: 16px;
}

/* Variant: Text Only */
.blog-pagination-variant-text .blog-pagination-button {
  /* Default text styling */
}

/* Variant: Simple (Only page numbers) */
.blog-pagination-variant-simple {
  margin-top: var(--blogflow-space-lg);
}

.blog-pagination-variant-simple .blog-pagination-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--blogflow-space-xs);
}

.blog-pagination-variant-simple .blog-pagination-button {
  min-width: 2.5rem;
  height: 2.5rem;
  padding: var(--blogflow-space-xs) var(--blogflow-space-sm);
  font-size: var(--blogflow-text-sm);
  color: var(--blogflow-text);
  background: var(--blogflow-bg);
  border: 1px solid var(--blogflow-border);
  border-radius: var(--blogflow-radius-md);
  cursor: pointer;
  transition: all var(--blogflow-transition-normal);
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.blog-pagination-variant-simple .blog-pagination-button:hover:not(:disabled) {
  background: var(--blogflow-bg-hover);
  border-color: var(--blogflow-border-hover);
  color: var(--blogflow-text);
}

.blog-pagination-variant-simple .blog-pagination-button:focus {
  outline: 2px solid var(--blogflow-primary);
  outline-offset: 2px;
}

.blog-pagination-variant-simple .blog-pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.blog-pagination-variant-simple .blog-pagination-button-active {
  background: var(--blogflow-primary);
  color: #ffffff;
  border-color: var(--blogflow-primary);
  font-weight: 600;
}

.blog-pagination-variant-simple .blog-pagination-button-active:hover:not(:disabled) {
  background: var(--blogflow-border-hover);
  border-color: var(--blogflow-border-hover);
  color: #ffffff;
}

.blog-pagination-variant-simple .blog-pagination-ellipsis {
  padding: var(--blogflow-space-xs) var(--blogflow-space-sm);
  color: var(--blogflow-text-secondary);
  font-size: var(--blogflow-text-sm);
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
}

.blog-pagination-ellipsis {
  padding: var(--blogflow-space-xs) var(--blogflow-space-sm);
  color: var(--blogflow-text-secondary);
  font-size: var(--blogflow-text-sm);
  user-select: none;
}

.blog-pagination-info {
  display: flex;
  align-items: center;
  justify-content: center;
}

.blog-pagination-info-text {
  font-size: var(--blogflow-text-sm);
  color: var(--blogflow-text-secondary);
}

.blog-pagination-quick-jump {
  display: flex;
  align-items: center;
  gap: var(--blogflow-space-xs);
  font-size: var(--blogflow-text-sm);
}

.blog-pagination-quick-jump-label {
  color: var(--blogflow-text-secondary);
}

.blog-pagination-quick-jump-input {
  width: 4rem;
  padding: var(--blogflow-space-xs) var(--blogflow-space-sm);
  font-size: var(--blogflow-text-sm);
  font-family: var(--blogflow-font-sans);
  text-align: center;
  color: var(--blogflow-text);
  background: var(--blogflow-bg);
  border: 1px solid var(--blogflow-border);
  border-radius: var(--blogflow-radius-md);
  transition: all var(--blogflow-transition-normal);
  outline: none;
}

.blog-pagination-quick-jump-input:focus {
  border-color: var(--blogflow-border-hover);
  box-shadow: 0 0 0 3px var(--blogflow-shadow);
  outline: none;
}

.blog-pagination-quick-jump-input::placeholder {
  color: var(--blogflow-text-secondary);
  opacity: 0.6;
}

.blog-pagination-quick-jump-suffix {
  color: var(--blogflow-text-secondary);
}

/* ========================================
   Accessibility
   ======================================== */

.blog-post-list-item:focus-visible,
.blog-post-card:focus-visible,
.blog-pagination-button:focus-visible {
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
  .blog-post-card-image-img,
  .blog-pagination-button {
    transition: none;
  }

  .blog-post-list-item:hover,
  .blog-post-card:hover,
  .blog-pagination-button:hover {
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

  .blog-pagination-controls {
    gap: var(--blogflow-space-xs);
  }

  .blog-pagination-button {
    padding: var(--blogflow-space-xs);
    min-width: 2rem;
    font-size: var(--blogflow-text-xs);
  }

  .blog-pagination-button-first,
  .blog-pagination-button-last,
  .blog-pagination-button-prev,
  .blog-pagination-button-next {
    padding: var(--blogflow-space-xs) var(--blogflow-space-sm);
    font-size: var(--blogflow-text-xs);
  }

  .blog-pagination-pages {
    gap: var(--blogflow-space-xs);
  }

  .blog-pagination-info {
    font-size: var(--blogflow-text-xs);
  }

  .blog-pagination-quick-jump {
    flex-wrap: wrap;
    justify-content: center;
  }

  .blog-pagination-quick-jump-input {
    width: 3rem;
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

