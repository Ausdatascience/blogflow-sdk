/**
 * useBlogSearch Hook
 * Client-side search filtering for blog posts
 */

import { useMemo } from 'react'
import { V2PostListItem } from '../../core'

export interface UseBlogSearchOptions {
  searchTerm: string
  searchFields?: ('title' | 'excerpt' | 'slug' | 'category')[]
  caseSensitive?: boolean
}

export interface UseBlogSearchReturn {
  filteredPosts: V2PostListItem[]
  matchCount: number
  totalCount: number
}

/**
 * useBlogSearch - Hook for client-side post filtering
 * 
 * @param posts Array of posts to filter
 * @param options Search options
 * @returns Filtered posts and match information
 * 
 * @example
 * ```tsx
 * const { posts } = useBlogPosts()
 * const { filteredPosts, matchCount } = useBlogSearch(posts, {
 *   searchTerm: 'react',
 *   searchFields: ['title', 'excerpt']
 * })
 * ```
 */
export function useBlogSearch(
  posts: V2PostListItem[],
  options: UseBlogSearchOptions
): UseBlogSearchReturn {
  const {
    searchTerm,
    searchFields = ['title', 'excerpt', 'slug', 'category'],
    caseSensitive = false,
  } = options

  const filteredPosts = useMemo(() => {
    const keyword = caseSensitive ? searchTerm.trim() : searchTerm.trim().toLowerCase()

    if (!keyword) {
      return posts
    }

    return posts.filter((post) => {
      const matches = searchFields.some((field) => {
        const value = post[field]
        if (!value) return false

        const searchValue = caseSensitive ? String(value) : String(value).toLowerCase()
        return searchValue.includes(keyword)
      })

      return matches
    })
  }, [posts, searchTerm, searchFields, caseSensitive])

  return {
    filteredPosts,
    matchCount: filteredPosts.length,
    totalCount: posts.length,
  }
}

