/**
 * BlogPostTimeline Component
 * Timeline layout for blog posts with vertical timeline line
 */

import { V2PostListItem, SupportedLanguage } from '../../core'
import { BlogPostCard, BlogPostCardProps } from './BlogPostCard'

export interface BlogPostTimelineProps {
  posts: V2PostListItem[]
  language?: SupportedLanguage
  onPostClick?: (slug: string) => void
  className?: string
  itemClassName?: string
  cardProps?: Omit<BlogPostCardProps, 'post' | 'language' | 'onPostClick' | 'className'>
}

/**
 * BlogPostTimeline - Timeline layout component
 * Displays posts in a vertical timeline format
 * 
 * @example
 * ```tsx
 * <BlogPostTimeline
 *   posts={posts}
 *   language="zh"
 *   onPostClick={(slug) => navigate(`/post/${slug}`)}
 * />
 * ```
 */
export function BlogPostTimeline({
  posts,
  language = 'en',
  onPostClick,
  className = '',
  itemClassName = '',
  cardProps = {},
}: BlogPostTimelineProps) {
  return (
    <div className={`blog-post-list blog-post-list-timeline ${className}`}>
      {/* Timeline line */}
      <div className="blog-post-timeline-line"></div>
      
      <div className="blog-post-timeline-content">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`blog-post-timeline-item ${itemClassName}`}
          >
            {/* Timeline dot */}
            <div className="blog-post-timeline-dot"></div>
            
            {/* Card content */}
            <div className="blog-post-timeline-card">
              <BlogPostCard
                post={post}
                language={language}
                onPostClick={onPostClick}
                {...cardProps}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

