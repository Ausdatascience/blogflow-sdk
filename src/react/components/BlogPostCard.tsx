/**
 * BlogPostCard Component
 * Displays a blog post in card format
 */

import { V2PostListItem, SupportedLanguage } from '../../core'

export interface BlogPostCardProps {
  post: V2PostListItem
  language?: SupportedLanguage
  onPostClick?: (slug: string) => void
  className?: string
  showExcerpt?: boolean
  showCategory?: boolean
  showDate?: boolean
  dateFormat?: (dateString: string, lang?: SupportedLanguage) => string
}

/**
 * Default date formatter
 * Uses UTC date methods to avoid timezone conversion issues
 */
function formatDate(dateString: string, lang?: SupportedLanguage): string {
  try {
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return ''
    
    // Use UTC methods to avoid timezone conversion
    // This ensures the date displayed matches the date in the database
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth()
    const day = date.getUTCDate()
    
    // Create a date object in local timezone with the same date values
    // This prevents timezone conversion from shifting the date
    const localDate = new Date(year, month, day)
    
    return localDate.toLocaleDateString(
      lang === 'zh' ? 'zh-CN' : 'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    )
  } catch {
    return ''
  }
}

/**
 * BlogPostCard - Card component for displaying blog posts
 * 
 * @example
 * ```tsx
 * <BlogPostCard
 *   post={post}
 *   language="zh"
 *   onPostClick={(slug) => navigate(`/post/${slug}`)}
 * />
 * ```
 */
export function BlogPostCard({
  post,
  language = 'en',
  onPostClick,
  className = '',
  showExcerpt = true,
  showCategory = true,
  showDate = true,
  dateFormat = formatDate,
}: BlogPostCardProps) {
  const handleClick = () => {
    if (onPostClick && post.slug) {
      onPostClick(post.slug)
    }
  }

  const displayDate = showDate && (post.published_at || post.created_at)
    ? dateFormat(post.published_at || post.created_at, language)
    : null

  return (
    <article
      className={`blog-post-card ${className}`.trim()}
      onClick={handleClick}
      role={onPostClick ? 'button' : undefined}
      tabIndex={onPostClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onPostClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      {post.featured_image_url && (
        <div className="blog-post-card-image">
          <img
            src={post.featured_image_url}
            alt={post.title}
            loading="lazy"
            className="blog-post-card-image-img"
          />
        </div>
      )}

      <div className="blog-post-card-content">
        <h2 className="blog-post-card-title">{post.title}</h2>

        {showExcerpt && post.excerpt && (
          <p className="blog-post-card-excerpt">{post.excerpt}</p>
        )}

        <div className="blog-post-card-meta">
          {showCategory && post.category && (
            <span className="blog-post-card-category">{post.category}</span>
          )}
          {displayDate && (
            <time className="blog-post-card-date">{displayDate}</time>
          )}
        </div>
      </div>
    </article>
  )
}

