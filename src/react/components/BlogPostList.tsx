/**
 * BlogPostList Component
 * Displays a list of blog posts
 */

import { V2PostListItem, SupportedLanguage } from '../../core'
import { BlogPostCard, BlogPostCardProps } from './BlogPostCard'

export interface BlogPostListProps {
  posts: V2PostListItem[]
  language?: SupportedLanguage
  onPostClick?: (slug: string) => void
  className?: string
  itemClassName?: string
  viewMode?: 'card' | 'list' | 'grid' | 'masonry'
  cardProps?: Omit<BlogPostCardProps, 'post' | 'language' | 'onPostClick' | 'className'>
  emptyMessage?: string
}

/**
 * BlogPostList - List component for displaying multiple blog posts
 * 
 * @example
 * ```tsx
 * <BlogPostList
 *   posts={posts}
 *   language="zh"
 *   viewMode="card"
 *   onPostClick={(slug) => navigate(`/post/${slug}`)}
 * />
 * ```
 */
export function BlogPostList({
  posts,
  language = 'en',
  onPostClick,
  className = '',
  itemClassName = '',
  viewMode = 'card',
  cardProps = {},
  emptyMessage,
}: BlogPostListProps) {
  if (posts.length === 0) {
    return (
      <div className={`blog-post-list-empty ${className}`}>
        {emptyMessage || 'No posts available'}
      </div>
    )
  }

  const containerClass = `blog-post-list blog-post-list-${viewMode} ${className}`

  if (viewMode === 'list') {
    return (
      <div className={containerClass}>
        {posts.map((post) => (
          <article
            key={post.id}
            className={`blog-post-list-item ${itemClassName}`}
            onClick={() => onPostClick?.(post.slug)}
            role={onPostClick ? 'button' : undefined}
            tabIndex={onPostClick ? 0 : undefined}
            onKeyDown={(e) => {
              if (onPostClick && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                onPostClick(post.slug)
              }
            }}
          >
            {post.featured_image_url && (
              <div className="blog-post-list-item-image">
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  loading="lazy"
                />
              </div>
            )}
            <div className="blog-post-list-item-content">
              <h3 className="blog-post-list-item-title">{post.title}</h3>
              {post.excerpt && (
                <p className="blog-post-list-item-excerpt">{post.excerpt}</p>
              )}
              <div className="blog-post-list-item-meta">
                {post.category && (
                  <span className="blog-post-list-item-category">{post.category}</span>
                )}
                {post.created_at && (
                  <time className="blog-post-list-item-date">
                    {new Date(post.created_at).toLocaleDateString(
                      language === 'zh' ? 'zh-CN' : 'en-US'
                    )}
                  </time>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    )
  }

  return (
    <div className={containerClass}>
      {posts.map((post) => (
        <BlogPostCard
          key={post.id}
          post={post}
          language={language}
          onPostClick={onPostClick}
          className={itemClassName}
          {...cardProps}
        />
      ))}
    </div>
  )
}

