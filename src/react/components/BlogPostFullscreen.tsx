/**
 * BlogPostFullscreen Component
 * Fullscreen layout for blog posts with immersive reading experience
 */

import { useState } from 'react'
import { V2PostListItem, SupportedLanguage } from '../../core'

export interface BlogPostFullscreenProps {
  posts: V2PostListItem[]
  language?: SupportedLanguage
  onPostClick?: (slug: string) => void
  className?: string
  itemClassName?: string
}

/**
 * BlogPostFullscreen - Fullscreen layout component
 * Displays posts in fullscreen format with background images
 * 
 * @example
 * ```tsx
 * <BlogPostFullscreen
 *   posts={posts}
 *   language="zh"
 *   onPostClick={(slug) => navigate(`/post/${slug}`)}
 * />
 * ```
 */
export function BlogPostFullscreen({
  posts,
  language = 'en',
  onPostClick,
  className = '',
  itemClassName = '',
}: BlogPostFullscreenProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleClick = (slug: string) => {
    onPostClick?.(slug)
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (Number.isNaN(date.getTime())) return ''
      return date.toLocaleDateString(
        language === 'zh' ? 'zh-CN' : 'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
      )
    } catch {
      return ''
    }
  }

  return (
    <div className={`blog-post-list blog-post-list-fullscreen ${className}`}>
      {posts.map((post, index) => (
        <article
          key={post.id}
          className={`blog-post-fullscreen-item ${itemClassName}`}
          onClick={() => handleClick(post.slug)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          role={onPostClick ? 'button' : undefined}
          tabIndex={onPostClick ? 0 : undefined}
          onKeyDown={(e) => {
            if (onPostClick && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              handleClick(post.slug)
            }
          }}
        >
          {/* Background image */}
          {post.featured_image_url && (
            <div className="blog-post-fullscreen-image">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className={`blog-post-fullscreen-image-img ${
                  hoveredIndex === index ? 'blog-post-fullscreen-image-zoom' : ''
                }`}
                loading={index < 3 ? 'eager' : 'lazy'}
              />
            </div>
          )}

          {/* Gradient overlay */}
          <div className="blog-post-fullscreen-overlay"></div>

          {/* Content */}
          <div className="blog-post-fullscreen-content">
            <div className="blog-post-fullscreen-content-inner">
              {/* Tags */}
              {post.category && (
                <div className="blog-post-fullscreen-tags">
                  <span className="blog-post-fullscreen-tag">{post.category}</span>
                </div>
              )}

              {/* Title */}
              <h2 className="blog-post-fullscreen-title">{post.title}</h2>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="blog-post-fullscreen-excerpt">{post.excerpt}</p>
              )}

              {/* Bottom info */}
              <div className="blog-post-fullscreen-footer">
                <div className="blog-post-fullscreen-meta">
                  {(post.published_at || post.created_at) && (
                    <span className="blog-post-fullscreen-date">
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                  )}
                </div>

                <div className="blog-post-fullscreen-actions">
                  <span className="blog-post-fullscreen-counter">
                    {index + 1} / {posts.length}
                  </span>
                  <span className="blog-post-fullscreen-cta">
                    {language === 'zh' ? '阅读全文' : 'Read More'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          {index === 0 && (
            <div className="blog-post-fullscreen-scroll-indicator">
              <div className="blog-post-fullscreen-scroll-icon"></div>
            </div>
          )}
        </article>
      ))}
    </div>
  )
}

