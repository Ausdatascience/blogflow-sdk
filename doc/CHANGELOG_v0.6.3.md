# Changelog - v0.6.3

## 🔧 Patch Release

**Release Date:** 2025-01-23  
**Type:** Patch Version (Bug Fixes)

---

## 🐛 Bug Fixes

### Date Display Timezone Issue
- **Fixed:** Date display showing incorrect date (one day ahead) due to timezone conversion
- **Affected Components:**
  - `BlogPostCard` - Card date display
  - `BlogPostList` - List date display
  - `BlogPostCarousel` - Carousel date display
  - `BlogPostFullscreen` - Fullscreen date display
- **Solution:** Use UTC date methods to extract year/month/day, then create local date object to prevent timezone conversion from shifting the date
- **Impact:** Dates now correctly display the same date as shown in the backend/admin panel

### React Key Duplication Warning
- **Fixed:** "Encountered two children with the same key" warning in Pagination component
- **Solution:** 
  - Use unique counter for ellipsis keys instead of array index
  - Changed page button keys from `key={page}` to `key={`page-${page}`}` to avoid conflicts
- **Impact:** Eliminates React console warnings and ensures proper component identity

---

## 📦 Installation

```bash
npm install @blogflow/sdk@0.6.3
```

---

## 🔄 Migration from v0.6.2

No breaking changes. This is a patch release with bug fixes only.

---

## 📝 Technical Details

### Date Formatting Fix
The date formatting functions now use UTC methods to extract date components:
```typescript
const year = date.getUTCFullYear()
const month = date.getUTCMonth()
const day = date.getUTCDate()
const localDate = new Date(year, month, day)
```

This ensures that dates displayed match the dates stored in the database, regardless of the user's timezone.

### Pagination Key Fix
Ellipsis elements now use a unique counter instead of array index:
```typescript
let ellipsisCounter = 0
const ellipsisKey = `ellipsis-${ellipsisCounter++}`
```

---

## ✅ Verification

- ✅ Date displays correctly match backend dates
- ✅ No React key duplication warnings
- ✅ All components tested with various timezones
- ✅ Pagination works correctly with multiple ellipsis

