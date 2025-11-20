# BlogFlow SDK

[![npm version](https://img.shields.io/npm/v/@blogflow/sdk.svg)](https://www.npmjs.com/package/@blogflow/sdk)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

TypeScript SDK for BlogFlow API Server v2 - A lightweight, high-performance client for fetching blog posts with **server-side search**, **Next.js ISR caching**, and **multilingual support**.

## ✨ Key Features (v0.4.1)

- 🚀 **Server-Side Search** - Search entire database, not just loaded posts (10-100x faster)
- ⚡ **Next.js ISR Caching** - Reduce API requests by 98%+ with Incremental Static Regeneration
- 🎯 **React Hooks** - `useBlogPosts`, `useBlogPost`, `useBlogSearch` with auto-debouncing
- 🌍 **Multilingual** - Support for 7 languages (en, zh, es, fr, de, ja, ko)
- 📦 **TypeScript First** - Full type safety with comprehensive type definitions
- 🎨 **Customizable Components** - Pre-built React components with `className` support
- 🔒 **SSR Ready** - Works in Node.js, Next.js server components, and browsers

## Installation

```bash
npm install @blogflow/sdk
# or
yarn add @blogflow/sdk
# or
pnpm add @blogflow/sdk
```

> 📖 **Documentation**:
> - [Complete Usage Guide](./USAGE.md)
> - [Caching & Performance Guide](./CACHING_GUIDE.md) - Reduce API pressure by 98%
> - [Server-Side Search Examples](./SERVER_SEARCH_EXAMPLE.md)
> - [Migration to v0.4.0](./MIGRATION_0.4.0.md)

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

### Core Client (Node.js / Next.js Server Components)

```typescript
import { BlogFlow } from '@blogflow/sdk/core'

// Create client
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

### React Hooks (Client Components)

```typescript
'use client'
import { BlogFlowProvider, useBlogPosts, useBlogSearch } from '@blogflow/sdk/react'

function App() {
  return (
    <BlogFlowProvider config={{ apiKey: process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY! }}>
      <PostsList />
      <SearchPage />
    </BlogFlowProvider>
  )
}

function PostsList() {
  const { posts, loading, error } = useBlogPosts({
    limit: 10,
    autoFetch: true
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

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

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Server-side search with auto-debouncing (v0.4.0+)
  const { results, loading } = useBlogSearch({
    searchTerm,
    debounceMs: 300
  })

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search posts..."
      />
      {loading && <p>Searching...</p>}
      {results.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

## 🚀 New in v0.4.1: Performance Features

### Server-Side Search (10-100x Faster)

**Problem:** Client-side filtering only searches loaded posts, missing results on other pages.

**Solution:** Server-side search queries entire database with database indexes.

```typescript
// ❌ Old way (v0.3.x) - Only searches current page
const { posts } = useBlogPosts({ limit: 10 })  // Only 10 posts loaded
const filtered = posts.filter(p => p.title.includes('react'))  // Misses page 2+

// ✅ New way (v0.4.0+) - Searches entire database
const { results, loading } = useBlogSearch({
  searchTerm: 'react'  // Searches all posts in database
})
```

**Performance:**
- 90% less data transfer
- 10-100x faster search with SQL indexes
- No browser lag with 1000+ posts

[📖 Full Server Search Guide](./SERVER_SEARCH_EXAMPLE.md)

---

### Next.js ISR Caching (98% API Reduction)

**Problem:** 1000 concurrent users = 1000 API requests → API overload

**Solution:** Next.js Incremental Static Regeneration caches responses.

```typescript
import { BlogFlow } from '@blogflow/sdk/core'

const client = new BlogFlow({ apiKey: process.env.BLOGFLOW_API_KEY! })

// Cache for 60 seconds (revalidate every minute)
const posts = await client.getPosts({
  limit: 10,
  next: { revalidate: 60 }  // ISR caching
})

// Cache single post for 1 hour
const post = await client.getPost('my-slug', {
  next: {
    revalidate: 3600,           // 1 hour cache
    tags: ['posts', 'my-slug']  // On-demand revalidation
  }
})
```

**Performance Impact:**

| Traffic | Without Cache | With ISR (60s) | API Savings |
|---------|---------------|----------------|-------------|
| 1,000 users/min | 1,000 API calls | ~17 API calls | **98.3%** |
| 10,000 users/min | 10,000 API calls | ~167 API calls | **98.3%** |
| 100,000 users/min | 100,000 API calls | ~1,667 API calls | **98.3%** |

**On-Demand Revalidation:**

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const { tag } = await request.json()
  revalidateTag(tag)  // Invalidate cache instantly
  return Response.json({ revalidated: true })
}
```

[📖 Full Caching Guide](./CACHING_GUIDE.md)

---

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
  search?: string                     // 🆕 Search keyword (v0.3.0+)
  searchFields?: SearchField[]        // 🆕 Fields to search (v0.3.0+)
  next?: NextFetchOptions             // 🆕 Next.js ISR cache (v0.4.1+)
  cache?: RequestCache                // 🆕 Standard fetch cache (v0.4.1+)
}

type SearchField = 'title' | 'excerpt' | 'category' | 'slug'

interface NextFetchOptions {
  revalidate?: number | false         // ISR revalidation in seconds
  tags?: string[]                     // Tags for on-demand revalidation
}
```

**Returns:** `Promise<V2PostListItem[]>`

**Examples:**
```typescript
// Basic usage
const posts = await client.getPosts({
  lang: 'zh',
  limit: 20,
  sort: 'created_at',
  order: 'desc'
})

// Server-side search (v0.3.0+)
const results = await client.getPosts({
  search: 'react',
  searchFields: ['title', 'excerpt']
})

// With ISR caching (v0.4.1+)
const cachedPosts = await client.getPosts({
  limit: 10,
  next: { revalidate: 60 }  // Cache for 60s
})

// With cache tags for on-demand revalidation
const taggedPosts = await client.getPosts({
  next: {
    revalidate: 3600,
    tags: ['posts', 'homepage']
  }
})

// No cache (always fresh)
const freshPosts = await client.getPosts({
  search: 'keyword',
  cache: 'no-store'
})
```

#### `getPost(slug, options?)`

Get a single post with full content by slug.

**Parameters:**
- `slug: string` - Post slug (required)
- `options?: GetPostOptions` - Optional configuration

```typescript
interface GetPostOptions {
  lang?: SupportedLanguage  // Language code
  next?: NextFetchOptions    // 🆕 Next.js ISR cache (v0.4.1+)
  cache?: RequestCache       // 🆕 Standard fetch cache (v0.4.1+)
}
```

**Returns:** `Promise<V2Post>`

**Examples:**
```typescript
// Basic usage
const post = await client.getPost('my-article-slug', {
  lang: 'zh'
})

// With ISR caching (v0.4.1+)
const cachedPost = await client.getPost('my-article-slug', {
  lang: 'zh',
  next: { revalidate: 3600 }  // Cache for 1 hour
})

// With cache tags for on-demand revalidation
const taggedPost = await client.getPost('my-article-slug', {
  next: {
    revalidate: 3600,
    tags: ['posts', 'my-article-slug']
  }
})

// No cache (always fresh)
const freshPost = await client.getPost('my-article-slug', {
  cache: 'no-store'
})
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

