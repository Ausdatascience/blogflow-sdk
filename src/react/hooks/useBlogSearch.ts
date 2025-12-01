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
  /** Initial page for server-side mode (default: 1) */
  page?: number
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
  /** Total number of matching results */
  totalCount: number
  /** Current page number (server mode) */
  page: number
  /** Page size (server mode) */
  pageSize: number
  /** Total number of pages (server mode) */
  totalPages: number
  /** Whether next page exists (server mode) */
  hasNextPage: boolean
  /** Whether previous page exists (server mode) */
  hasPreviousPage: boolean
  /** Jump to a page (server mode) */
  setPage: (page: number) => void
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
    page: initialPage = 1,
  } = options

  // Auto-detect mode: if posts provided, use client mode
  const mode: SearchMode = explicitMode || (clientPosts ? 'client' : 'server')

  const client = useBlogFlowClient()

  // Server mode state
  const [serverResults, setServerResults] = useState<V2PostListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [pagination, setPagination] = useState({
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  })
  const safeInitialPage = Math.max(1, Math.floor(initialPage) || 1)
  const [page, setPageState] = useState(safeInitialPage)

  const searchTermRef = useRef(searchTerm)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pageRef = useRef(safeInitialPage)

  const updatePage = useCallback((nextPage: number) => {
    const safePage = Math.max(1, Math.floor(nextPage) || 1)
    pageRef.current = safePage
    // Use functional update to avoid unnecessary re-renders
    setPageState(prevPage => {
      if (prevPage !== safePage) {
        return safePage
      }
      return prevPage
    })
  }, [])

  useEffect(() => {
    if (mode !== 'server') return
    const normalized = Math.max(1, Math.floor(initialPage) || 1)
    // Only update if the normalized page is different from ref (to avoid unnecessary updates)
    if (normalized !== pageRef.current) {
      pageRef.current = normalized
      // Only update state if it's actually different to avoid re-renders
      setPageState(prevPage => {
        if (normalized !== prevPage) {
          return normalized
        }
        return prevPage
      })
    }
  }, [initialPage, mode])

  useEffect(() => {
    searchTermRef.current = searchTerm
  }, [searchTerm])

  // Server-side search function
  const performServerSearch = useCallback(async (requestedPage?: number) => {
    const currentSearchTerm = searchTermRef.current.trim()

    if (!currentSearchTerm) {
      setServerResults([])
      setHasSearched(false)
      setError(null)
      setPagination({
        totalCount: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      })
      updatePage(1)
      return
    }

    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const pageToFetch = typeof requestedPage === 'number' ? requestedPage : pageRef.current
      const response = await client.getPaginatedPosts({
        search: currentSearchTerm,
        searchFields,
        page: pageToFetch,
        pageSize: limit,
        sort,
        order,
        lang: lang as any,
      })
      setServerResults(response.items)
      updatePage(response.page)
      setPagination({
        totalCount: response.totalCount,
        totalPages: response.totalPages,
        hasNextPage: response.hasNextPage,
        hasPreviousPage: response.hasPreviousPage,
      })
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to search posts'
      setError(errorMessage)
      setServerResults([])
      setPagination({
        totalCount: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      })
    } finally {
      setLoading(false)
    }
  }, [client, searchFields, limit, sort, order, lang, updatePage])

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

  // Use ref to store latest performServerSearch to avoid infinite loops
  const performServerSearchRef = useRef(performServerSearch)
  useEffect(() => {
    performServerSearchRef.current = performServerSearch
  }, [performServerSearch])

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
      setPagination({
        totalCount: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      })
      // Use ref to update page without causing re-render loop
      const safePage = 1
      pageRef.current = safePage
      setPageState(prevPage => prevPage !== safePage ? safePage : prevPage)
      return
    }

    debounceTimerRef.current = setTimeout(() => {
      performServerSearchRef.current(1)
    }, debounceMs)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchTerm, autoSearch, debounceMs, mode])

  const clear = useCallback(() => {
    if (mode === 'server') {
      setServerResults([])
      setError(null)
      setHasSearched(false)
      setPagination({
        totalCount: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      })
      updatePage(1)
    }
  }, [mode, updatePage])

  const setPage = useCallback(
    (nextPage: number) => {
      if (mode !== 'server') return
      const safePage = Math.max(1, Math.floor(nextPage) || 1)
      updatePage(safePage)
      performServerSearch(safePage)
    },
    [mode, performServerSearch, updatePage]
  )

  const results = mode === 'server' ? serverResults : clientResults
  const totalCount =
    mode === 'server' ? pagination.totalCount : results.length
  const resultCount = results.length

  return {
    results,
    loading: mode === 'server' ? loading : false,
    error: mode === 'server' ? error : null,
    hasSearched: mode === 'server' ? hasSearched : true,
    search: mode === 'server' ? performServerSearch : () => {},
    clear,
    totalCount,
    page: mode === 'server' ? page : 1,
    pageSize: limit,
    totalPages: mode === 'server' ? pagination.totalPages || (results.length > 0 ? 1 : 0) : 1,
    hasNextPage: mode === 'server' ? pagination.hasNextPage : false,
    hasPreviousPage: mode === 'server' ? pagination.hasPreviousPage : false,
    setPage,
    resultCount,
    // Backward compatibility
    filteredPosts: results,
    matchCount: resultCount,
  }
}
