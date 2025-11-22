/**
 * BlogFlow SDK React
 * React hooks and components for BlogFlow
 */

// Context
export { BlogFlowProvider, useBlogFlowClient } from './context/BlogFlowContext'
export type { BlogFlowProviderProps } from './context/BlogFlowContext'

// Hooks
export { useBlogPosts } from './hooks/useBlogPosts'
export type { UseBlogPostsOptions, UseBlogPostsReturn } from './hooks/useBlogPosts'

export { useBlogPost } from './hooks/useBlogPost'
export type { UseBlogPostOptions, UseBlogPostReturn } from './hooks/useBlogPost'

export { useBlogSearch } from './hooks/useBlogSearch'
export type { UseBlogSearchOptions, UseBlogSearchReturn, SearchMode } from './hooks/useBlogSearch'

export { useServerSearch } from './hooks/useServerSearch'
export type { UseServerSearchOptions, UseServerSearchReturn } from './hooks/useServerSearch'

// Components
export { BlogPostCard } from './components/BlogPostCard'
export type { BlogPostCardProps } from './components/BlogPostCard'

export { BlogPostList } from './components/BlogPostList'
export type { BlogPostListProps } from './components/BlogPostList'

export { BlogSearch } from './components/BlogSearch'
export type { BlogSearchProps } from './components/BlogSearch'

export { Pagination } from './components/Pagination'
export type { PaginationProps, PaginationVariant } from './components/Pagination'

// Re-export core types for convenience
export type {
  V2PostListItem,
  V2Post,
  V2GetPostsParams,
  SupportedLanguage,
  BlogFlowConfig,
  SearchField,
} from '../core'

