# Usage Guide

This guide explains how to use `@blogflow/sdk` in your project.

## Installation

```bash
npm install @blogflow/sdk
# or
yarn add @blogflow/sdk
# or
pnpm add @blogflow/sdk
```

## Basic Usage

### 1. Import SDK

```typescript
import { BlogFlow, createClient } from '@blogflow/sdk'
```

### 2. Create Client

#### Method 1: Using Constructor

```typescript
import { BlogFlow } from '@blogflow/sdk'

const client = new BlogFlow({
  apiKey: 'your-api-key-here',
  baseUrl: 'https://blogflow-api-server.vercel.app/api/v2', // optional, this is the default
  defaultLanguage: 'en' // optional, default language
})
```

#### Method 2: Using Factory Function

```typescript
import { createClient } from '@blogflow/sdk'

const client = createClient({
  apiKey: 'your-api-key-here',
  defaultLanguage: 'en'
})
```

### 3. Use API

```typescript
// Get posts list
const posts = await client.getPosts({ 
  lang: 'en', 
  limit: 20, 
  offset: 0 
})

// Get single post
const post = await client.getPost('my-article-slug', { 
  lang: 'en' 
})
```

## Real Project Examples

### Next.js App Router (Server Component)

```typescript
// app/posts/page.tsx
import { BlogFlow } from '@blogflow/sdk'

// Create client instance (server-side)
const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!,
  defaultLanguage: 'en'
})

export default async function PostsPage() {
  // Get posts list
  const posts = await client.getPosts({ limit: 10 })
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <img src={post.featured_image_url || ''} alt={post.title} />
          <p>Published: {new Date(post.created_at).toLocaleDateString()}</p>
        </article>
      ))}
    </div>
  )
}
```

### Next.js Single Post Page

```typescript
// app/posts/[slug]/page.tsx
import { BlogFlow } from '@blogflow/sdk'
import { notFound } from 'next/navigation'

const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!,
  defaultLanguage: 'en'
})

export default async function PostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  try {
    const post = await client.getPost(params.slug, { lang: 'en' })
    
    return (
      <article>
        <h1>{post.title}</h1>
        {post.featured_image_url && (
          <img 
            src={post.featured_image_url} 
            alt={post.featured_image_alt || post.title} 
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <p>Category: {post.category}</p>
        <p>Published: {new Date(post.created_at).toLocaleDateString()}</p>
      </article>
    )
  } catch (error) {
    notFound()
  }
}
```

### Next.js API Route (Recommended for Client Security)

```typescript
// app/api/posts/route.ts
import { BlogFlow } from '@blogflow/sdk'
import { NextResponse } from 'next/server'

const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!, // Server-side environment variable
  defaultLanguage: 'en'
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '20')
  const lang = searchParams.get('lang') || 'en'
  const offset = parseInt(searchParams.get('offset') || '0')
  
  try {
    const posts = await client.getPosts({ limit, lang, offset })
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
// app/posts/page.tsx (Client Component)
'use client'

import { useEffect, useState } from 'react'
import { V2PostListItem } from '@blogflow/sdk'

export default function PostsPage() {
  const [posts, setPosts] = useState<V2PostListItem[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('/api/posts?limit=10&lang=en')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

### React Client Component (Direct Usage)

```typescript
'use client'

import { useEffect, useState } from 'react'
import { BlogFlow, V2PostListItem } from '@blogflow/sdk'

export function PostsList() {
  const [posts, setPosts] = useState<V2PostListItem[]>([])
  
  useEffect(() => {
    const client = new BlogFlow({
      apiKey: process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY!,
      defaultLanguage: 'en'
    })
    
    client.getPosts({ limit: 10 })
      .then(setPosts)
      .catch(console.error)
  }, [])
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  )
}
```

### Error Handling

```typescript
import { 
  BlogFlow,
  BlogFlowError,
  BlogFlowAuthError,
  BlogFlowNotFoundError 
} from '@blogflow/sdk'

