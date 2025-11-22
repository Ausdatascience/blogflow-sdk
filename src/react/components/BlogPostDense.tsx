/**
 * BlogPostDense Component
 * Dense grid layout for blog posts with many columns
 */

import { V2PostListItem, SupportedLanguage } from '../../core'
import { BlogPostCard, BlogPostCardProps } from './BlogPostCard'

export interface BlogPostDenseProps {
  posts: V2PostListItem[]
  language?: SupportedLanguage
  onPostClick?: (slug: string) => void
  className?: string
  itemClassName?: string
  cardProps?: Omit<BlogPostCardProps, 'post' | 'language' | 'onPostClick' | 'className'>
}

/**
 * BlogPostDense - Dense grid layout component
 * Displays posts in a dense grid with many columns
 * 
 * @example
 * ```tsx
 * <BlogPostDense
 *   posts={posts}
 *   language="zh"
 *   onPostClick={(slug) => navigate(`/post/${slug}`)}
 * />
 * ```
 */
export function BlogPostDense({
  posts,
  language = 'en',
  onPostClick,
  className = '',
  itemClassName = '',
  cardProps = {},
}: BlogPostDenseProps) {
  return (
    <div className={`blog-post-list blog-post-list-dense ${className}`}>
      {posts.map((post) => (
        <div
          key={post.id}
          className={`blog-post-dense-item ${itemClassName}`}
        >
          <BlogPostCard
            post={post}
            language={language}
            onPostClick={onPostClick}
            {...cardProps}
          />
        </div>
      ))}
    </div>
  )
}

