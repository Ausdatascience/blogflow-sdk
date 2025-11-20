# BlogFlow SDK

TypeScript SDK for BlogFlow API Server v2 - A lightweight client for fetching blog posts with multilingual support.

## Installation

```bash
npm install @blogflow/sdk
# or
yarn add @blogflow/sdk
# or
pnpm add @blogflow/sdk
```

> 📖 **Detailed Usage Guide**: See [USAGE.md](./USAGE.md) for complete usage examples and best practices

## Getting Your API Key

Before using the SDK, you need to obtain an API key from your BlogFlow API Server. Contact your administrator or check your BlogFlow dashboard to get your API key.

## Configuration

### Setting API Key

The API key can be set in several ways depending on your use case:

#### 1. Environment Variables (Recommended for Production)

**For Server-Side (Next.js, Node.js):**

Create a `.env.local` file in your project root:

```bash
# .env.local
BLOGFLOW_API_KEY=your-api-key-here
BLOGFLOW_API_URL=https://blogflow-api-server.vercel.app/api/v2  # optional
```

Then use it in your code:

```typescript
import { BlogFlow } from '@blogflow/sdk'

const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!,
  baseUrl: process.env.BLOGFLOW_API_URL, // optional
  defaultLanguage: 'zh'
})
```

**For Client-Side (React, Vue, etc.):**

Create a `.env.local` file with `NEXT_PUBLIC_` prefix (for Next.js):

```bash
# .env.local
NEXT_PUBLIC_BLOGFLOW_API_KEY=your-api-key-here
```

```typescript
import { BlogFlow } from '@blogflow/sdk'

const client = new BlogFlow({
  apiKey: process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY!,
  defaultLanguage: 'zh'
})
```

> ⚠️ **Security Note:** Never expose your API key in client-side code if it's sensitive. Consider using a proxy API route in Next.js to keep the key secure.

#### 2. Direct Configuration (For Testing/Development)

```typescript
import { BlogFlow, createClient } from '@blogflow/sdk'

// Direct configuration
const client = new BlogFlow({
  apiKey: 'your-api-key-here',
  baseUrl: 'https://blogflow-api-server.vercel.app/api/v2', // optional
  defaultLanguage: 'zh' // optional
})

// Or use factory function
const client = createClient({
  apiKey: 'your-api-key-here',
  defaultLanguage: 'zh'
})
```

#### 3. Configuration File (For Complex Setups)

Create a config file:

```typescript
// config/blogflow.ts
import { BlogFlowConfig } from '@blogflow/sdk'

export const blogflowConfig: BlogFlowConfig = {
  apiKey: process.env.BLOGFLOW_API_KEY!,
  baseUrl: process.env.BLOGFLOW_API_URL || 'https://blogflow-api-server.vercel.app/api/v2',
  defaultLanguage: 'zh'
}
```

Then import and use:

```typescript
import { BlogFlow } from '@blogflow/sdk'
import { blogflowConfig } from './config/blogflow'

const client = new BlogFlow(blogflowConfig)
```

## Quick Start

```typescript
import { BlogFlow, createClient } from '@blogflow/sdk'

// Create client (using environment variable)
const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!,
  defaultLanguage: 'zh'
})

// Get posts list
const posts = await client.getPosts({ 
  lang: 'zh', 
  limit: 20, 
  offset: 0 
})

// Get single post
const post = await client.getPost('my-article-slug', { 
  lang: 'zh' 
})
```

## API Reference

### Configuration

```typescript
interface BlogFlowConfig {
  apiKey: string                    // Required: Your API key
  baseUrl?: string                   // Optional: API base URL (default: https://blogflow-api-server.vercel.app/api/v2)
  defaultLanguage?: SupportedLanguage // Optional: Default language for requests
}
```

### Methods

#### `getPosts(params?)`

Get a list of posts with minimal fields (optimized for performance).

**Parameters:**
```typescript
interface V2GetPostsParams {
  lang?: SupportedLanguage           // Language code (en, zh, es, fr, de, ja, ko)
  limit?: number                      // Number of posts (default: 20, max: 100)
  offset?: number                     // Pagination offset (default: 0)
  sort?: 'id' | 'created_at' | 'updated_at'  // Sort field (default: 'id')
  order?: 'asc' | 'desc'             // Sort order (default: 'desc')
}
```

