/**
 * useBlogSearch Hook
 * Server-side search with automatic debouncing (recommended for production)
 * Falls back to client-side filtering if posts array is provided
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { V2PostListItem, SearchField } from '../../core'
import { useBlogFlowClient } from '../context/BlogFlowContext'

export type SearchMode = 'server' | 'client'

export interface UseBlogSearchOptions {
  /** Search keyword */
  searchTerm: string
  /** Fields to search in (default: ['title', 'excerpt', 'category']) */
  searchFields?: SearchField[]
  /** Search mode: 'server' (default) or 'client' */
  mode?: SearchMode
  /** Debounce delay in milliseconds (default: 300, only for server mode) */
  debounceMs?: number
  /** Number of results to fetch (default: 20, only for server mode) */
  limit?: number
  /** Sort field (only for server mode) */
  sort?: 'id' | 'created_at' | 'updated_at'
  /** Sort order (only for server mode) */
  order?: 'asc' | 'desc'
  /** Language code (only for server mode) */
  lang?: string
  /** Case sensitive search (only for client mode) */
  caseSensitive?: boolean
  /** Enable automatic search on searchTerm change (default: true, only for server mode) */
  autoSearch?: boolean
}

export interface UseBlogSearchReturn {
  /** Search results */
  results: V2PostListItem[]
  /** Loading state (only for server mode) */
  loading: boolean
  /** Error message if any (only for server mode) */
  error: string | null
  /** Whether search has been performed (only for server mode) */
  hasSearched: boolean
  /** Manually trigger search (only for server mode) */
  search: () => void
  /** Clear search results */
  clear: () => void
  /** Number of results */
  resultCount: number

  // Backward compatibility aliases
  /** @deprecated Use 'results' instead */
  filteredPosts: V2PostListItem[]
  /** @deprecated Use 'resultCount' instead */
  matchCount: number
}

/**
 * useBlogSearch - Unified search hook with server-side search by default
 *
 * **Default behavior (Server-side):**
 * ```tsx
 * const { results, loading } = useBlogSearch({
 *   searchTerm: 'react',
 *   debounceMs: 300
 * })
 * ```
 *
 * **Client-side mode (for pre-loaded data):**
 * ```tsx
 * const { posts } = useBlogPosts()
 * const { results } = useBlogSearch({
 *   searchTerm: 'react',
 *   mode: 'client'
 * }, posts)
 * ```
 */
export function useBlogSearch(
  options: UseBlogSearchOptions,
  clientPosts?: V2PostListItem[]
): UseBlogSearchReturn {
  const {
    searchTerm,
    searchFields = ['title', 'excerpt', 'category'],
    mode: explicitMode,
    debounceMs = 300,
    limit = 20,
    sort = 'id',
    order = 'desc',
    lang,
    caseSensitive = false,
    autoSearch = true,
  } = options

  // Auto-detect mode: if posts provided, use client mode
  const mode: SearchMode = explicitMode || (clientPosts ? 'client' : 'server')

  const client = useBlogFlowClient()

  // Server mode state
  const [serverResults, setServerResults] = useState<V2PostListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const searchTermRef = useRef(searchTerm)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    searchTermRef.current = searchTerm
  }, [searchTerm])

  // Server-side search function
  const performServerSearch = useCallback(async () => {
    const currentSearchTerm = searchTermRef.current.trim()

    if (!currentSearchTerm) {
      setServerResults([])
      setHasSearched(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const posts = await client.getPosts({
        search: currentSearchTerm,
        searchFields,
        limit,
        sort,
        order,
        lang: lang as any,
      })
      setServerResults(posts)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to search posts'
      setError(errorMessage)
      setServerResults([])
    } finally {
      setLoading(false)
    }
  }, [client, searchFields, limit, sort, order, lang])

  // Client-side filtering with useMemo
  const clientResults = useMemo(() => {
    if (mode !== 'client' || !clientPosts) return []

    const keyword = caseSensitive ? searchTerm.trim() : searchTerm.trim().toLowerCase()

    if (!keyword) {
      return clientPosts
    }

    return clientPosts.filter((post) => {
      const matches = searchFields.some((field) => {
        const value = post[field]
        if (!value) return false

        const searchValue = caseSensitive ? String(value) : String(value).toLowerCase()
        return searchValue.includes(keyword)
      })

      return matches
    })
  }, [clientPosts, searchTerm, searchFields, caseSensitive, mode])

  // Debounced search effect (server mode only)
  useEffect(() => {
    if (mode !== 'server' || !autoSearch) return

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    if (!searchTerm.trim()) {
      setServerResults([])
      setHasSearched(false)
      setError(null)
      return
    }

    debounceTimerRef.current = setTimeout(() => {
      performServerSearch()
    }, debounceMs)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchTerm, autoSearch, debounceMs, performServerSearch, mode])

  const clear = useCallback(() => {
    if (mode === 'server') {
      setServerResults([])
      setError(null)
      setHasSearched(false)
    }
  }, [mode])

  const results = mode === 'server' ? serverResults : clientResults
  const resultCount = results.length

  return {
    results,
    loading: mode === 'server' ? loading : false,
    error: mode === 'server' ? error : null,
    hasSearched: mode === 'server' ? hasSearched : true,
    search: mode === 'server' ? performServerSearch : () => {},
    clear,
    resultCount,
    // Backward compatibility
    filteredPosts: results,
    matchCount: resultCount,
  }
}
