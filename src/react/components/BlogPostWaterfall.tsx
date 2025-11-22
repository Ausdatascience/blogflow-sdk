/**
 * BlogPostWaterfall Component
 * Waterfall layout for blog posts using JavaScript-based positioning
 */

import { useEffect, useRef } from 'react'
import { V2PostListItem, SupportedLanguage } from '../../core'
import { BlogPostCard, BlogPostCardProps } from './BlogPostCard'

export interface BlogPostWaterfallProps {
  posts: V2PostListItem[]
  language?: SupportedLanguage
  onPostClick?: (slug: string) => void
  className?: string
  itemClassName?: string
  cardProps?: Omit<BlogPostCardProps, 'post' | 'language' | 'onPostClick' | 'className'>
  minColumnWidth?: number
  gap?: number
}

/**
 * BlogPostWaterfall - Waterfall layout component using JavaScript positioning
 * 
 * @example
 * ```tsx
 * <BlogPostWaterfall
 *   posts={posts}
 *   language="zh"
 *   onPostClick={(slug) => navigate(`/post/${slug}`)}
 * />
 * ```
 */
export function BlogPostWaterfall({
  posts,
  language = 'en',
  onPostClick,
  className = '',
  itemClassName = '',
  cardProps = {},
  minColumnWidth = 280,
  gap = 24,
}: BlogPostWaterfallProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const items = container.querySelectorAll('[data-waterfall-item]')
      if (items.length === 0) return

      const containerWidth = container.offsetWidth
      const columnCount = Math.max(1, Math.floor(containerWidth / minColumnWidth))
      const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount

      // Reset all columns
      const columns: number[] = new Array(columnCount).fill(0)

      items.forEach((item) => {
        const element = item as HTMLElement
        // Ensure element is visible before calculating height
        if (element.offsetHeight === 0) {
          element.style.visibility = 'hidden'
          element.style.position = 'static'
          element.style.width = 'auto'
          element.style.left = 'auto'
          element.style.top = 'auto'
        }
      })

      // Recalculate after one frame
      requestAnimationFrame(() => {
        items.forEach((item) => {
          const element = item as HTMLElement
          element.style.visibility = 'visible'

          // Find shortest column
          const shortestColumnIndex = columns.indexOf(Math.min(...columns))

          // Set position
          element.style.position = 'absolute'
          element.style.width = `${columnWidth}px`
          element.style.left = `${shortestColumnIndex * (columnWidth + gap)}px`
          element.style.top = `${columns[shortestColumnIndex]}px`

          // Update column height
          const itemHeight = element.offsetHeight || element.scrollHeight
          columns[shortestColumnIndex] += itemHeight + gap
        })

        // Set container height
        const maxHeight = Math.max(...columns)
        if (maxHeight > 0) {
          container.style.height = `${maxHeight}px`
        }
      })
    }

    // Delay execution to ensure DOM is rendered
    const timeoutId = setTimeout(() => {
      handleResize()
    }, 100)

    // Listen for window resize
    const resizeHandler = () => {
      clearTimeout(timeoutId)
      setTimeout(handleResize, 100)
    }
    window.addEventListener('resize', resizeHandler)

    // Use ResizeObserver to watch container size changes
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeoutId)
      setTimeout(handleResize, 100)
    })
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Listen for image load completion, re-layout
    const images = containerRef.current?.querySelectorAll('img')
    if (images && images.length > 0) {
      let loadedCount = 0
      const totalImages = images.length

      const checkAllLoaded = () => {
        loadedCount++
        if (loadedCount === totalImages) {
          setTimeout(handleResize, 150)
        }
      }

      images.forEach((img) => {
        if (img.complete) {
          checkAllLoaded()
        } else {
          img.addEventListener('load', checkAllLoaded, { once: true })
          img.addEventListener('error', checkAllLoaded, { once: true })
        }
      })
    }

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', resizeHandler)
      resizeObserver.disconnect()
    }
  }, [posts, minColumnWidth, gap])

  return (
    <div
      ref={containerRef}
      className={`blog-post-list blog-post-list-waterfall ${className}`}
      style={{ minHeight: '400px', position: 'relative' }}
    >
      {posts.map((post) => (
        <div
          key={post.id}
          data-waterfall-item
          className={itemClassName}
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