**Returns:** `Promise<V2PostListItem[]>`

**Example:**
```typescript
// Get latest 20 posts in Chinese
const posts = await client.getPosts({ 
  lang: 'zh', 
  limit: 20, 
  offset: 0,
  sort: 'created_at',
  order: 'desc'
})

// Get posts sorted by ID descending (default)
const posts = await client.getPosts({ limit: 10 })
```

#### `getPost(slug, options?)`

Get a single post with full content by slug.

**Parameters:**
- `slug: string` - Post slug (required)
- `options?: { lang?: SupportedLanguage }` - Optional language

**Returns:** `Promise<V2Post>`

**Example:**
```typescript
// Get post in Chinese
const post = await client.getPost('my-article-slug', { lang: 'zh' })

// Get post using default language
const post = await client.getPost('my-article-slug')
```

## Type Definitions

### V2PostListItem

Minimal post data returned from `getPosts()`:

```typescript
interface V2PostListItem {
  id: number
  title: string
  slug: string
  category?: string | null
  featured_image_url?: string | null
  created_at: string
  excerpt?: string | null
}
```

### V2Post

Full post data returned from `getPost()`:

```typescript
interface V2Post {
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
}
```

## Error Handling

The SDK provides custom error classes for different error scenarios:

```typescript
import { 
  BlogFlowError,
  BlogFlowAuthError,
  BlogFlowNotFoundError,
  BlogFlowServerError
} from '@blogflow/sdk'

try {
  const post = await client.getPost('my-slug')
} catch (error) {
  if (error instanceof BlogFlowAuthError) {
    // 401: Invalid or missing API key
    console.error('Authentication failed')
  } else if (error instanceof BlogFlowNotFoundError) {
    // 404: Post not found
    console.error('Post not found')
  } else if (error instanceof BlogFlowServerError) {
    // 500: Server error
    console.error('Server error:', error.details)
  } else if (error instanceof BlogFlowError) {
    // Other errors
    console.error('Error:', error.message, error.statusCode)
  }
}
```

## Supported Languages

- `en` - English
- `en` - English
- `zh` - Chinese
- `es` - Spanish
- `fr` - French
- `de` - German
- `ja` - Japanese
- `ko` - Korean

## Examples

### Next.js App Router (Server Component)

```typescript
// app/posts/page.tsx
import { BlogFlow } from '@blogflow/sdk'

// Create client instance (server-side only)
const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!, // From .env.local
  defaultLanguage: 'zh'
})

export default async function PostsPage() {
  const posts = await client.getPosts({ limit: 10 })
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

### Next.js API Route (Recommended for Security)

For better security, create an API route to proxy requests:

```typescript
// app/api/posts/route.ts
import { BlogFlow } from '@blogflow/sdk'
import { NextResponse } from 'next/server'

const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!, // Server-side only
  defaultLanguage: 'zh'
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '20')
  const lang = searchParams.get('lang') as any || 'zh'
  
  try {
    const posts = await client.getPosts({ limit, lang })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
```

Then call from client:

```typescript
// Client component
const response = await fetch('/api/posts?limit=10&lang=zh')
const posts = await response.json()
```

### React Client Component

**Option 1: Using Environment Variable (Less Secure)**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { BlogFlow, V2PostListItem } from '@blogflow/sdk'

export function PostsList() {
  const [posts, setPosts] = useState<V2PostListItem[]>([])
  
  useEffect(() => {
    const client = new BlogFlow({
      apiKey: process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY!,
      defaultLanguage: 'zh'
    })
    
    client.getPosts({ limit: 10 })
      .then(setPosts)
      .catch(console.error)
  }, [])
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

**Option 2: Using API Route (Recommended - More Secure)**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { V2PostListItem } from '@blogflow/sdk'

export function PostsList() {
  const [posts, setPosts] = useState<V2PostListItem[]>([])
  
  useEffect(() => {
    fetch('/api/posts?limit=10&lang=zh')
      .then(res => res.json())
      .then(setPosts)
      .catch(console.error)
  }, [])
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

## License

ISC

---

## Author & Support

**Author:** [Ausdata Science Pty Ltd](https://ausdata.ai)  
**Support:** [Ausdata Lab](https://ausdata.org)