const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!,
})

try {
  const post = await client.getPost('my-slug')
} catch (error) {
  if (error instanceof BlogFlowAuthError) {
    // 401: Invalid API key
    console.error('Authentication failed, please check API key')
  } else if (error instanceof BlogFlowNotFoundError) {
    // 404: Post not found
    console.error('Post not found')
  } else if (error instanceof BlogFlowError) {
    // Other errors
    console.error('Error:', error.message)
  }
}
```

### Pagination

```typescript
const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!,
})

// First page
const page1 = await client.getPosts({ limit: 20, offset: 0 })

// Second page
const page2 = await client.getPosts({ limit: 20, offset: 20 })

// Third page
const page3 = await client.getPosts({ limit: 20, offset: 40 })
```

### Sorting

```typescript
// Sort by created_at descending (newest first)
const latestPosts = await client.getPosts({
  sort: 'created_at',
  order: 'desc',
  limit: 10
})

// Sort by ID descending (default)
const postsById = await client.getPosts({
  sort: 'id',
  order: 'desc',
  limit: 10
})

// Sort by updated_at descending
const updatedPosts = await client.getPosts({
  sort: 'updated_at',
  order: 'desc',
  limit: 10
})
```

### Multilingual Support

```typescript
const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!,
  defaultLanguage: 'en' // Set default language
})

// Use default language (English)
const postsEn = await client.getPosts()

// Specify Chinese
const postsZh = await client.getPosts({ lang: 'zh' })

// Specify other languages
const postsEs = await client.getPosts({ lang: 'es' })
const postsFr = await client.getPosts({ lang: 'fr' })
```

### Complete Example: Blog Homepage

```typescript
// app/page.tsx
import { BlogFlow } from '@blogflow/sdk'
import Link from 'next/link'

const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!,
  defaultLanguage: 'en'
})

export default async function HomePage() {
  // Get latest 6 posts
  const posts = await client.getPosts({
    limit: 6,
    sort: 'created_at',
    order: 'desc'
  })
  
  return (
    <div>
      <h1>Latest Posts</h1>
      <div className="posts-grid">
        {posts.map(post => (
          <article key={post.id} className="post-card">
            <Link href={`/posts/${post.slug}`}>
              {post.featured_image_url && (
                <img 
                  src={post.featured_image_url} 
                  alt={post.title}
                  className="post-image"
                />
              )}
              <h2>{post.title}</h2>
              {post.excerpt && <p>{post.excerpt}</p>}
              {post.category && <span className="category">{post.category}</span>}
              <time>{new Date(post.created_at).toLocaleDateString()}</time>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
```

## Environment Variables Configuration

### .env.local

```bash
# Server-side usage
BLOGFLOW_API_KEY=your-api-key-here

# Client-side usage (Next.js)
NEXT_PUBLIC_BLOGFLOW_API_KEY=your-api-key-here
```

### Using in Code

```typescript
// Server-side
const apiKey = process.env.BLOGFLOW_API_KEY!

// Client-side (Next.js)
const apiKey = process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY!
```

## TypeScript Type Support

The SDK provides complete TypeScript type definitions:

```typescript
import type { 
  V2PostListItem,
  V2Post,
  V2GetPostsParams,
  SupportedLanguage 
} from '@blogflow/sdk'

// Type-safe usage
const posts: V2PostListItem[] = await client.getPosts()
const post: V2Post = await client.getPost('slug')
const lang: SupportedLanguage = 'en'
```

## Best Practices

1. **Server-side First**: In Next.js, prefer Server Components or API Routes
2. **Environment Variables**: Use environment variables to store API keys, don't hardcode them
3. **Error Handling**: Always use try-catch for error handling
4. **Type Safety**: Make full use of TypeScript type definitions
5. **Caching Strategy**: In Next.js, you can use `revalidate` for caching

## More Examples

See [README.md](./README.md) for more detailed documentation and examples.
