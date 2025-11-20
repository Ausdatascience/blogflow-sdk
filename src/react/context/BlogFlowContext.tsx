/**
 * BlogFlow React Context
 * Provides BlogFlow client instance to React components
 */

import { createContext, useContext, ReactNode, useMemo } from 'react'
import { BlogFlow, BlogFlowConfig } from '../../core'

interface BlogFlowContextValue {
  client: BlogFlow
}

const BlogFlowContext = createContext<BlogFlowContextValue | null>(null)

export interface BlogFlowProviderProps {
  config: BlogFlowConfig
  children: ReactNode
}

/**
 * BlogFlowProvider - Provides BlogFlow client to child components
 * 
 * @example
 * ```tsx
 * import { BlogFlowProvider } from '@blogflow/sdk/react'
 * 
 * function App() {
 *   return (
 *     <BlogFlowProvider config={{ apiKey: 'your-api-key' }}>
 *       <YourComponent />
 *     </BlogFlowProvider>
 *   )
 * }
 * ```
 */
export function BlogFlowProvider({ config, children }: BlogFlowProviderProps) {
  const client = useMemo(
    () =>
      new BlogFlow({
        apiKey: config.apiKey,
        baseUrl: config.baseUrl,
        defaultLanguage: config.defaultLanguage,
      }),
    [config.apiKey, config.baseUrl, config.defaultLanguage]
  )

  return (
    <BlogFlowContext.Provider value={{ client }}>
      {children}
    </BlogFlowContext.Provider>
  )
}

/**
 * useBlogFlowClient - Hook to access BlogFlow client from context
 * 
 * @throws Error if used outside BlogFlowProvider
 * 
 * @example
 * ```tsx
 * const client = useBlogFlowClient()
 * const posts = await client.getPosts()
 * ```
 */
export function useBlogFlowClient(): BlogFlow {
  const context = useContext(BlogFlowContext)
  if (!context) {
    throw new Error('useBlogFlowClient must be used within BlogFlowProvider')
  }
  return context.client
}

