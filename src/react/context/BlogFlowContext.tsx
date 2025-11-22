/**
 * BlogFlow React Context
 * Provides BlogFlow client instance to React components
 */

import { createContext, useContext, ReactNode, useMemo, useEffect } from 'react'
import { BlogFlow, BlogFlowConfig } from '../../core'
import { injectThemeStyles, removeThemeStyles, removeAllThemeStyles } from '../../styles'
import type { StylesConfig } from '../../styles/types'

interface BlogFlowContextValue {
  client: BlogFlow
}

const BlogFlowContext = createContext<BlogFlowContextValue | null>(null)

export interface BlogFlowProviderProps {
  config: BlogFlowConfig & {
    /**
     * Styling configuration
     * @default { theme: 'default', autoInject: true }
     */
    styles?: StylesConfig
  }
  children: ReactNode
}

/**
 * BlogFlowProvider - Provides BlogFlow client to child components
 * 
 * @example
 * ```tsx
 * import { BlogFlowProvider } from '@blogflow/sdk/react'
 * 
 * // Zero-config usage (default theme auto-injected)
 * function App() {
 *   return (
 *     <BlogFlowProvider config={{ apiKey: 'your-api-key' }}>
 *       <YourComponent />
 *     </BlogFlowProvider>
 *   )
 * }
 * 
 * // Custom theme
 * function App() {
 *   return (
 *     <BlogFlowProvider config={{ 
 *       apiKey: 'your-api-key',
 *       styles: { theme: 'dark' }
 *     }}>
 *       <YourComponent />
 *     </BlogFlowProvider>
 *   )
 * }
 * 
 * // Disable auto-inject (use external CSS)
 * function App() {
 *   return (
 *     <BlogFlowProvider config={{ 
 *       apiKey: 'your-api-key',
 *       styles: { theme: 'none' }
 *     }}>
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

  // Handle theme injection
  const stylesConfig = config.styles || {}
  const theme = stylesConfig.theme || 'default'
  const autoInject = stylesConfig.autoInject !== false // Default to true
  const themeVars = stylesConfig.themeVars

  useEffect(() => {
    if (!autoInject || theme === 'none') {
      // If disabled, remove all existing themes
      if (typeof document !== 'undefined') {
        removeAllThemeStyles()
      }
      return
    }

    // Inject theme styles (replaceExisting=true ensures old themes are removed)
    const styleId = injectThemeStyles(
      theme, 
      themeVars, 
      true,
      {
        cardBorderWidth: stylesConfig.cardBorderWidth,
        cardBorderRadius: stylesConfig.cardBorderRadius,
        cardBorderColor: stylesConfig.cardBorderColor,
        cardShadow: stylesConfig.cardShadow,
      }
    )

    // Cleanup on unmount
    return () => {
      if (styleId && typeof document !== 'undefined') {
        removeThemeStyles(styleId)
      }
    }
  }, [theme, autoInject, themeVars, stylesConfig.cardBorderWidth, stylesConfig.cardBorderRadius, stylesConfig.cardBorderColor, stylesConfig.cardShadow])

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

