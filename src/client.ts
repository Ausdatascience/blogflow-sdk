/**
 * BlogFlow SDK Client
 * Provides methods to interact with BlogFlow API Server v2
 */

import {
  BlogFlowConfig,
  SupportedLanguage,
  V2GetPostsParams,
  V2PostListItem,
  V2Post,
  V2ErrorResponse,
  BlogFlowError,
  BlogFlowAuthError,
  BlogFlowNotFoundError,
  BlogFlowServerError,
} from './types'

const DEFAULT_BASE_URL = 'https://blogflow-api-server.vercel.app/api/v2'

export class BlogFlow {
  private apiKey: string
  private baseUrl: string
  private defaultLanguage?: SupportedLanguage

  constructor(config: BlogFlowConfig) {
    if (!config.apiKey) {
      throw new Error('BlogFlow: API Key is required')
    }

    this.apiKey = config.apiKey
    this.baseUrl = config.baseUrl || DEFAULT_BASE_URL
    this.defaultLanguage = config.defaultLanguage
  }

  /**
   * Make an authenticated request to the API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        if (!response.ok) {
          throw new BlogFlowError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status
          )
        }
        throw new BlogFlowError('Invalid response format')
      }

      const data = await response.json()

      // Handle v2 error responses
      if ('error' in data && !('success' in data)) {
        const errorData = data as V2ErrorResponse
        this.handleError(response.status, errorData.error)
      }

      // Handle HTTP error status codes
      if (!response.ok) {
        this.handleError(response.status, data.error || response.statusText)
      }

      return data as T
    } catch (error) {
      if (error instanceof BlogFlowError) {
        throw error
      }
      if (error instanceof Error) {
        throw new BlogFlowError(`Request failed: ${error.message}`)
      }
      throw new BlogFlowError('Unknown error occurred')
    }
  }

  /**
   * Handle API errors with appropriate error types
   */
  private handleError(status: number, message: string, details?: string): never {
    switch (status) {
      case 401:
        throw new BlogFlowAuthError(message)
      case 404:
        throw new BlogFlowNotFoundError(message)
      case 500:
        throw new BlogFlowServerError(message, details)
      default:
        throw new BlogFlowError(message, status, details)
    }
  }

  /**
   * Build query string from parameters
   */
  private buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    }
    return searchParams.toString()
  }

  // ============================================================================
  // API v2 Methods
  // ============================================================================

  /**
   * Get posts list - Minimal, fast response
   *
   * @param params Query parameters
   * @returns Array of post list items
   *
   * @example
   * ```typescript
   * const posts = await client.getPosts({ lang: 'zh', limit: 20, offset: 0 })
   *
   * // Server-side search
   * const searchResults = await client.getPosts({ search: 'react' })
   * const titleSearch = await client.getPosts({
   *   search: 'javascript',
   *   searchFields: ['title']
   * })
   * ```
   */
  async getPosts(params: V2GetPostsParams = {}): Promise<V2PostListItem[]> {
    const queryParams: Record<string, any> = {}

    if (params.lang !== undefined) queryParams.lang = params.lang
    else if (this.defaultLanguage) queryParams.lang = this.defaultLanguage

    if (params.limit !== undefined) queryParams.limit = params.limit
    if (params.offset !== undefined) queryParams.offset = params.offset
    if (params.sort) queryParams.sort = params.sort
    if (params.order) queryParams.order = params.order

    // Search parameters
    if (params.search) queryParams.search = params.search
    if (params.searchFields && params.searchFields.length > 0) {
      queryParams.searchFields = params.searchFields.join(',')
    }

    const queryString = this.buildQueryString(queryParams)
    const endpoint = `/posts${queryString ? `?${queryString}` : ''}`

    return this.request<V2PostListItem[]>(endpoint)
  }

  /**
   * Get single post by slug - Full content
   * 
   * @param slug Post slug
   * @param options Additional options
   * @returns Full post object with complete content
   * 
   * @example
   * ```typescript
   * const post = await client.getPost('my-article-slug', { lang: 'zh' })
   * ```
   */
  async getPost(
    slug: string,
    options: { lang?: SupportedLanguage } = {}
  ): Promise<V2Post> {
    if (!slug) {
      throw new Error('BlogFlow: Post slug is required')
    }

    const queryParams: Record<string, any> = {}
    if (options.lang !== undefined) {
      queryParams.lang = options.lang
    } else if (this.defaultLanguage) {
      queryParams.lang = this.defaultLanguage
    }

    const queryString = this.buildQueryString(queryParams)
    const endpoint = `/posts/${slug}${queryString ? `?${queryString}` : ''}`

    return this.request<V2Post>(endpoint)
  }
}
