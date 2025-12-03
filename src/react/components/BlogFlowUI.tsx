/**
 * BlogFlowUI Component
 * Complete, ready-to-use blog interface with all features built-in
 */

'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { BlogFlowProvider } from '../context/BlogFlowContext'
import { useBlogPosts } from '../hooks/useBlogPosts'
import { useBlogSearch } from '../hooks/useBlogSearch'
import { BlogSearch } from './BlogSearch'
import { BlogPostList } from './BlogPostList'
import { BlogPostWaterfall } from './BlogPostWaterfall'
import { BlogPostMagazine } from './BlogPostMagazine'
import { BlogPostDense } from './BlogPostDense'
import { BlogPostTimeline } from './BlogPostTimeline'
import { BlogPostFullscreen } from './BlogPostFullscreen'
import { BlogPostFast } from './BlogPostFast'
import { BlogPostModern } from './BlogPostModern'
import { BlogPostCarousel } from './BlogPostCarousel'
import { Pagination } from './Pagination'
import type { SupportedLanguage, BlogFlowConfig } from '../../core'
import type { PaginationVariant } from './Pagination'

const THEMES = [
  'default',
  'blue',
  'minimal',
  'modern',
  'dark',
  'magic',
  'fantasy',
  'adventure',
  'tomorrow',
  'mainstreet',
  'eyecare',
  'purewhite',
  'pureblack',
  'cyanblue',
  'violet',
  'cardinal',
] as const

const VIEW_MODES = [
  { value: 'card', label: 'Card' },
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'masonry', label: 'Masonry' },
  { value: 'waterfall', label: 'Waterfall' },
  { value: 'magazine', label: 'Magazine' },
  { value: 'dense', label: 'Dense' },
  { value: 'timeline', label: 'Timeline' },
  { value: 'fullscreen', label: 'Fullscreen' },
  { value: 'fast', label: 'Fast' },
  { value: 'modern', label: 'Modern' },
  { value: 'carousel', label: 'Carousel' },
] as const

const PAGINATION_VARIANTS: { value: PaginationVariant; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'icon', label: 'Icon' },
  { value: 'mixed', label: 'Mixed' },
  { value: 'simple', label: 'Simple' },
]

const SEARCH_MODES = [
  { value: 'server', label: 'Server Search' },
  { value: 'client', label: 'Client Search' },
] as const

type ViewMode = (typeof VIEW_MODES)[number]['value']
type SearchMode = 'server' | 'client'
type PaginationPosition = 'top' | 'bottom' | 'both'

export interface BlogFlowUIConfig {
  /** Required: Your BlogFlow API key */
  apiKey: string
  /** Base URL for the API (optional) */
  baseUrl?: string
  /** Default language for content (default: 'en') */
  defaultLanguage?: SupportedLanguage
  /** Default theme (default: 'default') */
  defaultTheme?: string
  /** Default view mode (default: 'card') */
  defaultViewMode?: ViewMode
  /** Default search mode: 'server' or 'client' (default: 'server') */
  defaultSearchMode?: SearchMode
  /** Default pagination variant (default: 'mixed') */
  defaultPaginationVariant?: PaginationVariant
  /** Where to show pagination controls: 'bottom', 'top', or 'both' (default: 'bottom') */
  paginationPosition?: PaginationPosition
  /** Number of posts per page (default: 12) */
  pageSize?: number
  /** Show control panel for theme/view/search mode selection (default: true) */
  showControlPanel?: boolean
  /** Show card display options (excerpt, category, date) (default: true) */
  showCardOptions?: boolean
  /** Show the language toggle in the search bar (default: true) */
  showLanguageToggle?: boolean
  /** Show the search bar (default: true) */
  showSearchBar?: boolean
  /** Page title (default: 'Blog') */
  title?: string
  /** Callback when a post is clicked */
  onPostClick?: (slug: string) => void
  /** Custom CSS class name for the container */
  className?: string
  /** Custom styles for the container */
  style?: React.CSSProperties
}

interface BlogFlowContentProps extends Omit<BlogFlowUIConfig, 'apiKey' | 'baseUrl'> {}

