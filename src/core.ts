/**
 * BlogFlow SDK Core
 * Pure core logic without UI dependencies
 * 
 * @example
 * ```typescript
 * import { BlogFlow, createClient } from '@blogflow/sdk/core'
 * 
 * const client = new BlogFlow({
 *   apiKey: 'your-api-key',
 *   defaultLanguage: 'zh'
 * })
 * ```
 */

// Export all types
export * from './types'

// Export client class
export { BlogFlow } from './core/client'

// Export factory function
import { BlogFlow } from './core/client'
import { BlogFlowConfig } from './types'

export const createClient = (config: BlogFlowConfig) => new BlogFlow(config)

