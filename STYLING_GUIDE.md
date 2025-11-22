# BlogFlow SDK 样式指南

## 当前状况

BlogFlow SDK (v0.4.x) **不包含任何默认 CSS 样式**。组件只提供语义化的 CSS 类名，开发者需要自己定义样式。

## 为什么不包含默认样式？

1. **避免样式冲突** - 不同项目使用不同的 CSS 框架（Tailwind, Bootstrap, Ant Design 等）
2. **保持灵活性** - 开发者可以完全控制视觉呈现
3. **减小包体积** - 不强制加载不需要的 CSS

## 如何使用

### 方案 1：使用官方推荐样式（推荐）

我们提供了一套推荐的 CSS 样式，您可以直接复制到项目中：

#### 1. 创建样式文件

创建 `blogflow-sdk.css` 文件：

```css
/* ========================================
   BlogFlow SDK 推荐样式
   ======================================== */

/* Card 视图 - 单列卡片 */
.blog-post-list-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* List 视图 - 紧凑列表 */
.blog-post-list-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.blog-post-list-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
}

.blog-post-list-item:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  border-color: #3b82f6;
}

.blog-post-list-item-image {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  overflow: hidden;
  border-radius: 0.375rem;
}

.blog-post-list-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-post-list-item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.blog-post-list-item-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.blog-post-list-item-excerpt {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.blog-post-list-item-meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: #9ca3af;
}

.blog-post-list-item-category {
  padding: 0.125rem 0.5rem;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 0.25rem;
  font-weight: 500;
}

/* Grid 视图 - 响应式网格 */
.blog-post-list-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .blog-post-list-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .blog-post-list-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Card 组件样式 */
.blog-post-card {
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.blog-post-card:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  border-color: #3b82f6;
}

.blog-post-card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.blog-post-card-image-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-post-card-content {
  padding: 1.5rem;
}

.blog-post-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.75rem 0;
}

.blog-post-card-excerpt {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.blog-post-card-meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: #9ca3af;
}

.blog-post-card-category {
  padding: 0.125rem 0.5rem;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 0.25rem;
  font-weight: 500;
}

.blog-post-card-date {
  color: #9ca3af;
}

/* 暗黑模式支持 */
@media (prefers-color-scheme: dark) {
  .blog-post-list-item,
  .blog-post-card {
    background: #1f2937;
    border-color: #374151;
  }

  .blog-post-list-item:hover,
  .blog-post-card:hover {
    border-color: #3b82f6;
  }

  .blog-post-list-item-title,
  .blog-post-card-title {
    color: #f9fafb;
  }

  .blog-post-list-item-excerpt,
  .blog-post-card-excerpt {
    color: #d1d5db;
  }

  .blog-post-list-item-meta,
  .blog-post-card-meta {
    color: #9ca3af;
  }

  .blog-post-list-item-category,
  .blog-post-card-category {
    background: #1e3a8a;
    color: #93c5fd;
  }
}

/* 空状态 */
.blog-post-list-empty {
  padding: 3rem;
  text-align: center;
  color: #6b7280;
  background: #f9fafb;
  border-radius: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  .blog-post-list-empty {
    background: #1f2937;
    color: #9ca3af;
  }
}
```

#### 2. 导入样式

在您的应用入口文件中导入：

```typescript
// app/layout.tsx 或 _app.tsx
import './blogflow-sdk.css'
```

### 方案 2：使用 Tailwind CSS

如果您使用 Tailwind CSS，可以通过 `className` prop 自定义样式：

```tsx
<BlogPostList
  posts={posts}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  itemClassName="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
  viewMode="grid"
/>
```

### 方案 3：使用 CSS Modules

```typescript
// Blog.module.css
.customList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.customCard {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

// Blog.tsx
import styles from './Blog.module.css'

<BlogPostList
  posts={posts}
  className={styles.customList}
  itemClassName={styles.customCard}
/>
```

## 组件类名参考

### BlogPostList 组件

