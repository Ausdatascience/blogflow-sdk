/**
 * BlogFlow SDK Type Definitions
 * Based on BlogFlow API Server v2
 */

// ============================================================================
// Language Types
// ============================================================================

export type SupportedLanguage = 'en' | 'zh' | 'es' | 'fr' | 'de' | 'ja' | 'ko'

// ============================================================================
// SDK Configuration
// ============================================================================

export interface BlogFlowConfig {
  /** API Key for authentication */
  apiKey: string
  /** Base URL of the API server (default: https://api.blogflow.com.au/api/v2) */
  baseUrl?: string
  /** Default language for requests */
  defaultLanguage?: SupportedLanguage
}

// ============================================================================
// API v2 Types
// ============================================================================

export type SearchField = 'title' | 'excerpt' | 'category' | 'slug'

// Next.js fetch cache options
export interface NextFetchOptions {
  /** Revalidate cache every N seconds (ISR) */
  revalidate?: number | false
  /** Tag for on-demand revalidation */
  tags?: string[]
}

export interface V2GetPostsParams {
  /** Language code */
  lang?: SupportedLanguage
  /** Number of posts to return (default: 20, max: 100) */
  limit?: number
  /** Pagination offset (default: 0) */
  offset?: number
  /** Sort field: 'id', 'created_at', 'updated_at' */
  sort?: 'id' | 'created_at' | 'updated_at'
  /** Sort order: 'asc' or 'desc' */
  order?: 'asc' | 'desc'
  /** Search keyword to filter posts */
  search?: string
  /** Fields to search in (default: ['title', 'excerpt', 'category']) */
  searchFields?: SearchField[]
  /** Next.js fetch cache options (for SSR/ISR) */
  next?: NextFetchOptions
  /** Standard fetch cache option */
  cache?: RequestCache
}

export interface V2GetPaginatedPostsParams extends V2GetPostsParams {
  /** 1-based page number (default: 1) */
  page?: number
  /** Page size (default: 12, max: 100). Alias for limit */
  pageSize?: number
}

export interface V2PaginatedPostsResponse {
  items: V2PostListItem[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface V2PostListItem {
  id: number
  title: string
  slug: string
  category?: string | null
  featured_image_url?: string | null
  created_at: string
  published_at?: string | null
  excerpt?: string | null
}

export interface V2Post {
  id: number
  title: string
  slug: string
  content: string
  excerpt?: string | null
  category?: string | null
  featured_image_url?: string | null
  featured_image_alt?: string | null
  seo_title?: string | null
  seo_description?: string | null
  created_at: string
  published_at?: string | null
}

export interface V2ErrorResponse {
  error: string
}

// ============================================================================
// Common Error Types
// ============================================================================

export class BlogFlowError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: string
  ) {
    super(message)
    this.name = 'BlogFlowError'
  }
}

export class BlogFlowAuthError extends BlogFlowError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401)
    this.name = 'BlogFlowAuthError'
  }
}

export class BlogFlowNotFoundError extends BlogFlowError {
  constructor(message: string = 'Resource not found') {
    super(message, 404)
    this.name = 'BlogFlowNotFoundError'
  }
}

export class BlogFlowServerError extends BlogFlowError {
  constructor(message: string = 'Server error', details?: string) {
    super(message, 500, details)
    this.name = 'BlogFlowServerError'
  }
}
