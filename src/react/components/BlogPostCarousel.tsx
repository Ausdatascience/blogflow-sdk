/**
 * BlogPostCarousel Component
 * Carousel layout for blog posts with navigation
 */

import { useState, useEffect } from 'react'
import type React from 'react'
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
  const [dragOffset, setDragOffset] = useState(0)

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

  const handleStart = (clientX: number, clientY: number) => {
    setDragStart({ x: clientX, y: clientY })
    setIsDragging(false)
    setDragOffset(0)
    setIsPlaying(false)
  }

  const handleMove = (clientX: number, clientY: number) => {
    if (dragStart) {
      const deltaX = clientX - dragStart.x
      const deltaY = Math.abs(clientY - dragStart.y)
      
      // 如果水平移动距离超过垂直移动距离，认为是水平拖拽
      if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > deltaY) {
        setIsDragging(true)
        setDragOffset(deltaX)
      }
    }
  }

  const handleEnd = () => {
    if (dragStart && isDragging) {
      const deltaX = dragOffset
      const threshold = 50 // 拖拽超过 50px 才切换
      
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          // 向右拖拽，显示上一张
          goToPrevious()
        } else {
          // 向左拖拽，显示下一张
          goToNext()
        }
      }
    }
    
    setDragStart(null)
    setDragOffset(0)
    // 延迟重置拖拽状态，确保点击事件不会触发
    setTimeout(() => {
      setIsDragging(false)
    }, 100)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart) {
      handleMove(e.clientX, e.clientY)
    }
  }

  const handleMouseUp = () => {
    handleEnd()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleStart(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStart) {
      const touch = e.touches[0]
      handleMove(touch.clientX, touch.clientY)
    }
  }

  const handleTouchEnd = () => {
    handleEnd()
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (Number.isNaN(date.getTime())) return ''
      // Use UTC methods to avoid timezone conversion issues
      const year = date.getUTCFullYear()
      const month = date.getUTCMonth()
      const day = date.getUTCDate()
      const localDate = new Date(year, month, day)
      return localDate.toLocaleDateString(
        language === 'zh' ? 'zh-CN' : 'en-US'
      )
    } catch {
      return ''
    }
  }

  if (posts.length === 0) {
    return null
  }

  // 计算要显示的卡片索引（当前 + 前后各一张）
  const getVisibleIndices = () => {
    const indices: number[] = []
    const prevIndex = (currentIndex - 1 + posts.length) % posts.length
    const nextIndex = (currentIndex + 1) % posts.length
    indices.push(prevIndex, currentIndex, nextIndex)
    return indices
  }

  const visibleIndices = getVisibleIndices()

  // 计算每张卡片的位置和样式
  const getCardStyle = (index: number): React.CSSProperties => {
    const position = visibleIndices.indexOf(index)
    if (position === -1) {
      return { display: 'none' }
    }

    // 中间是当前卡片，左边是上一张，右边是下一张
    const baseOffset = (position - 1) * 100 // -100%, 0%, 100%
    
    // 计算拖动偏移（使用百分比，基于容器宽度）
    let dragOffsetPercent = 0
    if (isDragging && typeof window !== 'undefined') {
      const containerWidth = window.innerWidth
      dragOffsetPercent = (dragOffset / containerWidth) * 100
    }
    
    const translateX = baseOffset + dragOffsetPercent

    return {
      transform: `translateX(${translateX}%)`,
      transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: position === 1 ? 1 : 0.3, // 当前卡片完全不透明，其他半透明
      zIndex: position === 1 ? 10 : position === 0 ? 9 : 8,
      pointerEvents: position === 1 ? 'auto' : 'none',
    }
  }

  return (
    <div 
      className={`blog-post-list blog-post-list-carousel ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Main carousel */}
      <div className="blog-post-carousel-main" style={{ position: 'relative', width: '100%', height: '500px' }}>
        {visibleIndices.map((postIndex, arrayIndex) => {
          const post = posts[postIndex]
          const cardStyle = getCardStyle(postIndex)
          if (cardStyle.display === 'none') return null

          return (
            <article
              key={`${post.id}-${postIndex}`}
              className={`blog-post-carousel-item ${itemClassName}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                ...cardStyle,
              }}
            >
              {/* Background image */}
              {post.featured_image_url && (
                <div className="blog-post-carousel-image">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="blog-post-carousel-image-img"
                    loading={arrayIndex === 1 ? 'eager' : 'lazy'}
                  />
                </div>
              )}

              {/* Overlay */}
              <div className="blog-post-carousel-overlay"></div>

              {/* Content */}
              <div className="blog-post-carousel-content">
                <div className="blog-post-carousel-content-inner">
                  {/* Tags */}
                  {post.category && (
                    <div className="blog-post-carousel-tags">
                      <span className="blog-post-carousel-tag">{post.category}</span>
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="blog-post-carousel-title">{post.title}</h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="blog-post-carousel-excerpt">{post.excerpt}</p>
                  )}

                  {/* Footer */}
                  <div className="blog-post-carousel-footer">
                    <div className="blog-post-carousel-meta">
                      {(post.published_at || post.created_at) && (
                        <span className="blog-post-carousel-date">
                          {formatDate(post.published_at || post.created_at)}
                        </span>
                      )}
                    </div>

                    <button
                      className="blog-post-carousel-cta"
                      onClick={(e) => handleClick(post.slug, e)}
                      onKeyDown={(e) => {
                        if (onPostClick && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault()
                          handleClick(post.slug)
                        }
                      }}
                    >
                      {language === 'zh' ? '阅读更多' : 'Read More'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )
        })}

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

