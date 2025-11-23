/**
 * Pagination Component
 * Pagination controls for blog posts list
 */

import { ChangeEvent, KeyboardEvent } from 'react'
import { SupportedLanguage } from '../../core'

export type PaginationVariant = 'text' | 'icon' | 'mixed' | 'simple'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  totalCount?: number
  onPageChange: (page: number) => void
  language?: SupportedLanguage
  className?: string
  loading?: boolean
  showInfo?: boolean
  showQuickJump?: boolean
  showFirstLast?: boolean
  maxVisiblePages?: number
  variant?: PaginationVariant // 'text' | 'icon' | 'mixed'
}

// Icon components (using SVG)
const FirstIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M11 3L6 8L11 13M5 3L0 8L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const PreviousIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const NextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const LastIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 3L10 8L5 13M11 3L16 8L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Internationalization strings
const i18n = {
  en: {
    first: 'First',
    previous: 'Previous',
    next: 'Next',
    last: 'Last',
    page: 'Page',
    of: 'of',
    pages: 'pages',
    articles: 'articles',
    jumpTo: 'Jump to',
    go: 'Go',
  },
  zh: {
    first: '首页',
    previous: '上一页',
    next: '下一页',
    last: '末页',
    page: '第',
    of: '页，共',
    pages: '页',
    articles: '篇文章',
    jumpTo: '跳转到',
    go: '跳转',
  },
  es: {
    first: 'Primera',
    previous: 'Anterior',
    next: 'Siguiente',
    last: 'Última',
    page: 'Página',
    of: 'de',
    pages: 'páginas',
    articles: 'artículos',
    jumpTo: 'Ir a',
    go: 'Ir',
  },
  fr: {
    first: 'Première',
    previous: 'Précédent',
    next: 'Suivant',
    last: 'Dernière',
    page: 'Page',
    of: 'de',
    pages: 'pages',
    articles: 'articles',
    jumpTo: 'Aller à',
    go: 'Aller',
  },
  de: {
    first: 'Erste',
    previous: 'Zurück',
    next: 'Weiter',
    last: 'Letzte',
    page: 'Seite',
    of: 'von',
    pages: 'Seiten',
    articles: 'Artikel',
    jumpTo: 'Gehe zu',
    go: 'Gehen',
  },
  ja: {
    first: '最初',
    previous: '前へ',
    next: '次へ',
    last: '最後',
    page: 'ページ',
    of: '/',
    pages: 'ページ',
    articles: '記事',
    jumpTo: '移動',
    go: '移動',
  },
  ko: {
    first: '처음',
    previous: '이전',
    next: '다음',
    last: '마지막',
    page: '페이지',
    of: '/',
    pages: '페이지',
    articles: '게시물',
    jumpTo: '이동',
    go: '이동',
  },
}

/**
 * Pagination - Pagination controls component
 * 
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   totalCount={100}
 *   onPageChange={(page) => fetchPage(page)}
 *   language="en"
 * />
 * ```
 */
