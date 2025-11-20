/**
 * useBlogPosts Hook
 * Fetches and manages blog posts list with pagination support
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import { V2PostListItem, V2GetPostsParams, V2GetPaginatedPostsParams, SupportedLanguage } from '../../core'
import { useBlogFlowClient } from '../context/BlogFlowContext'

export interface UseBlogPostsOptions extends Omit<V2GetPaginatedPostsParams, 'lang'> {
  lang?: SupportedLanguage
  page?: number
  pageSize?: number
  autoFetch?: boolean
}

export interface UseBlogPostsReturn {
  posts: V2PostListItem[]
  loading: boolean
  error: string | null
  hasMore: boolean
  totalCount: number
  currentPage: number
  totalPages: number
  loadMore: () => Promise<void>
  refresh: () => Promise<void>
  fetchPage: (page: number) => Promise<void>
}

/**
 * useBlogPosts - Hook to fetch and manage blog posts
 * 
 * @param options Configuration options
 * @returns Posts data and control functions
 * 
 * @example
 * ```tsx
 * const { posts, loading, error, loadMore } = useBlogPosts({
 *   lang: 'zh',
 *   pageSize: 20
 * })
 * ```
 */
export function useBlogPosts(options: UseBlogPostsOptions = {}): UseBlogPostsReturn {
  const {
    lang,
    page = 1,
    pageSize = 20,
    autoFetch = true,
    ...otherParams
  } = options

  const client = useBlogFlowClient()
  const [posts, setPosts] = useState<V2PostListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(page)

  const stableQueryParams = useMemo(() => ({ ...otherParams }), [JSON.stringify(otherParams)])

  const fetchPosts = useCallback(async (
    targetPage: number,
    append: boolean = false
  ) => {
    try {
      setLoading(true)
      setError(null)

      const params: V2GetPaginatedPostsParams = {
        ...stableQueryParams,
        page: targetPage,
        pageSize,
      }

      if (lang !== undefined) {
        params.lang = lang
      }

      const response = await client.getPaginatedPosts(params)

      if (append) {
        setPosts(prev => [...prev, ...response.items])
      } else {
        setPosts(response.items)
      }

      // Use real totalCount from API response
      setTotalCount(response.totalCount)
      setHasMore(targetPage < Math.ceil(response.totalCount / response.pageSize))
      setCurrentPage(response.page)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      setError(errorMessage)
      if (!append) {
        setPosts([])
      }
    } finally {
      setLoading(false)
    }
  }, [client, lang, pageSize, stableQueryParams])

  useEffect(() => {
    if (autoFetch) {
      fetchPosts(page, false)
    }
  }, [autoFetch, page, fetchPosts])

  const loadMore = useCallback(async () => {
    if (hasMore && !loading) {
      await fetchPosts(currentPage + 1, true)
    }
  }, [hasMore, loading, currentPage, fetchPosts])

  const refresh = useCallback(async () => {
    await fetchPosts(1, false)
  }, [fetchPosts])

  const fetchPage = useCallback(async (targetPage: number) => {
    await fetchPosts(targetPage, false)
  }, [fetchPosts])

  const totalPages = Math.ceil(totalCount / pageSize) || 1

  return {
    posts,
    loading,
    error,
    hasMore,
    totalCount,
    currentPage,
    totalPages,
    loadMore,
    refresh,
    fetchPage,
  }
}

