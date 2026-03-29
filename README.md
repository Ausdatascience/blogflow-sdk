# BlogFlow SDK

[![npm version](https://img.shields.io/npm/v/@blogflow/sdk.svg)](https://www.npmjs.com/package/@blogflow/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![SSR Supported](https://img.shields.io/badge/SSR-Supported-green.svg)](https://nextjs.org/)

**The AI Content Engine for Next.js & React** - A lightweight, high-performance TypeScript SDK for BlogFlow API Server v2 with **server-side search**, **Next.js ISR caching**, and **multilingual support**.

*Built by [Ausdata Science](https://ausdata.ai) | Powered by [Ausdata Matrix](https://www.ausdata.app) & [Ausdata Lab](https://www.ausdata.org)*

## 🚀 v1.0.3 - Latest Release

**What's New in v1.0.3:**
- 🧩 **More Flexible BlogFlowUI**  
  - Added `showLanguageToggle` to control visibility of the language switcher in the search bar  
  - Added `showSearchBar` to completely hide or show the search bar  
  - Added `paginationPosition` (`'top' | 'bottom' | 'both'`) to control where pagination appears  
  - Added `defaultPaginationVariant` and documented all pagination styles
- 📖 **Improved Documentation**  
  - Updated README with full lists of themes, view modes, search options, and pagination variants  
  - Added practical configuration examples for common use cases (full search, no language toggle, no search bar)

## 🚀 Quick Start with BlogFlowUI

**The easiest way to get started** - one line of code for a complete blog interface!

```tsx
import { BlogFlowUI } from '@blogflow/sdk/react'

export default function BlogPage() {
  return <BlogFlowUI apiKey="your-api-key" />
}
```

That's it! You now have a fully functional blog with:
- ✅ 16 built-in themes with live preview
- ✅ 12 view modes (card, list, grid, magazine, etc.)
- ✅ Server-side & client-side search
- ✅ Multi-language support
- ✅ Complete pagination
- ✅ Responsive design

### Custom Configuration

```tsx
<BlogFlowUI
  apiKey="your-api-key"
  defaultLanguage="en"
  defaultTheme="dark"
  defaultViewMode="magazine"
  defaultSearchMode="server"
  defaultPaginationVariant="mixed"
  paginationPosition="bottom"
  pageSize={20}
  title="My Blog"
  showControlPanel={true}
  showCardOptions={true}
  showLanguageToggle={true}
  showSearchBar={true}
  onPostClick={(slug) => router.push(`/post/${slug}`)}
/>
```

### Minimal Version

```tsx
<BlogFlowUI
  apiKey="your-api-key"
  showControlPanel={false}
  showCardOptions={false}
  defaultTheme="minimal"
/>
```

### BlogFlowUI Props & Options

#### Core Props

- **apiKey** `string` (required): Your BlogFlow API key.
- **baseUrl** `string` (optional): Custom API base URL (default: `https://api2.blogflow.com.au/api/v2`).
- **defaultLanguage** `SupportedLanguage` (default: `'en'`):
  - Supported: `en`, `zh`, `es`, `fr`, `de`, `ja`, `ko`
- **title** `string` (default: `'Blog'`): Page title shown above the UI.
- **onPostClick** `(slug: string) => void` (optional): Custom handler when a post is clicked.
- **pageSize** `number` (default: `12`): Number of posts per page.
- **className** `string` (optional): Custom CSS class for the outer container.
- **style** `React.CSSProperties` (optional): Inline styles for the outer container.

#### Theme Options

- **defaultTheme** `string` (default: `'default'`):
  - Available themes:
    - `default`
    - `blue`
    - `minimal`
    - `modern`
    - `dark`
    - `magic`
    - `fantasy`
    - `adventure`
    - `tomorrow`
    - `mainstreet`
    - `eyecare`
    - `purewhite`
    - `pureblack`
    - `cyanblue`
    - `violet`
    - `cardinal`

#### View Modes

- **defaultViewMode** `ViewMode` (default: `'card'`):
  - Available view modes:
    - `card`
    - `list`
    - `grid`
    - `masonry`
    - `waterfall`
    - `magazine`
    - `dense`
    - `timeline`
    - `fullscreen`
    - `fast`
    - `modern`
    - `carousel`

#### Search

- **defaultSearchMode** `'server' | 'client'` (default: `'server'`):
  - **`server`**: Use server-side search via API (recommended, faster on large datasets).
  - **`client`**: Filter already-loaded posts in the browser.
- **showLanguageToggle** `boolean` (default: `true`):
  - Whether to show the language switcher button in the search bar.
- **showSearchBar** `boolean` (default: `true`):
  - Whether to show the entire search bar (search input, language toggle, result count).

**Common Search Configurations:**

- **Full search experience (default)**

  ```tsx
  <BlogFlowUI
    apiKey="your-api-key"
    defaultSearchMode="server"
    showSearchBar={true}
    showLanguageToggle={true}
  />
  ```

- **Hide language toggle, keep search input only**

  ```tsx
  <BlogFlowUI
    apiKey="your-api-key"
    showLanguageToggle={false}
  />
  ```

- **Hide search bar completely (pure article list / static blog page)**

  ```tsx
  <BlogFlowUI
    apiKey="your-api-key"
    showSearchBar={false}
  />
  ```

#### Pagination

- **defaultPaginationVariant** `PaginationVariant` (default: `'mixed'`):
  - Available variants:
    - `text`
    - `icon`
    - `mixed`
    - `simple`
- **paginationPosition** `'top' | 'bottom' | 'both'` (default: `'bottom'`):
  - `top`: Only show pagination above the posts.
  - `bottom`: Only show pagination below the posts.
  - `both`: Show pagination both above and below the posts.

#### UI Toggles

- **showControlPanel** `boolean` (default: `true`):
  - Show the top control panel (theme selector, view mode selector, search mode, pagination style).
- **showCardOptions** `boolean` (default: `true`):
  - Show the card display options (toggle excerpt, category, date).

## ✨ Key Features

- 🎁 **BlogFlowUI Component** - Complete blog interface in one line of code
- 🚀 **Server-Side Search** - Search entire database, not just loaded posts (10-100x faster)
- ⚡ **Next.js ISR Caching** - Reduce API requests by 98%+ with Incremental Static Regeneration
- 🔀 **Hybrid Architecture** - Server-side rendering (SSR) for SEO and performance, client-side for rich interactions
- 🏗️ **Production-Ready** - Powered by [Ausdata Matrix](https://www.ausdata.app) infrastructure for enterprise-grade reliability
- 🎯 **React Hooks** - `useBlogPosts`, `useBlogPost`, `useBlogSearch` with auto-debouncing
- 🌍 **Multilingual** - Multiple languages support (en, zh, es, fr, de, ja, ko)
- 📦 **TypeScript First** - Full type safety with comprehensive type definitions
- 🎨 **Built-in Themes** - 16 beautiful themes with zero-config styling
- 🎭 **Auto-Inject Styles** - Automatic CSS injection, no manual imports needed
- 🔧 **Fully Customizable** - Pre-built React components with `className` support
- 🔒 **SSR Ready** - Works in Node.js, Next.js server components, and browsers
- 📄 **Pagination Support** - Built-in pagination with `getPaginatedPosts` and pagination components

## Changelog

### v1.0.4
- 🔄 **API Base URL Update** - Default API base URL updated to `https://api2.blogflow.com.au/api/v2`
- 📝 **Documentation Sync** - Updated examples and configuration docs to use `api2` endpoint consistently

### v1.0.2
- 🔄 **Updated API Endpoint** - Changed default API base URL to `https://api2.blogflow.com.au/api/v2`

### v1.0.1
- 🐛 **Fixed Infinite Loop Issues** - Resolved React hooks dependency issues in `useBlogPosts`, `useBlogSearch`, and `useServerSearch` that caused "Maximum update depth exceeded" errors
- 🔧 **Performance Improvements** - Optimized useEffect dependencies using refs to prevent unnecessary re-renders
- ✨ **Stability Enhancements** - Improved state management and page update logic

### v1.0.0
- 🎁 **BlogFlowUI Component** - Complete blog interface in one line of code
- 🚀 **Server-Side Search** - High-performance search across entire datasets
- ⚡ **Next.js ISR Caching** - Built-in support for Incremental Static Regeneration
- 🔀 **Hybrid Architecture** - Server-side and client-side rendering support
- 🎨 **16 Built-in Themes** - Beautiful themes with zero-config styling

## System Requirements

### Runtime Requirements

- **Node.js**: >= 18.0.0 (for server-side usage)
- **React**: >= 16.8.0 (for React hooks and components)
- **React DOM**: >= 16.8.0 (for React components)

### Browser Compatibility

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **ES Modules**: Required for ESM builds
- **Fetch API**: Required (native in Node.js 18+ and modern browsers)

### Framework Support

- **Next.js**: >= 13.0.0 (App Router and Pages Router)
- **Vite**: >= 4.0.0
- **Create React App**: >= 5.0.0
- **Remix**: >= 1.0.0

### TypeScript

- **TypeScript**: >= 4.5.0 (optional, but recommended for type safety)

## Installation

```bash
npm install @blogflow/sdk
# or
yarn add @blogflow/sdk
# or
pnpm add @blogflow/sdk
```

## Quick Start

### Hybrid Mode: Server Component + Client Component (Recommended)

The recommended pattern for v1.0.0 is to fetch data in Server Components and pass it to Client Components for rendering:

```typescript
// app/blog/page.tsx (Server Component)
import { createClient } from '@blogflow/sdk/core'
import { BlogPostList } from '@blogflow/sdk/react'

export default async function BlogPage() {
  const client = createClient({ 
    apiKey: process.env.BLOGFLOW_API_KEY! 
  })
  
  // Fetch data on server with ISR caching
  const posts = await client.getPosts({ 
    limit: 20,
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  
  // Pass data to client component
  return <BlogPostList posts={posts} />
}
```

### Core Client (Node.js / Next.js Server Components)

For server-side only usage:

```typescript
import { BlogFlow } from '@blogflow/sdk/core'

// Create client
const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!,
  defaultLanguage: 'en'
})

// Get posts list
const posts = await client.getPosts({
  lang: 'en',
  limit: 20,
  offset: 0
})

// Get paginated posts with metadata
const paginated = await client.getPaginatedPosts({
  lang: 'en',
  page: 1,
  pageSize: 20
})

// Get single post
const post = await client.getPost('my-article-slug', {
  lang: 'en'
})
```

### React Hooks (Client Components)

```typescript
'use client'
import { BlogFlowProvider, useBlogPosts, useBlogPost, useBlogSearch } from '@blogflow/sdk/react'

function App() {
  return (
    <BlogFlowProvider config={{ apiKey: process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY! }}>
      <PostsList />
      <PostDetail slug="my-article" />
      <SearchPage />
    </BlogFlowProvider>
  )
}

function PostsList() {
  const { posts, loading, error, totalPages, currentPage, fetchPage } = useBlogPosts({
    lang: 'en',
    pageSize: 20,
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
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button key={page} onClick={() => fetchPage(page)}>
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}

function PostDetail({ slug }: { slug: string }) {
  const { post, loading, error } = useBlogPost(slug, {
    lang: 'en'
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!post) return <p>Post not found</p>

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Server-side search with auto-debouncing
  const { results, loading, totalCount } = useBlogSearch({
    searchTerm,
    debounceMs: 300,
    lang: 'en'
  })

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search posts..."
      />
      {loading && <p>Searching...</p>}
      <p>Found {totalCount} results</p>
      {results.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

## Styling

### Zero-Config Usage (Default Theme)

BlogFlow SDK includes automatic style injection with 16 built-in themes.

```tsx
import { BlogFlowProvider, BlogPostList } from '@blogflow/sdk/react'

<BlogFlowProvider config={{ apiKey: 'your-key' }}>
  <BlogPostList posts={posts} />  {/* ✅ Styled automatically! */}
</BlogFlowProvider>
```

### Choose a Theme

```tsx
<BlogFlowProvider config={{ 
  apiKey: 'your-key',
  styles: { theme: 'cardinal' }  // 'default' | 'minimal' | 'modern' | 'dark' | 'magic' | 'violet' | 'cardinal' | etc.
}}>
  <BlogPostList posts={posts} />
</BlogFlowProvider>
```

### Use External CSS (Better Performance)

```tsx
import '@blogflow/sdk/styles/default.css'  // Import once

<BlogFlowProvider config={{ 
  apiKey: 'your-key',
  styles: { theme: 'none' }  // Disable auto-inject
}}>
  <BlogPostList posts={posts} />
</BlogFlowProvider>
```

### Custom Styling

```tsx
<BlogFlowProvider config={{ 
  apiKey: 'your-key',
  styles: { 
    theme: 'default',
    themeVars: {
      primaryColor: '#ff6b6b',
      borderRadius: '12px'
    }
  }
}}>
  <BlogPostList posts={posts} />
</BlogFlowProvider>
```

## Configuration

### Setting API Key

#### Environment Variables (Recommended for Production)

**For Server-Side (Next.js, Node.js):**

Create a `.env.local` file:

```bash
BLOGFLOW_API_KEY=your-api-key-here
BLOGFLOW_API_URL=https://api2.blogflow.com.au/api/v2  # optional
```

```typescript
import { BlogFlow } from '@blogflow/sdk/core'

const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!,
  baseUrl: process.env.BLOGFLOW_API_URL,
  defaultLanguage: 'en'
})
```

**For Client-Side (React):**

```bash
NEXT_PUBLIC_BLOGFLOW_API_KEY=your-api-key-here
```

```typescript
import { BlogFlowProvider } from '@blogflow/sdk/react'

<BlogFlowProvider config={{ 
  apiKey: process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY! 
}}>
  {/* Your components */}
</BlogFlowProvider>
```

> ⚠️ **Security Note:** Never expose your API key in client-side code if it's sensitive. Consider using a proxy API route in Next.js to keep the key secure.

#### Direct Configuration

```typescript
import { BlogFlow, createClient } from '@blogflow/sdk/core'

const client = new BlogFlow({
  apiKey: 'your-api-key-here',
  baseUrl: 'https://api2.blogflow.com.au/api/v2',
  defaultLanguage: 'en'
})

// Or use factory function
const client = createClient({
  apiKey: 'your-api-key-here',
  defaultLanguage: 'en'
})
```

## Next.js ISR Caching

Significantly reduce API requests with Incremental Static Regeneration.

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

| Traffic | Without Cache | With ISR (60s) |
|---------|---------------|----------------|
| 1,000 users/min | 1,000 API calls | ~17 API calls |
| 10,000 users/min | 10,000 API calls | ~167 API calls |

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

## API Reference

### Configuration

```typescript
interface BlogFlowConfig {
  apiKey: string                    // Required: Your API key
  baseUrl?: string                  // Optional: API base URL
  defaultLanguage?: SupportedLanguage // Optional: Default language
}
```

### Core Client Methods

#### `getPosts(params?)`

Get a list of posts with minimal fields.

```typescript
const posts = await client.getPosts({
  lang: 'en',
  limit: 20,
  offset: 0,
  sort: 'created_at',
  order: 'desc',
  search: 'react',
  searchFields: ['title', 'excerpt'],
  next: { revalidate: 60 },
  cache: 'no-store'
})
```

#### `getPaginatedPosts(params?)`

Get paginated posts with metadata (total count, total pages).

```typescript
const response = await client.getPaginatedPosts({
  lang: 'en',
  page: 1,
  pageSize: 20,
  sort: 'created_at',
  order: 'desc',
  search: 'react',
  next: { revalidate: 60 }
})

// Response:
// {
//   items: V2PostListItem[],
//   page: number,
//   pageSize: number,
//   totalCount: number,
//   totalPages: number,
//   hasNextPage: boolean,
//   hasPreviousPage: boolean
// }
```

#### `getPost(slug, options?)`

Get a single post with full content by slug.

```typescript
const post = await client.getPost('my-article-slug', {
  lang: 'en',
  next: { revalidate: 3600 },
  cache: 'no-store'
})
```

### React Hooks

#### `useBlogPosts(options?)`

Fetch and manage blog posts with pagination. **Now supports server-side search** - when `search` parameter is provided, it sends API requests instead of client-side filtering.

```typescript
const { 
  posts, 
  loading, 
  error, 
  hasMore, 
  totalCount, 
  currentPage, 
  totalPages,
  loadMore,
  refresh,
  fetchPage
} = useBlogPosts({
  lang: 'en',
  page: 1,
  pageSize: 20,
  search: 'react', // Server-side search (v1.0.0+)
  sort: 'created_at',
  order: 'desc',
  autoFetch: true
})
```

#### `useBlogPost(slug, options?)`

Fetch a single post by slug.

```typescript
const { post, loading, error, refresh } = useBlogPost('my-slug', {
  lang: 'en'
})
```

#### `useBlogSearch(options)`

Server-side search with auto-debouncing.

```typescript
const { 
  results, 
  loading, 
  error, 
  totalCount,
  page,
  totalPages,
  hasNextPage,
  setPage
} = useBlogSearch({
  searchTerm: 'react',
  debounceMs: 300,
  lang: 'en',
  limit: 20,
  sort: 'created_at',
  order: 'desc'
})
```

### React Components

#### Pre-built Components

All components support `className` for custom styling and can be used in both Server and Client Components:

- `BlogPostCard` - Single post card
- `BlogPostList` - List of posts (supports `posts` prop for server-rendered data)
- `BlogPostWaterfall` - Waterfall layout
- `BlogPostMagazine` - Magazine layout
- `BlogPostDense` - Dense list layout
- `BlogPostTimeline` - Timeline layout
- `BlogPostFullscreen` - Fullscreen layout
- `BlogPostFast` - Fast loading layout
- `BlogPostModern` - Modern layout
- `BlogPostCarousel` - Carousel layout
- `BlogSearch` - Search component (with server-side search support)
- `Pagination` - Pagination controls

**Custom Styling with `className`:**

All components accept `className` prop for custom styling:

```tsx
import { BlogPostList, Pagination } from '@blogflow/sdk/react'

<BlogPostList 
  posts={posts} 
  className="my-custom-class"
  onPostClick={(slug) => router.push(`/posts/${slug}`)}
/>

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={fetchPage}
  className="my-pagination"
/>
```

## Type Definitions

### V2PostListItem

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

### Supported Languages

- `en` - English
- `zh` - Chinese
- `es` - Spanish
- `fr` - French
- `de` - German
- `ja` - Japanese
- `ko` - Korean

## Error Handling

```typescript
import { 
  BlogFlowError,
  BlogFlowAuthError,
  BlogFlowNotFoundError,
  BlogFlowServerError
} from '@blogflow/sdk/core'

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

## Examples

### Next.js App Router (Server Component)

```typescript
// app/posts/page.tsx
import { BlogFlow } from '@blogflow/sdk/core'

const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!,
  defaultLanguage: 'en'
})

export default async function PostsPage() {
  const posts = await client.getPosts({ 
    limit: 10,
    next: { revalidate: 60 }
  })
  
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

```typescript
// app/api/posts/route.ts
import { BlogFlow } from '@blogflow/sdk/core'
import { NextResponse } from 'next/server'

const client = new BlogFlow({
  apiKey: process.env.BLOGFLOW_API_KEY!,
  defaultLanguage: 'en'
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '20')
  const lang = searchParams.get('lang') as any || 'en'
  
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

### React Client Component with Hooks

```typescript
'use client'

import { BlogFlowProvider, useBlogPosts, BlogPostList } from '@blogflow/sdk/react'

export default function PostsPage() {
  return (
    <BlogFlowProvider config={{ 
      apiKey: process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY!,
      styles: { theme: 'default' }
    }}>
      <PostsList />
    </BlogFlowProvider>
  )
}

function PostsList() {
  const { posts, loading, error, totalPages, currentPage, fetchPage } = useBlogPosts({
    lang: 'en',
    pageSize: 20
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <BlogPostList posts={posts} />
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button 
            key={page} 
            onClick={() => fetchPage(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}
```

## Package Exports

The SDK provides multiple entry points for tree-shaking:

```typescript
// Core client (Node.js, SSR)
import { BlogFlow } from '@blogflow/sdk/core'

// React hooks and components
import { BlogFlowProvider, useBlogPosts } from '@blogflow/sdk/react'

// Default export (re-exports core)
import { BlogFlow } from '@blogflow/sdk'

// Theme CSS files
import '@blogflow/sdk/styles/default.css'
```

## License

MIT

---

## Author & Support

**Author:** [Ausdata Science Pty Ltd](https://ausdata.ai)  
**Support:** [Ausdata Lab](https://www.ausdata.org) | [Ausdata Matrix](https://www.ausdata.app)