| 类名 | 说明 | 何时应用 |
|------|------|----------|
| `blog-post-list` | 列表容器 | 总是 |
| `blog-post-list-card` | 卡片视图容器 | viewMode="card" |
| `blog-post-list-list` | 列表视图容器 | viewMode="list" |
| `blog-post-list-grid` | 网格视图容器 | viewMode="grid" |
| `blog-post-list-item` | 列表项（仅 list 模式） | viewMode="list" |
| `blog-post-list-item-image` | 列表项图片 | viewMode="list" |
| `blog-post-list-item-content` | 列表项内容 | viewMode="list" |
| `blog-post-list-item-title` | 列表项标题 | viewMode="list" |
| `blog-post-list-item-excerpt` | 列表项摘要 | viewMode="list" |
| `blog-post-list-item-meta` | 列表项元信息 | viewMode="list" |
| `blog-post-list-item-category` | 列表项分类 | viewMode="list" |
| `blog-post-list-item-date` | 列表项日期 | viewMode="list" |
| `blog-post-list-empty` | 空状态容器 | posts.length === 0 |

### BlogPostCard 组件

| 类名 | 说明 | 何时应用 |
|------|------|----------|
| `blog-post-card` | 卡片容器 | 总是（通过 className prop） |
| `blog-post-card-image` | 卡片图片容器 | 有 featured_image_url |
| `blog-post-card-image-img` | 卡片图片 | 有 featured_image_url |
| `blog-post-card-content` | 卡片内容区 | 总是 |
| `blog-post-card-title` | 卡片标题 | 总是 |
| `blog-post-card-excerpt` | 卡片摘要 | showExcerpt=true |
| `blog-post-card-meta` | 卡片元信息 | 总是 |
| `blog-post-card-category` | 卡片分类 | showCategory=true |
| `blog-post-card-date` | 卡片日期 | showDate=true |

## 样式冲突避免

### 1. 使用命名空间

所有 SDK 类名都使用 `blog-post-` 前缀，避免与您的项目样式冲突。

### 2. CSS 特异性

如果需要覆盖默认样式，使用更高的特异性：

```css
/* 您的自定义样式 */
.my-blog .blog-post-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### 3. CSS Modules

使用 CSS Modules 可以完全避免全局样式冲突：

```css
/* Blog.module.css */
.card {
  /* 您的自定义样式 */
}
```

```tsx
<BlogPostCard className={styles.card} />
```

## 最佳实践

### 1. 渐进式增强

先使用推荐样式，然后根据需要逐步自定义：

```css
/* 1. 导入推荐样式 */
@import './blogflow-sdk.css';

/* 2. 自定义覆盖 */
.blog-post-card {
  border-radius: 1rem; /* 覆盖默认的 0.5rem */
}
```

### 2. 响应式设计

确保您的自定义样式支持移动端：

```css
.blog-post-list-grid {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .blog-post-list-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .blog-post-list-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 3. 暗黑模式

使用 CSS 变量支持主题切换：

```css
:root {
  --blog-bg: white;
  --blog-text: #111827;
  --blog-border: #e5e7eb;
}

[data-theme="dark"] {
  --blog-bg: #1f2937;
  --blog-text: #f9fafb;
  --blog-border: #374151;
}

.blog-post-card {
  background: var(--blog-bg);
  color: var(--blog-text);
  border-color: var(--blog-border);
}
```

## 未来计划

我们计划在未来版本中提供：

1. **可选的 CSS 包** - `@blogflow/sdk/styles.css`
2. **主题系统** - 预设主题（Light, Dark, Minimal, Modern）
3. **CSS-in-JS 支持** - Styled Components, Emotion 集成
4. **Tailwind 插件** - 预设的 Tailwind 配置

## 常见问题

### Q: 为什么不默认包含样式？

A: 为了保持灵活性和避免样式冲突。不同项目有不同的设计系统，强制加载样式可能导致：
- 样式冲突
- 增加包体积
- 限制自定义能力

### Q: 推荐样式是否会更新？

A: 推荐样式会随着 SDK 版本更新，但我们会保持向后兼容。建议将样式复制到项目中，而不是直接引用。

### Q: 如何完全自定义样式？

A: 使用 `className` prop 并忽略默认类名：

```tsx
<BlogPostCard
  post={post}
  className="my-custom-card"
/>
```

然后定义 `.my-custom-card` 的样式。

### Q: 是否支持 CSS-in-JS？

A: 是的，您可以使用任何 CSS-in-JS 库：

```tsx
import styled from 'styled-components'

const StyledCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
`

<BlogPostCard
  post={post}
  className={StyledCard}
/>
```

## 贡献

如果您有更好的样式建议，欢迎提交 PR 或 Issue！

## 相关文档

- [README.md](./README.md) - SDK 概览
- [USAGE.md](./USAGE.md) - 使用指南
- [CACHING_GUIDE.md](./CACHING_GUIDE.md) - 缓存指南

