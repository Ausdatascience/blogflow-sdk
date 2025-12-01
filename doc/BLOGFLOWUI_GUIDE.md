# BlogFlowUI Component Guide

Complete guide for using the `BlogFlowUI` component - the easiest way to add a blog to your application.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Examples](#examples)
- [Customization](#customization)
- [Best Practices](#best-practices)
- [FAQ](#faq)

## Overview

`BlogFlowUI` is a complete, ready-to-use blog interface component that includes:

- ✅ 16 built-in themes
- ✅ 12 view modes
- ✅ Server-side & client-side search
- ✅ Multi-language support
- ✅ Complete pagination
- ✅ Responsive design
- ✅ Accessibility features

## Quick Start

### Basic Usage

```tsx
import { BlogFlowUI } from '@blogflow/sdk/react'

export default function BlogPage() {
  return <BlogFlowUI apiKey="your-api-key" />
}
```

### With Next.js App Router

```tsx
// app/blog/page.tsx
'use client'

import { BlogFlowUI } from '@blogflow/sdk/react'

export default function BlogPage() {
  return (
    <BlogFlowUI
      apiKey={process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY!}
      defaultLanguage="en"
      title="Our Blog"
    />
  )
}
```

### With Next.js Pages Router

```tsx
// pages/blog.tsx
import { BlogFlowUI } from '@blogflow/sdk/react'

export default function BlogPage() {
  return (
    <BlogFlowUI
      apiKey={process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY!}
      defaultLanguage="en"
      title="Our Blog"
    />
  )
}
```

## Configuration

### All Configuration Options

```tsx
<BlogFlowUI
  // Required
  apiKey="your-api-key"
  
  // Optional - API Configuration
  baseUrl="https://your-api.com/api/v2"
  defaultLanguage="en"
  
  // Optional - Appearance
  defaultTheme="default"
  defaultViewMode="card"
  title="My Blog"
  className="my-custom-class"
  style={{ maxWidth: '1200px' }}
  
  // Optional - Features
  showControlPanel={true}
  showCardOptions={true}
  
  // Optional - Behavior
  defaultSearchMode="server"
  defaultPaginationVariant="mixed"
  pageSize={12}
  
  // Optional - Callbacks
  onPostClick={(slug) => {
    router.push(`/post/${slug}`)
  }}
/>
```

### Configuration Reference

#### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `apiKey` | `string` | Your BlogFlow API key |

#### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `baseUrl` | `string` | API default | Custom API base URL |
| `defaultLanguage` | `'en' \| 'zh' \| 'es' \| 'fr' \| 'de' \| 'ja' \| 'ko'` | `'en'` | Default content language |
| `defaultTheme` | `string` | `'default'` | Initial theme (see [Themes](#themes)) |
| `defaultViewMode` | `string` | `'card'` | Initial view mode (see [View Modes](#view-modes)) |
| `defaultSearchMode` | `'server' \| 'client'` | `'server'` | Search mode |
| `defaultPaginationVariant` | `'text' \| 'icon' \| 'mixed' \| 'simple'` | `'mixed'` | Pagination style |
| `pageSize` | `number` | `12` | Posts per page |
| `showControlPanel` | `boolean` | `true` | Show theme/view controls |
| `showCardOptions` | `boolean` | `true` | Show card display options |
| `title` | `string` | `'Blog'` | Page title (empty string to hide) |
| `onPostClick` | `(slug: string) => void` | `undefined` | Post click callback |
| `className` | `string` | `undefined` | Custom CSS class |
| `style` | `React.CSSProperties` | `undefined` | Custom inline styles |

### Themes

Available themes:

- `default` - Clean and professional
- `blue` - Blue accent colors
- `minimal` - Minimalist design
- `modern` - Modern and sleek
- `dark` - Dark mode
- `magic` - Magical purple theme
- `fantasy` - Fantasy-inspired
- `adventure` - Adventure theme
- `tomorrow` - Futuristic
- `mainstreet` - Classic newspaper
- `eyecare` - Easy on the eyes
- `purewhite` - Pure white background
- `pureblack` - Pure black background
- `cyanblue` - Cyan and blue
- `violet` - Violet theme
- `cardinal` - Cardinal red

### View Modes

Available view modes:

- `card` - Card layout (default)
- `list` - List layout
- `grid` - Grid layout
- `masonry` - Masonry layout (CSS)
- `waterfall` - Waterfall layout (JS)
- `magazine` - Magazine-style layout
- `dense` - Dense grid layout
- `timeline` - Timeline layout
- `fullscreen` - Fullscreen layout
- `fast` - Fast loading minimal layout
- `modern` - Modern card layout
- `carousel` - Carousel layout

## Examples

### Example 1: Simple Blog

```tsx
import { BlogFlowUI } from '@blogflow/sdk/react'

export default function SimpleBlog() {
  return <BlogFlowUI apiKey="your-api-key" />
}
```

### Example 2: Dark Theme Blog

```tsx
import { BlogFlowUI } from '@blogflow/sdk/react'

export default function DarkBlog() {
  return (
    <BlogFlowUI
      apiKey="your-api-key"
      defaultTheme="dark"
      defaultViewMode="modern"
      title="Tech Blog"
    />
  )
}
```

### Example 3: Magazine Style

```tsx
import { BlogFlowUI } from '@blogflow/sdk/react'

export default function MagazineBlog() {
  return (
    <BlogFlowUI
      apiKey="your-api-key"
      defaultTheme="modern"
      defaultViewMode="magazine"
      pageSize={20}
      showControlPanel={false}
      title="Magazine"
    />
  )
}
```

### Example 4: Minimal Blog (No Controls)

```tsx
import { BlogFlowUI } from '@blogflow/sdk/react'

export default function MinimalBlog() {
  return (
    <BlogFlowUI
      apiKey="your-api-key"
      defaultTheme="minimal"
      showControlPanel={false}
      showCardOptions={false}
      title=""
    />
  )
}
```

### Example 5: With Post Navigation

```tsx
'use client'

import { BlogFlowUI } from '@blogflow/sdk/react'
import { useRouter } from 'next/navigation'

export default function BlogWithNavigation() {
  const router = useRouter()
  
  return (
    <BlogFlowUI
      apiKey="your-api-key"
      defaultLanguage="en"
      title="Our Blog"
      onPostClick={(slug) => {
        router.push(`/blog/${slug}`)
      }}
    />
  )
}
```

### Example 6: Multi-language Blog

```tsx
import { BlogFlowUI } from '@blogflow/sdk/react'

export default function MultilingualBlog() {
  return (
    <BlogFlowUI
      apiKey="your-api-key"
      defaultLanguage="zh"
      title="博客"
    />
  )
}
```

### Example 7: Custom Styled Blog

```tsx
import { BlogFlowUI } from '@blogflow/sdk/react'

export default function CustomStyledBlog() {
  return (
    <BlogFlowUI
      apiKey="your-api-key"
      className="my-blog"
      style={{
        maxWidth: '1600px',
        padding: '3rem',
        backgroundColor: '#f9f9f9',
      }}
      defaultTheme="modern"
    />
  )
}
```

## Customization

### Custom CSS

You can add custom CSS to override styles:

```css
/* styles/blog.css */
.my-blog {
  font-family: 'Your Custom Font', sans-serif;
}

.my-blog .blog-post-card {
  border: 2px solid #your-color;
}

.my-blog .blog-post-card:hover {
  transform: scale(1.05);
}
```

```tsx
import './styles/blog.css'
import { BlogFlowUI } from '@blogflow/sdk/react'

export default function CustomBlog() {
  return (
    <BlogFlowUI
      apiKey="your-api-key"
      className="my-blog"
    />
  )
}
```

### Wrapper Component

Create a wrapper for consistent configuration:

```tsx
// components/MyBlogUI.tsx
import { BlogFlowUI, BlogFlowUIConfig } from '@blogflow/sdk/react'

export function MyBlogUI(props: Partial<BlogFlowUIConfig>) {
  return (
    <BlogFlowUI
      apiKey={process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY!}
      defaultTheme="modern"
      defaultLanguage="en"
      pageSize={15}
      {...props}
    />
  )
}

// Usage
import { MyBlogUI } from '@/components/MyBlogUI'

export default function BlogPage() {
  return <MyBlogUI title="Our Blog" />
}
```

## Best Practices

### 1. Use Environment Variables

```bash
# .env.local
NEXT_PUBLIC_BLOGFLOW_API_KEY=your-api-key
```

```tsx
<BlogFlowUI apiKey={process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY!} />
```

### 2. Choose the Right Search Mode

- **Server-side search** (`defaultSearchMode="server"`):
  - ✅ Best for large datasets (1000+ posts)
  - ✅ Searches entire database
  - ✅ Better performance
  - ❌ Requires API call for each search

- **Client-side search** (`defaultSearchMode="client"`):
  - ✅ Best for small datasets (<100 posts)
  - ✅ Instant results
  - ✅ No additional API calls
  - ❌ Only searches loaded posts

### 3. Optimize Page Size

```tsx
// For fast loading
<BlogFlowUI pageSize={12} />

// For more content per page
<BlogFlowUI pageSize={24} />
```

### 4. Hide Controls for Production

```tsx
// Development: Show all controls
<BlogFlowUI showControlPanel={true} showCardOptions={true} />

// Production: Hide controls
<BlogFlowUI showControlPanel={false} showCardOptions={false} />
```

### 5. Handle Post Clicks

```tsx
<BlogFlowUI
  onPostClick={(slug) => {
    // Track analytics
    analytics.track('post_clicked', { slug })
    
    // Navigate
    router.push(`/blog/${slug}`)
  }}
/>
```

## FAQ

### Q: Can I use BlogFlowUI with the lower-level APIs?

**A:** Yes! BlogFlowUI is built on top of the same hooks and components. You can use both in the same application.

### Q: How do I customize the appearance?

**A:** You have several options:
1. Choose from 16 built-in themes
2. Use `className` and `style` props
3. Add custom CSS
4. Use the lower-level components for full control

### Q: Does it work with Server Components?

**A:** BlogFlowUI is a Client Component (`'use client'`). For Server Components, use the core client:

```tsx
// Server Component
import { createClient } from '@blogflow/sdk/core'

const client = createClient({ apiKey: 'xxx' })
const posts = await client.getPosts()

// Pass to Client Component
<BlogFlowUI posts={posts} />
```

### Q: How do I add custom filters?

**A:** For custom filtering, use the lower-level `useBlogPosts` hook:

```tsx
import { BlogFlowProvider, useBlogPosts, BlogPostList } from '@blogflow/sdk/react'

function CustomBlog() {
  const { posts } = useBlogPosts()
  const filteredPosts = posts.filter(/* your logic */)
  
  return <BlogPostList posts={filteredPosts} />
}
```

### Q: Can I disable specific features?

**A:** Yes, use the configuration props:

```tsx
<BlogFlowUI
  showControlPanel={false}  // Hide theme/view controls
  showCardOptions={false}   // Hide card options
  title=""                  // Hide title
/>
```

### Q: How do I handle errors?

**A:** BlogFlowUI handles errors internally. For custom error handling, use the lower-level hooks.

### Q: Is it accessible?

**A:** Yes! BlogFlowUI includes:
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support

## Support

- **Documentation**: [Main README](../README.md)
- **Issues**: [GitHub Issues](https://github.com/ausdata/blogflow-sdk/issues)
- **Email**: support@ausdata.ai
