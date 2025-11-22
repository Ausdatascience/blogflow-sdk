# BlogFlow SDK - Themes Guide

## 🎨 Available Themes

BlogFlow SDK v0.5.0 includes 4 beautiful built-in themes:

### 1. Default Theme
**Best for:** General purpose, professional websites
- **Primary Color:** Blue (#3b82f6)
- **Style:** Clean, modern, professional
- **Use Case:** Corporate blogs, tech websites, documentation

```tsx
<BlogFlowProvider config={{ 
  apiKey: 'your-key',
  styles: { theme: 'default' }  // or omit for default
}}>
```

### 2. Minimal Theme
**Best for:** Minimalist designs, text-focused content
- **Primary Color:** Black (#000000)
- **Style:** Monochrome, clean, simple
- **Use Case:** Personal blogs, portfolios, literary websites

```tsx
<BlogFlowProvider config={{ 
  apiKey: 'your-key',
  styles: { theme: 'minimal' }
}}>
```

### 3. Modern Theme
**Best for:** Creative, contemporary designs
- **Primary Color:** Purple (#8b5cf6)
- **Style:** Vibrant, bold, with gradients
- **Use Case:** Creative agencies, design studios, modern startups

```tsx
<BlogFlowProvider config={{ 
  apiKey: 'your-key',
  styles: { theme: 'modern' }
}}>
```

### 4. Dark Theme
**Best for:** Dark mode, low-light environments
- **Primary Color:** Light Blue (#60a5fa)
- **Style:** Dark background, eye-friendly
- **Use Case:** Developer blogs, gaming sites, night reading

```tsx
<BlogFlowProvider config={{ 
  apiKey: 'your-key',
  styles: { theme: 'dark' }
}}>
```

---

## 🚀 Quick Start

### Option 1: Zero-Config (Recommended for Beginners)

The easiest way to get started - styles are automatically injected:

```tsx
import { BlogFlowProvider, BlogPostList, useBlogPosts } from '@blogflow/sdk/react'

function App() {
  return (
    <BlogFlowProvider config={{ apiKey: 'your-api-key' }}>
      <BlogList />
    </BlogFlowProvider>
  )
}

function BlogList() {
  const { posts } = useBlogPosts({ lang: 'en', pageSize: 12 })
  return <BlogPostList posts={posts} viewMode="grid" />
}
```

✅ **That's it!** Your blog posts will have beautiful styling automatically.

---

### Option 2: External CSS (Better Performance)

For production apps, use external CSS files for better performance:

**Step 1:** Import CSS in your app entry file

```tsx
// app/layout.tsx or _app.tsx
import '@blogflow/sdk/styles/default.css'  // Choose your theme
```

**Step 2:** Disable auto-inject

```tsx
<BlogFlowProvider config={{ 
  apiKey: 'your-api-key',
  styles: { theme: 'none' }  // Disable auto-inject
}}>
  <YourApp />
</BlogFlowProvider>
```

**Benefits:**
- ✅ No runtime CSS injection
- ✅ Better performance
- ✅ No Flash of Unstyled Content (FOUC)
- ✅ Smaller JavaScript bundle

---

### Option 3: Custom Theme Variables

Customize the default theme with your brand colors:

```tsx
<BlogFlowProvider config={{ 
  apiKey: 'your-api-key',
  styles: {
    theme: 'default',
    themeVars: {
      primaryColor: '#ff6b6b',      // Your brand color
      backgroundColor: '#ffffff',    // Background
      textColor: '#1a1a1a',         // Text color
      borderColor: '#e0e0e0',       // Border color
      borderRadius: '12px',         // Rounded corners
      spacing: '1.5rem',            // Spacing
      fontFamily: 'Inter, sans-serif'  // Font
    }
  }
}}>
```

---

### Option 4: Completely Custom (Tailwind/CSS Modules)

For complete control, disable themes and use your own styles:

```tsx
<BlogFlowProvider config={{ 
  apiKey: 'your-api-key',
  styles: { theme: 'none' }
}}>
  <BlogPostList 
    posts={posts}
    className="grid grid-cols-1 md:grid-cols-3 gap-6"
    itemClassName="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
  />
</BlogFlowProvider>
```

---

## 🎯 Usage Examples

### Example 1: Simple Blog List

```tsx
import { BlogFlowProvider, BlogPostList, useBlogPosts } from '@blogflow/sdk/react'

export default function BlogPage() {
  const { posts, loading } = useBlogPosts({ lang: 'en' })

  return (
    <BlogFlowProvider config={{ apiKey: process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY! }}>
      {loading ? <p>Loading...</p> : <BlogPostList posts={posts} viewMode="grid" />}
    </BlogFlowProvider>
  )
}
```

### Example 2: With Search

```tsx
import { BlogFlowProvider, BlogPostList, useBlogSearch } from '@blogflow/sdk/react'
import { useState } from 'react'

export default function SearchableBlog() {
  const [searchTerm, setSearchTerm] = useState('')
  const { results, loading } = useBlogSearch({ 
    searchTerm, 
    mode: 'server',
    lang: 'en' 
  })

  return (
    <BlogFlowProvider config={{ 
      apiKey: process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY!,
      styles: { theme: 'modern' }
    }}>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search posts..."
      />
      {loading ? <p>Searching...</p> : <BlogPostList posts={results} viewMode="list" />}
    </BlogFlowProvider>
  )
}
```

### Example 3: Dark Mode Toggle

```tsx
import { BlogFlowProvider, BlogPostList, useBlogPosts } from '@blogflow/sdk/react'
import { useState } from 'react'

export default function DarkModeDemo() {
  const [isDark, setIsDark] = useState(false)
  const { posts } = useBlogPosts({ lang: 'en' })

  return (
    <BlogFlowProvider config={{ 
      apiKey: process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY!,
      styles: { theme: isDark ? 'dark' : 'default' }
    }}>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle {isDark ? 'Light' : 'Dark'} Mode
      </button>
      <BlogPostList posts={posts} viewMode="grid" />
    </BlogFlowProvider>
  )
}
```

---

## 🎨 Theme Customization

### CSS Variables

All themes use CSS variables, which you can override in your global CSS:

```css
/* Override default theme colors */
:root {
  --blogflow-primary: #your-color;
  --blogflow-bg: #your-bg;
  --blogflow-text: #your-text;
  --blogflow-border: #your-border;
  --blogflow-radius-md: 12px;
  --blogflow-space-md: 1.5rem;
}
```

### Available CSS Variables

```css
/* Colors */
--blogflow-primary
--blogflow-bg
--blogflow-bg-hover
--blogflow-text
--blogflow-text-secondary
--blogflow-border
--blogflow-border-hover
--blogflow-category-bg
--blogflow-category-text
--blogflow-shadow

/* Spacing */
--blogflow-space-xs
--blogflow-space-sm
--blogflow-space-md
--blogflow-space-lg
--blogflow-space-xl

/* Border Radius */
--blogflow-radius-sm
--blogflow-radius-md
--blogflow-radius-lg

/* Shadows */
--blogflow-shadow-sm
--blogflow-shadow-md
--blogflow-shadow-lg

/* Transitions */
--blogflow-transition-fast
--blogflow-transition-normal
--blogflow-transition-slow

/* Fonts */
--blogflow-font-sans
--blogflow-font-mono

/* Font Sizes */
--blogflow-text-xs
--blogflow-text-sm
--blogflow-text-base
--blogflow-text-lg
--blogflow-text-xl
--blogflow-text-2xl
```

---

## 📦 Package Exports

```tsx
// Import specific theme CSS
import '@blogflow/sdk/styles/default.css'
import '@blogflow/sdk/styles/minimal.css'
import '@blogflow/sdk/styles/modern.css'
import '@blogflow/sdk/styles/dark.css'
```

---

## 🔧 TypeScript Support

Full TypeScript support for theme configuration:

```typescript
import type { StylesConfig, ThemeName, ThemeVars } from '@blogflow/sdk/react'

const stylesConfig: StylesConfig = {
  theme: 'default',  // Type-safe theme names
  autoInject: true,
  themeVars: {
    primaryColor: '#ff6b6b',
    // ... fully typed
  }
}
```

---

## 🚀 Performance Tips

1. **Use External CSS in Production**
   ```tsx
   import '@blogflow/sdk/styles/default.css'
   ```

2. **Disable Auto-Inject**
   ```tsx
   styles: { theme: 'none' }
   ```

3. **Minimize Theme Switching**
   - Theme switching causes re-injection
   - Use CSS variables for dynamic theming instead

4. **Tree-Shaking**
   - Only import what you need
   - Unused themes won't be bundled

---

## 🎯 Best Practices

1. **Choose the Right Option**
   - **Beginners:** Use auto-inject (Option 1)
   - **Production:** Use external CSS (Option 2)
   - **Custom Design:** Use your own styles (Option 4)

2. **Consistent Theming**
   - Set theme once at the root `BlogFlowProvider`
   - Avoid multiple providers with different themes

3. **Responsive Design**
   - All themes are fully responsive
   - Test on mobile, tablet, and desktop

4. **Accessibility**
   - All themes meet WCAG 2.1 AA standards
   - Keyboard navigation supported
   - Screen reader friendly

---

## 🐛 Troubleshooting

### Styles Not Showing

**Problem:** Components render but have no styles

**Solutions:**
1. Check that `BlogFlowProvider` wraps your components
2. Verify `theme` is not set to `'none'`
3. Check browser console for errors
4. Try explicitly setting `autoInject: true`

### Theme Not Changing

**Problem:** Theme prop changes but styles don't update

**Solutions:**
1. Ensure `BlogFlowProvider` is re-rendering
2. Check React DevTools for prop changes
3. Try removing old theme manually:
   ```tsx
   import { removeAllThemeStyles } from '@blogflow/sdk/react'
   removeAllThemeStyles()
   ```

### CSS Conflicts

**Problem:** Styles conflict with existing CSS

**Solutions:**
1. Use `theme: 'none'` and import CSS manually
2. Increase specificity of your custom CSS
3. Use CSS Modules or CSS-in-JS
4. Override with `!important` (last resort)

---

## 📚 Related Documentation

- [Complete Usage Guide](./USAGE.md)
- [Styling Guide](./STYLING_GUIDE.md)
- [API Reference](./README.md)
- [Migration Guide](./MIGRATION_0.4.0.md)

---

## 🆕 What's New in v0.5.0

- ✨ 4 built-in themes (default, minimal, modern, dark)
- 🎨 Automatic CSS injection (zero-config)
- 🎯 Theme customization via `themeVars`
- 📦 External CSS files for production
- 🎭 Dynamic theme switching
- 🔧 Full TypeScript support
- 📱 Mobile-optimized themes
- ♿ WCAG 2.1 AA compliant

---

## 💡 Coming Soon

- 🎨 More themes (v0.6.0)
- 🎭 Advanced animations (v0.6.0)
- 🎨 Theme builder UI (v0.7.0)
- 🏪 Theme marketplace (v1.0.0)

---

**Need help?** Join our community at [https://ausdata.org/](https://ausdata.org/)

