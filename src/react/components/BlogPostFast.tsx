/**
 * BlogPostFast Component
 * Fast loading minimal layout for blog posts
 */

import { V2PostListItem, SupportedLanguage } from '../../core'
import { BlogPostCard, BlogPostCardProps } from './BlogPostCard'

export interface BlogPostFastProps {
  posts: V2PostListItem[]
  language?: SupportedLanguage
  onPostClick?: (slug: string) => void
  className?: string
  itemClassName?: string
  cardProps?: Omit<BlogPostCardProps, 'post' | 'language' | 'onPostClick' | 'className'>
}

/**
 * BlogPostFast - Fast loading minimal layout component
 * Displays posts in a minimal format for quick loading
 * 
 * @example
 * ```tsx
 * <BlogPostFast
 *   posts={posts}
 *   language="zh"
 *   onPostClick={(slug) => navigate(`/post/${slug}`)}
 * />
 * ```
 */
export function BlogPostFast({
  posts,
  language = 'en',
  onPostClick,
  className = '',
  itemClassName = '',
  cardProps = {},
}: BlogPostFastProps) {
  return (
    <div className={`blog-post-list blog-post-list-fast ${className}`}>
      {posts.map((post) => (
        <div
          key={post.id}
          className={`blog-post-fast-item ${itemClassName}`}
        >
          <BlogPostCard
            post={post}
            language={language}
            onPostClick={onPostClick}
            showExcerpt={false}
            showCategory={false}
            {...cardProps}
          />
        </div>
      ))}
    </div>
  )
}

