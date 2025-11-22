# Release Checklist - v0.5.0

## ✅ Pre-Release Checklist

### 1. Code & Build
- [x] All features implemented
- [x] Code committed to Git
- [x] Version number updated (0.4.5 → 0.5.0)
- [x] Build successful (`npm run build`)
- [x] CSS files generated (4 themes)
- [x] TypeScript types generated
- [x] No linter errors

### 2. Documentation
- [x] README.md updated
- [x] CHANGELOG_v0.5.0.md created
- [x] THEMES_GUIDE.md created
- [x] STYLING_GUIDE.md moved to doc/
- [x] All examples tested

### 3. Testing
- [ ] **TODO:** Test in blogflow_web project
- [ ] **TODO:** Test all 4 themes
- [ ] **TODO:** Test auto-inject mode
- [ ] **TODO:** Test external CSS mode
- [ ] **TODO:** Test theme customization
- [ ] **TODO:** Test backward compatibility

---

## 🚀 Release Steps

### Step 1: Final Build & Test

```bash
cd C:\Users\User\Documents\Github_Ausdata\blogflow-sdk

# Clean build
npm run build

# Verify dist/ contents
ls dist/
ls dist/styles/

# Test package
npm pack --dry-run
```

### Step 2: Test in blogflow_web

```bash
cd C:\Users\User\Documents\Github_Ausdata\blogflow_web

# Install local version for testing
npm install ../blogflow-sdk

# Test zero-config
# Test theme switching
# Test external CSS
# Test custom vars
```

### Step 3: Publish to npm

```bash
cd C:\Users\User\Documents\Github_Ausdata\blogflow-sdk

# Login to npm (if needed)
npm login

# Publish
npm publish

# Verify publication
npm view @blogflow/sdk
```

### Step 4: Push to GitHub

```bash
# Push commits and tags
git push origin main
git push origin --tags

# Create GitHub Release
# - Go to https://github.com/ausdata/blogflow-sdk/releases
# - Click "Draft a new release"
# - Tag: v0.5.0
# - Title: "v0.5.0 - Built-in Themes & Auto-Styling"
# - Copy content from CHANGELOG_v0.5.0.md
```

### Step 5: Update blogflow_web

```bash
cd C:\Users\User\Documents\Github_Ausdata\blogflow_web

# Install published version
npm install @blogflow/sdk@0.5.0

# Update code to use new features (optional)
# Test everything works
```

---

## 📋 Testing Scenarios

### Scenario 1: Zero-Config (Default Theme)

```tsx
import { BlogFlowProvider, BlogPostList, useBlogPosts } from '@blogflow/sdk/react'

function App() {
  const { posts } = useBlogPosts({ lang: 'en' })
  
  return (
    <BlogFlowProvider config={{ apiKey: process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY! }}>
      <BlogPostList posts={posts} viewMode="grid" />
    </BlogFlowProvider>
  )
}
```

**Expected:**
- ✅ Posts display with default blue theme
- ✅ Styles are automatically injected
- ✅ No console errors
- ✅ Responsive layout works

### Scenario 2: Theme Switching

```tsx
const [theme, setTheme] = useState<'default' | 'minimal' | 'modern' | 'dark'>('default')

<BlogFlowProvider config={{ 
  apiKey: 'xxx',
  styles: { theme }
}}>
  <button onClick={() => setTheme('dark')}>Dark</button>
  <button onClick={() => setTheme('minimal')}>Minimal</button>
  <BlogPostList posts={posts} />
</BlogFlowProvider>
```

**Expected:**
- ✅ Theme changes immediately
- ✅ Old styles are removed
- ✅ New styles are injected
- ✅ No FOUC (Flash of Unstyled Content)

### Scenario 3: External CSS

```tsx
// In app/layout.tsx
import '@blogflow/sdk/styles/default.css'

// In component
<BlogFlowProvider config={{ 
  apiKey: 'xxx',
  styles: { theme: 'none' }
}}>
  <BlogPostList posts={posts} />
</BlogFlowProvider>
```

**Expected:**
- ✅ Styles load from external CSS
- ✅ No runtime injection
- ✅ Better performance
- ✅ No console warnings

### Scenario 4: Custom Variables

```tsx
<BlogFlowProvider config={{ 
  apiKey: 'xxx',
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

**Expected:**
- ✅ Primary color is red (#ff6b6b)
- ✅ Border radius is 12px
- ✅ Other styles remain default
- ✅ CSS variables are applied

### Scenario 5: Backward Compatibility

```tsx
// Old v0.4.x code (no styles config)
<BlogFlowProvider config={{ apiKey: 'xxx' }}>
  <BlogPostList 
    posts={posts}
    className="my-custom-class"
  />
</BlogFlowProvider>
```

**Expected:**
- ✅ Works without any changes
- ✅ Default theme is auto-injected
- ✅ Custom className still works
- ✅ No breaking changes

---

## 🐛 Known Issues to Watch

1. **SSR Hydration**
   - Watch for hydration mismatches
   - Test Next.js SSR/SSG pages

2. **Theme Switching**
   - Ensure old styles are removed
   - Check for memory leaks

3. **CSS Conflicts**
   - Test with existing user styles
   - Verify CSS specificity

4. **Performance**
   - Monitor bundle size
   - Check runtime injection speed

---

## 📊 Success Metrics

### Before Publishing
- [ ] Build size: React bundle ~49 KB (target: <50 KB)
- [ ] CSS size: Each theme ~8 KB (target: <10 KB)
- [ ] Build time: <5 seconds
- [ ] No TypeScript errors
- [ ] No linter warnings

### After Publishing
- [ ] npm package published successfully
- [ ] Package downloadable via `npm install`
- [ ] Documentation accessible
- [ ] GitHub release created
- [ ] blogflow_web updated and working

---

## 🔄 Rollback Plan

If critical issues are found:

```bash
# Unpublish v0.5.0 (within 72 hours)
npm unpublish @blogflow/sdk@0.5.0

# Or deprecate
npm deprecate @blogflow/sdk@0.5.0 "Critical bug, use v0.4.5 instead"

# Revert Git
git revert 1781096
git push origin main
```

---

## 📞 Post-Release

1. **Announce Release**
   - [ ] Update project README
   - [ ] Post on community forum (ausdata.org)
   - [ ] Update documentation site

2. **Monitor**
   - [ ] Watch npm download stats
   - [ ] Monitor GitHub issues
   - [ ] Check community feedback

3. **Plan v0.6.0**
   - [ ] Collect user feedback
   - [ ] Plan new themes
   - [ ] Design advanced features

---

## 🎯 Current Status

**Version:** 0.5.0  
**Git Commit:** 1781096  
**Status:** ✅ Ready for Testing  
**Next Step:** Test in blogflow_web project

---

**Last Updated:** 2025-11-22

