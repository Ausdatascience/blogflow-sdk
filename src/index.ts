/**
 * BlogFlow SDK
 * TypeScript SDK for BlogFlow API Server v2
 * 
 * @example
 * ```typescript
 * import { BlogFlow, createClient } from '@blogflow/sdk'
 * 
 * // Create client
 * const client = new BlogFlow({
 *   apiKey: 'your-api-key',
 *   baseUrl: 'https://blogflow-api-server.vercel.app/api/v2',
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

// Export all types
export * from './types'

// Export client class
export { BlogFlow } from './client'

// Export factory function
import { BlogFlow } from './client'
import { BlogFlowConfig } from './types'

export const createClient = (config: BlogFlowConfig) => new BlogFlow(config)
