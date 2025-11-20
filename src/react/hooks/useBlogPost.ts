/**
 * useBlogPost Hook
 * Fetches a single blog post by slug
 */

import { useState, useEffect, useCallback } from 'react'
import { V2Post, SupportedLanguage } from '../../core'
import { useBlogFlowClient } from '../context/BlogFlowContext'

export interface UseBlogPostOptions {
  lang?: SupportedLanguage
  autoFetch?: boolean
}

export interface UseBlogPostReturn {
  post: V2Post | null
  loading: boolean
  error: string | null
  fetch: (slug: string) => Promise<void>
  refresh: () => Promise<void>
}

/**
 * useBlogPost - Hook to fetch a single blog post
 * 
 * @param slug Post slug
 * @param options Configuration options
 * @returns Post data and control functions
 * 
 * @example
 * ```tsx
 * const { post, loading, error } = useBlogPost('my-article-slug', {
 *   lang: 'zh'
 * })
 * ```
 */
export function useBlogPost(
  slug: string | null,
  options: UseBlogPostOptions = {}
): UseBlogPostReturn {
  const { lang, autoFetch = true } = options
  const client = useBlogFlowClient()
  const [post, setPost] = useState<V2Post | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPost = useCallback(async (targetSlug: string) => {
    if (!targetSlug) {
      setPost(null)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const postData = await client.getPost(targetSlug, { lang })
      setPost(postData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      setError(errorMessage)
      setPost(null)
    } finally {
      setLoading(false)
    }
  }, [client, lang])

  useEffect(() => {
    if (autoFetch && slug) {
      fetchPost(slug)
    }
  }, [autoFetch, slug, fetchPost])

  const refresh = useCallback(async () => {
    if (slug) {
      await fetchPost(slug)
    }
  }, [slug, fetchPost])

  return {
    post,
    loading,
    error,
    fetch: fetchPost,
    refresh,
  }
}