export function Pagination({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  language = 'en',
  className = '',
  loading = false,
  showInfo = true,
  showQuickJump = true,
  showFirstLast = true,
  maxVisiblePages = 5,
  variant = 'mixed', // Default to mixed (icons + text)
}: PaginationProps) {
  const t = i18n[language] || i18n.en

  // Generate visible page numbers
  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = []
    const half = Math.floor(maxVisiblePages / 2)

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      let start = Math.max(2, currentPage - half)
      let end = Math.min(totalPages - 1, currentPage + half)

      // Adjust if we're near the start
      if (currentPage <= half + 1) {
        end = Math.min(maxVisiblePages, totalPages - 1)
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - half) {
        start = Math.max(2, totalPages - maxVisiblePages + 1)
      }

      // Add ellipsis before middle pages if needed
      if (start > 2) {
        pages.push('ellipsis')
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis after middle pages if needed
      if (end < totalPages - 1) {
        pages.push('ellipsis')
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  const handleQuickJump = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = e.currentTarget
      const page = parseInt(input.value)
      if (page >= 1 && page <= totalPages) {
        onPageChange(page)
        input.value = ''
      }
    }
  }

  if (totalPages <= 1) {
    return null
  }

  // Simple mode: only show page numbers
  if (variant === 'simple') {
    // Generate unique keys for ellipsis by tracking their position
    let ellipsisCounter = 0
    return (
      <div className={`blog-pagination blog-pagination-variant-simple ${className}`}>
        <div className="blog-pagination-controls">
          {visiblePages.map((page, index) => {
            if (page === 'ellipsis') {
              // Use a unique counter to ensure each ellipsis has a unique key
              const ellipsisKey = `ellipsis-${ellipsisCounter++}`
              return (
                <span key={ellipsisKey} className="blog-pagination-ellipsis">
                  ...
                </span>
              )
            }

            return (
              <button
                key={`page-${page}`}
                type="button"
                onClick={() => onPageChange(page)}
                disabled={loading}
                className={`blog-pagination-button blog-pagination-button-page ${
                  currentPage === page ? 'blog-pagination-button-active' : ''
                }`}
                aria-label={`${t.page} ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Determine button content based on variant
  const renderButtonContent = (type: 'first' | 'prev' | 'next' | 'last', text: string) => {
    if (variant === 'icon') {
      switch (type) {
        case 'first':
          return <FirstIcon />
        case 'prev':
          return <PreviousIcon />
        case 'next':
          return <NextIcon />
        case 'last':
          return <LastIcon />
      }
    } else if (variant === 'text') {
      return text
    } else {
      // mixed: icon + text
      switch (type) {
        case 'first':
          return (
            <>
              <FirstIcon />
              <span className="blog-pagination-button-text">{text}</span>
            </>
          )
        case 'prev':
          return (
            <>
              <PreviousIcon />
              <span className="blog-pagination-button-text">{text}</span>
            </>
          )
        case 'next':
          return (
            <>
              <span className="blog-pagination-button-text">{text}</span>
              <NextIcon />
            </>
          )
        case 'last':
          return (
            <>
              <LastIcon />
              <span className="blog-pagination-button-text">{text}</span>
            </>
          )
      }
    }
  }

  return (
    <div className={`blog-pagination blog-pagination-variant-${variant} ${className}`}>
      {/* Pagination Buttons */}
      <div className="blog-pagination-controls">
        {showFirstLast && (
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1 || loading}
            className="blog-pagination-button blog-pagination-button-first"
            aria-label={t.first}
          >
            {renderButtonContent('first', t.first)}
          </button>
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="blog-pagination-button blog-pagination-button-prev"
          aria-label={t.previous}
        >
          {renderButtonContent('prev', t.previous)}
        </button>

        {/* Page Numbers */}
        <div className="blog-pagination-pages">
          {(() => {
            // Generate unique keys for ellipsis by tracking their position
            let ellipsisCounter = 0
            return visiblePages.map((page, index) => {
              if (page === 'ellipsis') {
                // Use a unique counter to ensure each ellipsis has a unique key
                const ellipsisKey = `ellipsis-${ellipsisCounter++}`
                return (
                  <span key={ellipsisKey} className="blog-pagination-ellipsis">
                    ...
                  </span>
                )
              }

              return (
                <button
                  key={`page-${page}`}
                  type="button"
                  onClick={() => onPageChange(page)}
                  disabled={loading}
                  className={`blog-pagination-button blog-pagination-button-page ${
                    currentPage === page ? 'blog-pagination-button-active' : ''
                  }`}
                  aria-label={`${t.page} ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            })
          })()}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="blog-pagination-button blog-pagination-button-next"
          aria-label={t.next}
        >
          {renderButtonContent('next', t.next)}
        </button>

        {showFirstLast && (
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || loading}
            className="blog-pagination-button blog-pagination-button-last"
            aria-label={t.last}
          >
            {renderButtonContent('last', t.last)}
          </button>
        )}
      </div>

      {/* Pagination Info */}
      {showInfo && (
        <div className="blog-pagination-info">
          <span className="blog-pagination-info-text">
            {language === 'zh' 
              ? `${t.page} ${currentPage}${t.of} ${totalPages} ${t.pages}${totalCount ? ` · 共 ${totalCount} ${t.articles}` : ''}`
              : `${t.page} ${currentPage} ${t.of} ${totalPages} ${t.pages}${totalCount ? ` · ${totalCount} ${t.articles}` : ''}`
            }
          </span>
        </div>
      )}

      {/* Quick Jump */}
      {showQuickJump && (
        <div className="blog-pagination-quick-jump">
          <span className="blog-pagination-quick-jump-label">{t.jumpTo}</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            placeholder={String(currentPage)}
            onKeyDown={handleQuickJump}
            className="blog-pagination-quick-jump-input"
            aria-label={`${t.jumpTo} ${t.page}`}
          />
          <span className="blog-pagination-quick-jump-suffix">
            {language === 'zh' ? t.pages : t.page}
          </span>
        </div>
      )}
    </div>
  )
}

