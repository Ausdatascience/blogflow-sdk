# Server-Side Search - Usage Examples

## Overview

v2.1.0 adds **server-side search** functionality to both the API and SDK. This dramatically improves performance for large datasets by moving search logic from the client to the server.

## API Changes

### Backend API (v2.1.0)

The `/api/v2/posts` endpoint now supports two new parameters:

- `search`: Search keyword
- `searchFields`: Comma-separated fields to search (options: `title`, `excerpt`, `category`, `slug`)

**Example API Calls:**

```bash
# Search in default fields (title, excerpt, category)
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://blogflow-api-server.vercel.app/api/v2/posts?search=react"

# Search only in title
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://blogflow-api-server.vercel.app/api/v2/posts?search=javascript&searchFields=title"

# Search with pagination and sorting
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://blogflow-api-server.vercel.app/api/v2/posts?search=tutorial&limit=10&sort=created_at&order=desc"
```

---

## SDK Usage

### 1. Direct Client Usage

```typescript
import { BlogFlow } from '@blogflow/sdk'

const client = new BlogFlow({
  apiKey: 'your-api-key',
  baseUrl: 'https://blogflow-api-server.vercel.app/api/v2'
})

// Simple search
const results = await client.getPosts({
  search: 'react'
})

// Advanced search
const advancedResults = await client.getPosts({
  search: 'javascript',
  searchFields: ['title', 'excerpt'],
  limit: 20,
  sort: 'created_at',
  order: 'desc'
})
```

---

### 2. React Hook - `useServerSearch`

The new `useServerSearch` hook provides automatic debouncing and loading states.

**Basic Example:**

```tsx
import { useServerSearch } from '@blogflow/sdk/react'

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const { results, loading, error, resultCount } = useServerSearch({
    searchTerm,
    searchFields: ['title', 'excerpt', 'category'],
    debounceMs: 300
  })

  return (
    <div>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search posts..."
      />

      {loading && <p>Searching...</p>}
      {error && <p>Error: {error}</p>}

      <p>Found {resultCount} results</p>

      <ul>
        {results.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

**Advanced Example with Manual Control:**

```tsx
import { useServerSearch } from '@blogflow/sdk/react'

function AdvancedSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchFields, setSearchFields] = useState(['title', 'excerpt'])

  const {
    results,
    loading,
    error,
    hasSearched,
    search,
    clear,
    resultCount
  } = useServerSearch({
    searchTerm,
    searchFields,
    debounceMs: 500,
    limit: 20,
    sort: 'created_at',
    order: 'desc',
    autoSearch: false // Manual control
  })

  return (
    <div>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search term..."
      />

      <div>
        <label>
          <input
            type="checkbox"
            checked={searchFields.includes('title')}
            onChange={(e) => {
              if (e.target.checked) {
                setSearchFields([...searchFields, 'title'])
              } else {
                setSearchFields(searchFields.filter(f => f !== 'title'))
              }
            }}
          />
          Title
        </label>
        {/* Add more checkboxes for other fields */}
      </div>

      <button onClick={search} disabled={loading}>
        Search
      </button>
      <button onClick={clear}>
        Clear
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {hasSearched && <p>Found {resultCount} results</p>}

      <div>
        {results.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <span>{post.category}</span>
          </article>
        ))}
      </div>
    </div>
  )
}
```

---

### 3. Hybrid Approach: Server + Client Search

For the best user experience, you can combine server-side and client-side search:

```tsx
import { useBlogPosts, useServerSearch, useBlogSearch } from '@blogflow/sdk/react'

function HybridSearch() {
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch all posts initially (for client-side search)
  const { posts: allPosts, loading: loadingAll } = useBlogPosts({
    limit: 100,
    autoFetch: true
  })

  // Server-side search (for when dataset is too large)
  const {
    results: serverResults,
    loading: loadingServer,
    hasSearched
  } = useServerSearch({
    searchTerm,
    debounceMs: 300,
    autoSearch: searchTerm.length > 0
  })

  // Client-side search (instant results from cached data)
  const { filteredPosts: clientResults } = useBlogSearch(allPosts, {
    searchTerm,
    searchFields: ['title', 'excerpt', 'category']
  })

  // Use server results if searched, otherwise use client results
  const displayResults = hasSearched ? serverResults : clientResults

  return (
    <div>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search posts..."
      />

      {(loadingAll || loadingServer) && <p>Loading...</p>}

      <div>
        {displayResults.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
```

---

## Performance Comparison

### Before (Client-Side Only)

- Downloads all 1000 posts (~500 KB)
- Filters in browser using Array.filter()
- Jank/lag with large datasets
- Wastes bandwidth

### After (Server-Side)

- Downloads only matching results (~50 KB)
- Database indexing = 10-100x faster
- No browser lag
- Saves bandwidth

---

## API Hook Options

### `useServerSearch` Options

```typescript
interface UseServerSearchOptions {
  searchTerm: string              // Required: Search keyword
  searchFields?: SearchField[]    // Optional: ['title', 'excerpt', 'category', 'slug']
  debounceMs?: number            // Optional: Debounce delay (default: 300ms)
  limit?: number                 // Optional: Results limit (default: 20)
  sort?: 'id' | 'created_at' | 'updated_at'  // Optional: Sort field
  order?: 'asc' | 'desc'         // Optional: Sort order
  lang?: string                  // Optional: Language code
  autoSearch?: boolean           // Optional: Auto-search on term change (default: true)
}
```

### `useServerSearch` Return Values

```typescript
interface UseServerSearchReturn {
  results: V2PostListItem[]      // Search results
  loading: boolean               // Loading state
  error: string | null           // Error message
  hasSearched: boolean           // Whether search has been performed
  search: () => void             // Manually trigger search
  clear: () => void              // Clear results
  resultCount: number            // Number of results
}
```

---

## Migration Guide

### From Client-Side to Server-Side Search

**Before:**

```tsx
const { posts } = useBlogPosts()
const { filteredPosts } = useBlogSearch(posts, {
  searchTerm: searchTerm,
  searchFields: ['title', 'excerpt']
})
```

**After:**

```tsx
const { results, loading } = useServerSearch({
  searchTerm: searchTerm,
  searchFields: ['title', 'excerpt']
})
```

---

## Best Practices

1. **Use debouncing** - Set `debounceMs: 300-500` to avoid excessive API calls
2. **Limit results** - Use `limit: 20-50` for pagination
3. **Choose fields wisely** - Searching fewer fields is faster
4. **Handle errors** - Always display error states
5. **Show loading states** - Provide feedback during searches

---

## Type Definitions

```typescript
// Search field options
type SearchField = 'title' | 'excerpt' | 'category' | 'slug'

// Extended getPosts params
interface V2GetPostsParams {
  lang?: SupportedLanguage
  limit?: number
  offset?: number
  sort?: 'id' | 'created_at' | 'updated_at'
  order?: 'asc' | 'desc'
  search?: string              // NEW
  searchFields?: SearchField[] // NEW
}
```

---

## Troubleshooting

### Search not working?

1. Check API key is valid
2. Ensure API server is v2.1.0+
3. Verify `searchFields` contains valid values
4. Check browser console for errors

### Slow search performance?

1. Reduce `limit` parameter
2. Search fewer fields
3. Add database indexes (backend)
4. Enable API caching (backend)

---

## Version History

- **v2.1.0** - Added server-side search support
- **v2.0.0** - Initial release

---

**Questions?** Check the [API documentation](../bloglink2_api_server/src/app/api/v2/API.md) or open an issue.
