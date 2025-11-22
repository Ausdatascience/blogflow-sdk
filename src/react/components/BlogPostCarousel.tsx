/**
 * BlogPostCarousel Component
 * Carousel layout for blog posts with navigation
 */

import { useState, useEffect } from 'react'
import { V2PostListItem, SupportedLanguage } from '../../core'

export interface BlogPostCarouselProps {
  posts: V2PostListItem[]
  language?: SupportedLanguage
  onPostClick?: (slug: string) => void
  className?: string
  itemClassName?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

/**
 * BlogPostCarousel - Carousel layout component
 * Displays posts in a carousel format with navigation
 * 
 * @example
 * ```tsx
 * <BlogPostCarousel
 *   posts={posts}
 *   language="zh"
 *   onPostClick={(slug) => navigate(`/post/${slug}`)}
 * />
 * ```
 */
export function BlogPostCarousel({
  posts,
  language = 'en',
  onPostClick,
  className = '',
  itemClassName = '',
  autoPlay = false,
  autoPlayInterval = 5000,
}: BlogPostCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (!isPlaying || posts.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, posts.length, autoPlayInterval])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length)
    setIsPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length)
    setIsPlaying(false)
  }

  const handleClick = (slug: string, e?: React.MouseEvent) => {
    // 如果正在拖拽，不触发点击
    if (isDragging) {
      return
    }
    // 如果事件来自按钮，确保阻止冒泡
    if (e) {
      e.stopPropagation()
    }
    onPostClick?.(slug)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart({ x: e.clientX, y: e.clientY })
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart) {
      const deltaX = Math.abs(e.clientX - dragStart.x)
      const deltaY = Math.abs(e.clientY - dragStart.y)
      // 如果移动距离超过 5px，认为是拖拽
      if (deltaX > 5 || deltaY > 5) {
        setIsDragging(true)
      }
    }
  }

  const handleMouseUp = () => {
    setDragStart(null)
    // 延迟重置拖拽状态，确保点击事件不会触发
    setTimeout(() => {
      setIsDragging(false)
    }, 100)
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (Number.isNaN(date.getTime())) return ''
      return date.toLocaleDateString(
        language === 'zh' ? 'zh-CN' : 'en-US'
      )
    } catch {
      return ''
    }
  }

  if (posts.length === 0) {
    return null
  }

  const currentPost = posts[currentIndex]

  return (
    <div className={`blog-post-list blog-post-list-carousel ${className}`}>
      {/* Main carousel */}
      <div className="blog-post-carousel-main">
        <article
          className={`blog-post-carousel-item ${itemClassName}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Background image */}
          {currentPost.featured_image_url && (
            <div className="blog-post-carousel-image">
              <img
                src={currentPost.featured_image_url}
                alt={currentPost.title}
                className="blog-post-carousel-image-img"
                loading={currentIndex < 3 ? 'eager' : 'lazy'}
              />
            </div>
          )}

          {/* Overlay */}
          <div className="blog-post-carousel-overlay"></div>

          {/* Content */}
          <div className="blog-post-carousel-content">
            <div className="blog-post-carousel-content-inner">
              {/* Tags */}
              {currentPost.category && (
                <div className="blog-post-carousel-tags">
                  <span className="blog-post-carousel-tag">{currentPost.category}</span>
                </div>
              )}

              {/* Title */}
              <h2 className="blog-post-carousel-title">{currentPost.title}</h2>

              {/* Excerpt */}
              {currentPost.excerpt && (
                <p className="blog-post-carousel-excerpt">{currentPost.excerpt}</p>
              )}

              {/* Footer */}
              <div className="blog-post-carousel-footer">
                <div className="blog-post-carousel-meta">
                  {currentPost.created_at && (
                    <span className="blog-post-carousel-date">
                      {formatDate(currentPost.created_at)}
                    </span>
                  )}
                </div>

                <button
                  className="blog-post-carousel-cta"
                  onClick={(e) => handleClick(currentPost.slug, e)}
                  onKeyDown={(e) => {
                    if (onPostClick && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault()
                      handleClick(currentPost.slug)
                    }
                  }}
                >
                  {language === 'zh' ? '阅读更多' : 'Read More'}
                </button>
              </div>
            </div>
          </div>

          {/* Page indicator */}
          <div className="blog-post-carousel-indicator">
            {currentIndex + 1} / {posts.length}
          </div>

          {/* Navigation buttons */}
          <button
            className="blog-post-carousel-nav blog-post-carousel-nav-prev"
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            aria-label={language === 'zh' ? '上一张' : 'Previous'}
          >
            ←
          </button>
          <button
            className="blog-post-carousel-nav blog-post-carousel-nav-next"
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            aria-label={language === 'zh' ? '下一张' : 'Next'}
          >
            →
          </button>
        </article>
      </div>

      {/* Pagination dots */}
      <div className="blog-post-carousel-pagination">
        {posts.map((_, index) => (
          <button
            key={index}
            className={`blog-post-carousel-dot ${
              index === currentIndex ? 'blog-post-carousel-dot-active' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation()
              goToSlide(index)
            }}
            aria-label={`${language === 'zh' ? '跳转到' : 'Go to'} ${index + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail carousel */}
      <div className="blog-post-carousel-thumbs">
        {posts.map((post, index) => (
          <button
            key={post.id}
            className={`blog-post-carousel-thumb ${
              index === currentIndex ? 'blog-post-carousel-thumb-active' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation()
              goToSlide(index)
            }}
            aria-label={`${language === 'zh' ? '跳转到' : 'Go to'} ${post.title}`}
          >
            {post.featured_image_url && (
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="blog-post-carousel-thumb-img"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

