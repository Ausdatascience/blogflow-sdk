/**
 * BlogSearch Component
 * Search input component for filtering blog posts
 */

import { ChangeEvent, ReactNode } from 'react'
import { SupportedLanguage } from '../../core'

export interface BlogSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  language?: SupportedLanguage
  placeholder?: string
  className?: string
  showLanguageToggle?: boolean
  onLanguageChange?: (lang: SupportedLanguage) => void
  showRefreshButton?: boolean
  onRefresh?: () => void
  loading?: boolean
  resultCount?: number
  totalCount?: number
  customActions?: ReactNode
  showTitle?: boolean
  showCount?: boolean
}

/**
 * BlogSearch - Search input component with optional language toggle and refresh
 * 
 * @example
 * ```tsx
 * <BlogSearch
 *   searchTerm={searchTerm}
 *   onSearchChange={setSearchTerm}
 *   language="zh"
 *   resultCount={filteredPosts.length}
 *   totalCount={posts.length}
 * />
 * ```
 */
export function BlogSearch({
  searchTerm,
  onSearchChange,
  language = 'en',
  placeholder,
  className = '',
  showLanguageToggle = false,
  onLanguageChange,
  showRefreshButton = false,
  onRefresh,
  loading = false,
  resultCount,
  totalCount,
  customActions,
  showTitle = true,
  showCount = true,
}: BlogSearchProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value)
  }

  const defaultPlaceholder = language === 'zh'
    ? 'Search by title, excerpt, or category'
    : 'Search by title, excerpt, or category'

  const showingText = resultCount !== undefined && totalCount !== undefined
    ? language === 'zh'
      ? `显示 ${resultCount} / ${totalCount}`
      : `Showing ${resultCount} / ${totalCount}`
    : null

  return (
    <div className={`blog-search ${className}`}>
      {(showTitle || showCount) && (
        <div className="blog-search-header">
          {showTitle && (
            <h1 className="blog-search-title">
              {language === 'zh' ? '文章' : 'Posts'}
            </h1>
          )}
          {showCount && showingText && (
            <p className="blog-search-count">{showingText}</p>
          )}
        </div>
      )}

      <div className="blog-search-controls">
        <div className="blog-search-input-wrapper">
          <input
            type="search"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder || defaultPlaceholder}
            className="blog-search-input"
          />
        </div>

        <div className="blog-search-actions">
          {showLanguageToggle && onLanguageChange && (
            <div className="blog-search-language-toggle">
              <button
                type="button"
                onClick={() => onLanguageChange('zh')}
                className={language === 'zh' ? 'active' : ''}
              >
                Chinese
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={language === 'en' ? 'active' : ''}
              >
                English
              </button>
            </div>
          )}

          {showRefreshButton && onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              className="blog-search-refresh"
            >
              {loading
                ? 'Refreshing...'
                : 'Refresh'}
            </button>
          )}

          {customActions}
        </div>
      </div>
    </div>
  )
}

