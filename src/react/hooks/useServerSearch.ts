/**
 * useServerSearch Hook
 * Server-side search for blog posts with debouncing
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { V2PostListItem, V2GetPostsParams, SearchField } from '../../core'
import { useBlogFlowClient } from '../context/BlogFlowContext'

export interface UseServerSearchOptions {
  /** Search keyword */
  searchTerm: string
  /** Fields to search in (default: ['title', 'excerpt', 'category']) */
  searchFields?: SearchField[]
  /** Debounce delay in milliseconds (default: 300) */
  debounceMs?: number
  /** Number of results to fetch (default: 20) */
  limit?: number
  /** Sort field (default: 'id') */
  sort?: 'id' | 'created_at' | 'updated_at'
  /** Sort order (default: 'desc') */
  order?: 'asc' | 'desc'
  /** Language code */
  lang?: string
  /** Enable automatic search on searchTerm change (default: true) */
  autoSearch?: boolean
}

export interface UseServerSearchReturn {
  /** Search results */
  results: V2PostListItem[]
  /** Loading state */
  loading: boolean
  /** Error message if any */
  error: string | null
  /** Whether search has been performed */
  hasSearched: boolean
  /** Manually trigger search */
  search: () => void
  /** Clear search results */
  clear: () => void
  /** Total number of results */
  resultCount: number
}

/**
 * useServerSearch - Hook for server-side post search with debouncing
 *
 * @param options Search options
 * @returns Search results and state
 *
 * @example
 * ```tsx
 * const { results, loading, error, resultCount } = useServerSearch({
 *   searchTerm: 'react',
 *   searchFields: ['title', 'excerpt'],
 *   debounceMs: 300
 * })
 * ```
 */
export function useServerSearch(
  options: UseServerSearchOptions
): UseServerSearchReturn {
  const {
    searchTerm,
    searchFields = ['title', 'excerpt', 'category'],
    debounceMs = 300,
    limit = 20,
    sort = 'id',
    order = 'desc',
    lang,
    autoSearch = true,
  } = options

  const client = useBlogFlowClient()
  const [results, setResults] = useState<V2PostListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  // Use ref to track the latest search term for debouncing
  const searchTermRef = useRef(searchTerm)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    searchTermRef.current = searchTerm
  }, [searchTerm])

  const performSearch = useCallback(async () => {
    const currentSearchTerm = searchTermRef.current.trim()

    // If search term is empty, clear results
    if (!currentSearchTerm) {
      setResults([])
      setHasSearched(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const params: V2GetPostsParams = {
        search: currentSearchTerm,
        searchFields,
        limit,
        sort,
        order,
      }

      if (lang) {
        params.lang = lang as any
      }

      const posts = await client.getPosts(params)
      setResults(posts)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to search posts'
      setError(errorMessage)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [client, searchFields, limit, sort, order, lang])

  // Debounced search effect
  useEffect(() => {
    if (!autoSearch) return

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // If search term is empty, clear immediately without debounce
    if (!searchTerm.trim()) {
      setResults([])
      setHasSearched(false)
      setError(null)
      return
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      performSearch()
    }, debounceMs)

    // Cleanup
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchTerm, autoSearch, debounceMs, performSearch])

  const clear = useCallback(() => {
    setResults([])
    setError(null)
    setHasSearched(false)
  }, [])

  return {
    results,
    loading,
    error,
    hasSearched,
    search: performSearch,
    clear,
    resultCount: results.length,
  }
}
