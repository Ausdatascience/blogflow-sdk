# Default Theme - Website Color Adaptation

## 🎨 自动适配网站全局颜色

BlogFlow SDK 的 **Default 主题**现在可以自动检测并使用您网站的全局 CSS 变量，实现无缝集成。

## 工作原理

Default 主题使用 CSS `var()` 函数的回退机制，按以下优先级尝试使用颜色：

### 颜色变量映射

| BlogFlow 变量 | 尝试的网站变量（按优先级） | 默认值 |
|--------------|------------------------|--------|
| `--blogflow-primary` | `--primary` → `--color-primary` → `--accent` | `#6b7280` |
| `--blogflow-bg` | `--background` → `--color-background` → `--bg` | `#ffffff` |
| `--blogflow-bg-hover` | `--background-hover` → `--color-background-hover` → `--bg-hover` | `#f9fafb` |
| `--blogflow-text` | `--foreground` → `--color-foreground` → `--text` → `--color-text` | `#111827` |
| `--blogflow-text-secondary` | `--foreground-secondary` → `--color-foreground-secondary` → `--text-secondary` | `#6b7280` |
| `--blogflow-border` | `--border` → `--color-border` → `--border-color` | `#e5e7eb` |
| `--blogflow-border-hover` | `--border-hover` → `--color-border-hover` | `#9ca3af` |

### 字体变量映射

| BlogFlow 变量 | 尝试的网站变量（按优先级） | 默认值 |
|--------------|------------------------|--------|
| `--blogflow-font-sans` | `--font-family-base` → `--font-sans` → `--font-family` | 系统字体 |
| `--blogflow-font-mono` | `--font-mono` → `--font-family-mono` | 等宽字体 |

## 使用示例

### 零配置使用（自动适配）

```tsx
<BlogFlowProvider config={{ 
  apiKey: 'your-key',
  styles: { theme: 'default' }  // 自动使用网站全局颜色
}}>
  <BlogPostList posts={posts} />
</BlogFlowProvider>
```

### 在网站 CSS 中定义变量

```css
:root {
  /* 网站全局颜色 */
  --background: #ffffff;
  --foreground: #171717;
  --primary: #3b82f6;
  --border: #e5e7eb;
  
  /* 字体 */
  --font-family-base: 'Inter', sans-serif;
}

/* Default 主题会自动使用这些变量！ */
```

### 自定义特定颜色

如果网站没有定义某些变量，但您想覆盖特定颜色：

```tsx
<BlogFlowProvider config={{ 
  apiKey: 'your-key',
  styles: { 
    theme: 'default',
    themeVars: {
      primaryColor: '#ff6b6b',  // 覆盖主色
      borderColor: '#d1d5db'    // 覆盖边框色
    }
  }
}}>
  <BlogPostList posts={posts} />
</BlogFlowProvider>
```

## 支持的网站变量命名

Default 主题会尝试以下常见的 CSS 变量命名约定：

### 颜色变量
- `--primary`, `--color-primary`, `--accent`
- `--background`, `--color-background`, `--bg`
- `--foreground`, `--color-foreground`, `--text`, `--color-text`
- `--border`, `--color-border`, `--border-color`

### 字体变量
- `--font-family-base`, `--font-sans`, `--font-family`
- `--font-mono`, `--font-family-mono`

## 优势

✅ **零配置** - 如果网站已有全局变量，自动使用  
✅ **向后兼容** - 如果网站没有定义变量，使用默认值  
✅ **灵活** - 支持多种常见的变量命名约定  
✅ **可覆盖** - 可以通过 `themeVars` 覆盖特定颜色  

## 注意事项

- 只有 **Default 主题**支持自动适配
- 其他主题（Blue, Minimal, Modern, Dark）使用固定颜色
- 变量必须在 `:root` 或父元素中定义
- CSS 变量优先级：网站变量 > themeVars > 默认值

