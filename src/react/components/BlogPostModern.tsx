/**
 * BlogPostModern Component
 * Modern card layout for blog posts with advanced animations
 */

import { useState } from 'react'
import { V2PostListItem, SupportedLanguage } from '../../core'
import { BlogPostCard, BlogPostCardProps } from './BlogPostCard'

export interface BlogPostModernProps {
  posts: V2PostListItem[]
  language?: SupportedLanguage
  onPostClick?: (slug: string) => void
  className?: string
  itemClassName?: string
  cardProps?: Omit<BlogPostCardProps, 'post' | 'language' | 'onPostClick' | 'className'>
}

/**
 * BlogPostModern - Modern card layout component
 * Displays posts with modern design and animations
 * 
 * @example
 * ```tsx
 * <BlogPostModern
 *   posts={posts}
 *   language="zh"
 *   onPostClick={(slug) => navigate(`/post/${slug}`)}
 * />
 * ```
 */
export function BlogPostModern({
  posts,
  language = 'en',
  onPostClick,
  className = '',
  itemClassName = '',
  cardProps = {},
}: BlogPostModernProps) {
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({})

  return (
    <div className={`blog-post-list blog-post-list-modern ${className}`}>
      {posts.map((post) => (
        <div
          key={post.id}
          className={`blog-post-modern-item ${itemClassName}`}
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

