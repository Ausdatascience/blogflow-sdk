/**
 * BlogPostMagazine Component
 * Magazine-style layout for blog posts with alternating large and small cards
 */

import { V2PostListItem, SupportedLanguage } from '../../core'
import { BlogPostCard, BlogPostCardProps } from './BlogPostCard'

export interface BlogPostMagazineProps {
  posts: V2PostListItem[]
  language?: SupportedLanguage
  onPostClick?: (slug: string) => void
  className?: string
  itemClassName?: string
  cardProps?: Omit<BlogPostCardProps, 'post' | 'language' | 'onPostClick' | 'className'>
}

/**
 * BlogPostMagazine - Magazine-style layout component
 * Displays posts in a grid with alternating large and small cards
 * 
 * @example
 * ```tsx
 * <BlogPostMagazine
 *   posts={posts}
 *   language="zh"
 *   onPostClick={(slug) => navigate(`/post/${slug}`)}
 * />
 * ```
 */
export function BlogPostMagazine({
  posts,
  language = 'en',
  onPostClick,
  className = '',
  itemClassName = '',
  cardProps = {},
}: BlogPostMagazineProps) {
  return (
    <div className={`blog-post-list blog-post-list-magazine ${className}`}>
      {posts.map((post, index) => {
        // First post and every 5th post displays as large card
        const isLarge = index === 0 || index % 5 === 0

        return (
          <div
            key={post.id}
            className={`blog-post-magazine-item ${isLarge ? 'blog-post-magazine-item-large' : 'blog-post-magazine-item-small'} ${itemClassName}`}
          >
            <BlogPostCard
              post={post}
              language={language}
              onPostClick={onPostClick}
              {...cardProps}
            />
          </div>
        )
      })}
    </div>
  )
}

