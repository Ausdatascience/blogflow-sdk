# Migration Guide: v0.3.x → v0.4.0

## 🚀 What's New

Version 0.4.0 makes **server-side search the default** for `useBlogSearch`, solving performance issues with large datasets.

---

## ⚠️ Breaking Changes

### `useBlogSearch` API Change

**Before (v0.3.x):**
```tsx
// ❌ Old API - Required posts array
const { posts } = useBlogPosts()
const { filteredPosts } = useBlogSearch(posts, {
  searchTerm: 'react'
})
```

**After (v0.4.0):**
```tsx
// ✅ New API - Server-side by default
const { results, loading } = useBlogSearch({
  searchTerm: 'react'
})
```

---

## 📋 Migration Steps

### Option 1: Recommended (Use Server-Side Search)

**Old Code:**
```tsx
function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { posts } = useBlogPosts({ autoFetch: true })

  const { filteredPosts } = useBlogSearch(posts, {
    searchTerm,
    searchFields: ['title', 'excerpt']
  })

  return (
    <div>
      {filteredPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

**New Code:**
```tsx
function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // ✅ No need to fetch all posts anymore!
  const { results, loading } = useBlogSearch({
    searchTerm,
    searchFields: ['title', 'excerpt'],
    debounceMs: 300  // Auto-debounced
  })

  return (
    <div>
      {loading && <p>Searching...</p>}
      {results.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

**Benefits:**
- ✅ 90% less data transfer
- ✅ 10-100x faster search
- ✅ No browser lag with 1000+ posts
- ✅ Automatic debouncing

---

### Option 2: Keep Client-Side Search (Backward Compatible)

If you still want client-side filtering (e.g., for offline apps):

```tsx
function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { posts } = useBlogPosts({ autoFetch: true })

  // ✅ Explicitly use client mode
  const { results } = useBlogSearch({
    searchTerm,
    searchFields: ['title', 'excerpt'],
    mode: 'client'  // Add this
  }, posts)  // Pass posts as second argument

  return (
    <div>
      {results.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

---

## 🔄 API Comparison

### Return Values

| Field | v0.3.x | v0.4.0 (Server) | v0.4.0 (Client) |
|-------|--------|-----------------|-----------------|
| `results` | ❌ | ✅ | ✅ |
| `filteredPosts` | ✅ (main) | ✅ (deprecated) | ✅ (deprecated) |
| `loading` | ❌ | ✅ | ❌ (always false) |
| `error` | ❌ | ✅ | ❌ (always null) |
| `hasSearched` | ❌ | ✅ | ✅ (always true) |
| `search()` | ❌ | ✅ | ❌ (noop) |
| `clear()` | ❌ | ✅ | ✅ |

### Backward Compatibility

The following aliases are deprecated but still work:
- `filteredPosts` → use `results`
- `matchCount` → use `resultCount`

---

## 🎯 New Features

### 1. Automatic Mode Detection

```tsx
// Server mode (no posts provided)
const { results } = useBlogSearch({ searchTerm: 'react' })

// Client mode (posts provided)
const { posts } = useBlogPosts()
const { results } = useBlogSearch({ searchTerm: 'react' }, posts)
```

### 2. Built-in Debouncing

```tsx
const { results, loading } = useBlogSearch({
  searchTerm,
  debounceMs: 500  // Wait 500ms before searching
})
```

### 3. Manual Search Control

```tsx
const { results, search } = useBlogSearch({
  searchTerm,
  autoSearch: false  // Disable auto-search
})

// Trigger search manually
<button onClick={search}>Search</button>
```

### 4. Advanced Options

```tsx
const { results, loading } = useBlogSearch({
  searchTerm: 'react',
  searchFields: ['title', 'excerpt'],
  limit: 50,
  sort: 'created_at',
  order: 'desc',
  lang: 'zh'
})
```

---

## 🐛 Common Issues

### Issue 1: `useBlogFlowClient must be used within BlogFlowProvider`

**Cause:** Server-side search requires the BlogFlow client context.

**Solution:** Wrap your app with `BlogFlowProvider`:

```tsx
import { BlogFlowProvider } from '@blogflow/sdk/react'

function App() {
  return (
    <BlogFlowProvider config={{ apiKey: 'your-key' }}>
      <SearchPage />
    </BlogFlowProvider>
  )
}
```

### Issue 2: Type errors with `filteredPosts`

**Cause:** `filteredPosts` is deprecated.

**Solution:** Use `results` instead:

```tsx
// ❌ Old
const { filteredPosts } = useBlogSearch({ searchTerm })

// ✅ New
const { results } = useBlogSearch({ searchTerm })
```

### Issue 3: Search not working in SSR

**Cause:** Server-side search requires client-side context.

**Solution:** Use `useServerSearch` for better SSR support, or fetch data on the server:

```tsx
// Option 1: Client-side only
'use client'  // Next.js

function SearchPage() {
  const { results } = useBlogSearch({ searchTerm })
  // ...
}

// Option 2: Server-side fetch
async function getServerSideProps() {
  const client = new BlogFlow({ apiKey: process.env.API_KEY })
  const posts = await client.getPosts({ search: 'keyword' })
  return { props: { posts } }
}
```

---

## 📊 Performance Comparison

### Before (Client-Side)

```
1. Download all posts:      ~500 KB
2. Filter in browser:        100-1000ms (O(n))
3. Total:                    500 KB + jank
```

### After (Server-Side)

```
1. API request with search:  ~1 KB
2. Server filters with SQL:  10-50ms (indexed)
3. Download results only:    ~50 KB
4. Total:                    50 KB + instant
```

**Result:** 90% less bandwidth, 10-100x faster ⚡

---

## 🔗 Resources

- **Full Documentation:** `SERVER_SEARCH_EXAMPLE.md`
- **API Reference:** https://www.npmjs.com/package/@blogflow/sdk
- **GitHub:** https://github.com/Ausdatascience/blogflow-sdk
- **Report Issues:** https://github.com/Ausdatascience/blogflow-sdk/issues

---

## ✅ Checklist

- [ ] Update `useBlogSearch` calls to new API
- [ ] Remove unnecessary `useBlogPosts` for search-only pages
- [ ] Test search functionality
- [ ] Update to `@blogflow/sdk@0.4.0`
- [ ] Wrap app in `BlogFlowProvider` if needed

---

**Need help?** Open an issue on GitHub or check the examples in `SERVER_SEARCH_EXAMPLE.md`.
