/**
 * useBlogPosts Hook
 * Fetches and manages blog posts list with pagination support
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
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
    search,
    sort,
    order,
    searchFields,
    next,
    cache,
    ...otherParams
  } = options

  const client = useBlogFlowClient()
  const [posts, setPosts] = useState<V2PostListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(page)
  
  // Use ref to track the latest fetchPosts function to avoid infinite loops
  const fetchPostsRef = useRef<((targetPage: number, append: boolean) => Promise<void>) | null>(null)

  // Stabilize searchFields array to avoid unnecessary re-renders
  // Store in ref to avoid dependency issues
  const searchFieldsRef = useRef(searchFields)
  const searchFieldsStringRef = useRef<string>('')
  const stableSearchFields = useMemo(() => {
    if (!searchFields) {
      searchFieldsRef.current = undefined
      searchFieldsStringRef.current = ''
      return undefined
    }
    const currentString = JSON.stringify(searchFields)
    // Only create new array if content actually changed
    if (currentString === searchFieldsStringRef.current && searchFieldsRef.current) {
      return searchFieldsRef.current
    }
    searchFieldsStringRef.current = currentString
    const newValue = searchFields.length > 0 ? [...searchFields] : undefined
    searchFieldsRef.current = newValue
    return newValue
  }, [searchFields])

  // Memoize other params (like limit, offset) that don't need to trigger refetch
  // Use JSON.stringify to ensure deep equality check
  const stableOtherParams = useMemo(() => {
    return { ...otherParams }
  }, [JSON.stringify(otherParams)])

  const fetchPosts = useCallback(async (
    targetPage: number,
    append: boolean = false
  ) => {
    try {
      setLoading(true)
      setError(null)

      const params: V2GetPaginatedPostsParams = {
        ...stableOtherParams,
        page: targetPage,
        pageSize,
      }

      // Add query parameters
      if (lang !== undefined) {
        params.lang = lang
      }
      if (search !== undefined) {
        params.search = search
      }
      if (sort !== undefined) {
        params.sort = sort
      }
      if (order !== undefined) {
        params.order = order
      }
      if (stableSearchFields !== undefined) {
        params.searchFields = stableSearchFields
      }
      if (next !== undefined) {
        params.next = next
      }
      if (cache !== undefined) {
        params.cache = cache
      }

      const response = await client.getPaginatedPosts(params)

      if (append) {
        setPosts(prev => [...prev, ...response.items])
      } else {
        setPosts(response.items)
      }

      // Use real totalCount and totalPages from API response
      // If API doesn't provide totalPages, calculate from totalCount
      // If API doesn't provide totalCount, use hasMore (boolean) as fallback
      setTotalCount(response.totalCount || 0)
      if (response.totalPages !== undefined && response.totalPages > 0) {
        setTotalPages(response.totalPages)
      } else if (response.totalCount !== undefined && response.totalCount > 0) {
        setTotalPages(Math.ceil(response.totalCount / response.pageSize))
      } else {
        // Fallback: use hasMore to determine if there are more pages
        setTotalPages(response.hasNextPage ? targetPage + 1 : targetPage)
      }
      setHasMore(response.hasNextPage ?? (targetPage < Math.ceil((response.totalCount || 0) / response.pageSize)))
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
  }, [
    client,
    lang,
    pageSize,
    search,
    sort,
    order,
    stableSearchFields,
    next,
    cache,
    stableOtherParams,
  ])

  // Store the latest fetchPosts function in ref
  useEffect(() => {
    fetchPostsRef.current = fetchPosts
  }, [fetchPosts])

  // Store searchFields string for comparison
  const searchFieldsString = useMemo(() => JSON.stringify(searchFields || []), [searchFields])
  
  // Fetch posts when any query parameter changes
  // Use ref to avoid including fetchPosts in dependencies (which causes infinite loops)
  // Note: stableOtherParams and stableSearchFields are not in dependencies because they're already handled by fetchPosts ref
  useEffect(() => {
    if (autoFetch && fetchPostsRef.current) {
      fetchPostsRef.current(page, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch, page, lang, pageSize, search, sort, order, next, cache, searchFieldsString])

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

