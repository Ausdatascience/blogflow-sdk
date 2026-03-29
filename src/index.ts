/**
 * BlogFlow SDK
 * TypeScript SDK for BlogFlow API Server v2
 * 
 * Default entry point - re-exports core functionality
 * 
 * @example
 * ```typescript
 * import { BlogFlow, createClient } from '@blogflow/sdk'
 * 
 * // Create client
 * const client = new BlogFlow({
 *   apiKey: 'your-api-key',
 *   baseUrl: 'https://api2.blogflow.com.au/api/v2',
 *   defaultLanguage: 'zh'
 * })
 * 
 * // Or use factory function
 * const client = createClient({
 *   apiKey: 'your-api-key',
 *   defaultLanguage: 'zh'
 * })
 * 
 * // Get posts list
 * const posts = await client.getPosts({ lang: 'zh', limit: 20 })
 * 
 * // Get single post
 * const post = await client.getPost('my-article-slug', { lang: 'zh' })
 * ```
 */

// Re-export everything from core
export * from './core'