function BlogFlowContent({
  defaultTheme = 'default',
  defaultViewMode = 'card',
  defaultSearchMode = 'server',
  defaultPaginationVariant = 'mixed',
  paginationPosition = 'bottom',
  pageSize = 12,
  showControlPanel = true,
  showCardOptions = true,
  showLanguageToggle = true,
  showSearchBar = true,
  title = 'Blog',
  onPostClick,
  defaultLanguage = 'en',
  className,
  style,
}: BlogFlowContentProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [language, setLanguage] = useState<SupportedLanguage>(defaultLanguage)
  const [currentTheme, setCurrentTheme] = useState(defaultTheme)
  const [viewMode, setViewMode] = useState<ViewMode>(defaultViewMode)
  const [searchMode, setSearchMode] = useState<SearchMode>(defaultSearchMode)
  const [paginationVariant, setPaginationVariant] =
    useState<PaginationVariant>(defaultPaginationVariant)
  const [showExcerpt, setShowExcerpt] = useState(true)
  const [showCategory, setShowCategory] = useState(true)
  const [showDate, setShowDate] = useState(true)

  // Fetch posts
  const {
    posts,
    loading: postsLoading,
    currentPage,
    totalPages,
    totalCount,
    fetchPage: originalFetchPage,
    refresh: originalRefresh,
  } = useBlogPosts({
    lang: language,
    pageSize,
  })

  // Wrap functions to ensure stable references
  const fetchPage = useCallback((page: number) => {
    originalFetchPage(page)
  }, [originalFetchPage])

  const refresh = useCallback(() => {
    originalRefresh()
  }, [originalRefresh])

  // Search functionality
  const {
    results,
    loading: searchLoading,
    resultCount,
    totalCount: searchTotalCount,
    page: searchPage,
    totalPages: searchTotalPages,
    setPage: originalSetSearchPage,
  } = useBlogSearch(
    {
      searchTerm,
      searchFields: ['title', 'excerpt', 'category'],
      mode: searchMode,
      debounceMs: 300,
      lang: language,
      limit: pageSize,
    },
    searchMode === 'client' ? posts : undefined
  )

  // Wrap setPage to ensure stable reference
  const setSearchPage = useCallback((page: number) => {
    originalSetSearchPage(page)
  }, [originalSetSearchPage])

  const displayPosts = searchTerm ? results : posts
  const loading = postsLoading || searchLoading
  const displayTotalCount = searchTerm ? searchTotalCount : totalCount
  const displayCurrentPage = searchTerm ? searchPage : currentPage
  const displayTotalPages = searchTerm ? searchTotalPages : totalPages

  // Dynamic theme injection
  useEffect(() => {
    const existingLink = document.getElementById('blogflow-theme')
    
    // Only update if theme changed
    if (existingLink) {
      const currentHref = existingLink.getAttribute('href')
      const newHref = `https://cdn.jsdelivr.net/npm/@blogflow/sdk@1.0.0/dist/styles/${currentTheme}.css`
      
      if (currentHref === newHref) {
        return // Theme hasn't changed, do nothing
      }
      
      existingLink.setAttribute('href', newHref)
    } else {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = `https://cdn.jsdelivr.net/npm/@blogflow/sdk@1.0.0/dist/styles/${currentTheme}.css`
      link.id = 'blogflow-theme'
      document.head.appendChild(link)
    }
  }, [currentTheme])

  // Memoize click handler
  const handlePostClick = useCallback(
    (slug: string) => {
      if (onPostClick) {
        onPostClick(slug)
      } else {
        console.log('Post clicked:', slug)
      }
    },
    [onPostClick]
  )

  // Memoize card props
  const cardProps = useMemo(
    () => ({
      showExcerpt,
      showCategory,
      showDate,
    }),
    [showExcerpt, showCategory, showDate]
  )

  // Memoize common props
  const commonProps = useMemo(
    () => ({
      posts: displayPosts,
      language,
      onPostClick: handlePostClick,
      cardProps,
    }),
    [displayPosts, language, handlePostClick, cardProps]
  )

  // Render different view components
  const renderPostsView = () => {
    switch (viewMode) {
      case 'waterfall':
        return <BlogPostWaterfall {...commonProps} />
      case 'magazine':
        return <BlogPostMagazine {...commonProps} />
      case 'dense':
        return <BlogPostDense {...commonProps} />
      case 'timeline':
        return <BlogPostTimeline {...commonProps} />
      case 'fullscreen':
        return <BlogPostFullscreen {...commonProps} />
      case 'fast':
        return <BlogPostFast {...commonProps} />
      case 'modern':
        return <BlogPostModern {...commonProps} />
      case 'carousel':
        return (
          <BlogPostCarousel {...commonProps} autoPlay={true} autoPlayInterval={5000} />
        )
      default:
        return <BlogPostList {...commonProps} viewMode={viewMode} />
    }
  }

  return (
    <div
      className={className}
      style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', ...style }}
    >
      {title && (
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>{title}</h1>
      )}

      {/* Control Panel */}
      {showControlPanel && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          {/* Theme Selector */}
          <div>
            <label
              htmlFor="blogflow-theme-select"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
              }}
            >
              🎨 Theme
            </label>
            <select
              id="blogflow-theme-select"
              value={currentTheme}
              onChange={(e) => setCurrentTheme(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1rem',
              }}
            >
              {THEMES.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Selector */}
          <div>
            <label
              htmlFor="blogflow-view-mode-select"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
              }}
            >
              📐 View Mode
            </label>
            <select
              id="blogflow-view-mode-select"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as ViewMode)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1rem',
              }}
            >
              {VIEW_MODES.map((mode) => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Mode Selector */}
          <div>
            <label
              htmlFor="blogflow-search-mode-select"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
              }}
            >
              🔍 Search Mode
            </label>
            <select
              id="blogflow-search-mode-select"
              value={searchMode}
              onChange={(e) => setSearchMode(e.target.value as SearchMode)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1rem',
              }}
            >
              {SEARCH_MODES.map((mode) => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
          </div>

          {/* Pagination Variant Selector */}
          <div>
            <label
              htmlFor="blogflow-pagination-variant-select"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
              }}
            >
              📄 Pagination Style
            </label>
            <select
              id="blogflow-pagination-variant-select"
              value={paginationVariant}
              onChange={(e) => setPaginationVariant(e.target.value as PaginationVariant)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1rem',
              }}
            >
              {PAGINATION_VARIANTS.map((variant) => (
                <option key={variant.value} value={variant.value}>
                  {variant.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Card Display Options */}
      {showCardOptions && (
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            flexWrap: 'wrap',
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={showExcerpt}
              onChange={(e) => setShowExcerpt(e.target.checked)}
            />
            Show Excerpt
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={showCategory}
              onChange={(e) => setShowCategory(e.target.checked)}
            />
            Show Category
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={showDate}
              onChange={(e) => setShowDate(e.target.checked)}
            />
            Show Date
          </label>
        </div>
      )}

      {/* Search Bar */}
      {showSearchBar && (
        <BlogSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          language={language}
          showLanguageToggle={showLanguageToggle}
          onLanguageChange={setLanguage}
          showRefreshButton={true}
          onRefresh={refresh}
          loading={loading}
          resultCount={resultCount}
          totalCount={displayTotalCount}
          showTitle={true}
          showCount={true}
        />
      )}

      {/* Top Pagination (optional) */}
      {(paginationPosition === 'top' || paginationPosition === 'both') && (
        <div style={{ marginBottom: '1.5rem' }}>
          <Pagination
            currentPage={displayCurrentPage}
            totalPages={displayTotalPages}
            totalCount={displayTotalCount}
            onPageChange={searchTerm ? setSearchPage : fetchPage}
            language={language}
            loading={loading}
            showInfo={true}
            showQuickJump={true}
            showFirstLast={true}
            variant={paginationVariant}
          />
        </div>
      )}

      {/* Posts View */}
      {renderPostsView()}

      {/* Bottom Pagination (optional) */}
      {(paginationPosition === 'bottom' || paginationPosition === 'both') && (
        <Pagination
          currentPage={displayCurrentPage}
          totalPages={displayTotalPages}
          totalCount={displayTotalCount}
          onPageChange={searchTerm ? setSearchPage : fetchPage}
          language={language}
          loading={loading}
          showInfo={true}
          showQuickJump={true}
          showFirstLast={true}
          variant={paginationVariant}
        />
      )}
    </div>
  )
}

/**
 * BlogFlowUI - Complete, ready-to-use blog interface component
 *
 * @example
 * Basic usage:
 * ```tsx
 * <BlogFlowUI apiKey="your-api-key" />
 * ```
 *
 * @example
 * Custom configuration:
 * ```tsx
 * <BlogFlowUI
 *   apiKey="your-api-key"
 *   defaultLanguage="en"
 *   defaultTheme="dark"
 *   defaultViewMode="magazine"
 *   pageSize={20}
 *   title="My Blog"
 *   onPostClick={(slug) => router.push(`/post/${slug}`)}
 * />
 * ```
 *
 * @example
 * Minimal version (hide control panels):
 * ```tsx
 * <BlogFlowUI
 *   apiKey="your-api-key"
 *   showControlPanel={false}
 *   showCardOptions={false}
 *   defaultTheme="minimal"
 * />
 * ```
 */
export function BlogFlowUI(config: BlogFlowUIConfig) {
  const { apiKey, baseUrl, defaultLanguage = 'en', ...restConfig } = config

  const providerConfig: BlogFlowConfig = {
    apiKey,
    ...(baseUrl && { baseUrl }),
    defaultLanguage,
  }

  return (
    <BlogFlowProvider
      config={{
        ...providerConfig,
        styles: {
          theme: 'none', // Use dynamic loading
          autoInject: false,
        },
      }}
    >
      <BlogFlowContent defaultLanguage={defaultLanguage} {...restConfig} />
    </BlogFlowProvider>
  )
}
