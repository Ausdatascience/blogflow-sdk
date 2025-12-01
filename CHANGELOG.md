# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-01

### Added

- **BlogFlowUI Component** - Complete, ready-to-use blog interface component
  - One-line integration: `<BlogFlowUI apiKey="xxx" />`
  - 16 built-in themes with live preview
  - 12 view modes (card, list, grid, magazine, waterfall, dense, timeline, fullscreen, fast, modern, carousel, masonry)
  - Server-side and client-side search modes with auto-debouncing
  - Configurable control panels for theme, view mode, search mode, and pagination style
  - Card display options (show/hide excerpt, category, date)
  - Full TypeScript support with comprehensive type definitions
  - Responsive design that works on all screen sizes
  - Customizable via props (title, onPostClick, className, style, etc.)

### Example Usage

```tsx
// Before: Multiple components and hooks needed
import { BlogFlowProvider, useBlogPosts, BlogPostList } from '@blogflow/sdk/react'

function MyBlog() {
  const { posts, loading } = useBlogPosts()
  // ... more code
  return <BlogPostList posts={posts} />
}

// After: One line of code
import { BlogFlowUI } from '@blogflow/sdk/react'

function MyBlog() {
  return <BlogFlowUI apiKey="your-api-key" />
}
```

### Benefits

- **Reduced Development Time**: From hours to minutes
- **Lower Learning Curve**: No need to understand multiple concepts
- **Consistent UX**: Professional UI out of the box
- **Still Flexible**: Advanced users can still use lower-level APIs

### Configuration Options

All configuration is optional with sensible defaults:

- `apiKey` (required): Your BlogFlow API key
- `defaultLanguage`: Default content language (default: 'en')
- `defaultTheme`: Initial theme (default: 'default')
- `defaultViewMode`: Initial view mode (default: 'card')
- `defaultSearchMode`: 'server' or 'client' (default: 'server')
- `defaultPaginationVariant`: Pagination style (default: 'mixed')
- `pageSize`: Posts per page (default: 12)
- `showControlPanel`: Show theme/view controls (default: true)
- `showCardOptions`: Show card display options (default: true)
- `title`: Page title (default: 'Blog')
- `onPostClick`: Callback for post clicks
- `className`: Custom CSS class
- `style`: Custom inline styles

### Documentation

- Updated README with BlogFlowUI quick start guide
- Added comprehensive JSDoc comments
- Included multiple usage examples

## [0.6.3] - 2024-11-XX

### Added
- 14 built-in themes with automatic CSS injection
- Theme customization via `themeVars`
- Improved styling documentation

### Changed
- Enhanced BlogFlowProvider with styles configuration
- Updated all components to support theme system

## [0.6.2] - 2024-11-XX

### Added
- Server-side search functionality
- Auto-debouncing for search inputs
- Multiple view modes for post lists

### Changed
- Improved performance for large datasets
- Enhanced TypeScript type definitions

## [0.6.0] - 2024-11-XX

### Added
- Initial release with core functionality
- React hooks: useBlogPosts, useBlogPost, useBlogSearch
- React components: BlogPostCard, BlogPostList, BlogSearch, Pagination
- Multi-language support
- Next.js ISR caching support

---

## Migration Guides

### Migrating to v1.0.0

If you're using the lower-level components and hooks, no changes are required. The new `BlogFlowUI` component is an addition, not a replacement.

**Option 1: Migrate to BlogFlowUI (Recommended for most users)**

```tsx
// Before
import { BlogFlowProvider, useBlogPosts, BlogPostList } from '@blogflow/sdk/react'

function MyBlog() {
  const { posts, loading, currentPage, totalPages, fetchPage } = useBlogPosts()
  // ... state management, search logic, etc.
  return (
    <BlogFlowProvider config={{ apiKey: 'xxx' }}>
      <BlogPostList posts={posts} />
      {/* ... pagination, search, etc. */}
    </BlogFlowProvider>
  )
}

// After
import { BlogFlowUI } from '@blogflow/sdk/react'

function MyBlog() {
  return <BlogFlowUI apiKey="xxx" />
}
```

**Option 2: Keep using lower-level APIs (For advanced customization)**

No changes needed. All existing APIs remain unchanged and fully supported.

### Breaking Changes

None. This is a feature addition release.

---

## Support

- **Documentation**: [README.md](./README.md)
- **Issues**: [GitHub Issues](https://github.com/ausdata/blogflow-sdk/issues)
- **Email**: support@ausdata.ai
