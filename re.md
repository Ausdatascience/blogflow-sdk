以下是 v1.0.0 README 的标准骨架（可以直接套用）：

A. 头部 (Hero)
标题： @blogflow/sdk

Slogan： The AI Content Engine for Next.js & React. (Ausdata Science 出品)

徽章 (Badges)： v1.0.0 | MIT License | SSR Supported | TypeScript

B. 核心卖点 (Why v1.0?) —— 这是新增的
Hybrid Architecture: Server-side Rendering (SSR) for SEO, Client-side for interaction.

Smart Caching: Built-in support for Next.js ISR (Revalidation).

Server-Side Search: High-performance search for massive datasets.

Ausdata Matrix: Production-ready infrastructure.

C. 安装 (Installation)
Bash

npm install @blogflow/sdk
D. 快速开始 (Quick Start) —— 这是重写的重点
展示 “混合模式” 的标准写法，而不是旧的纯客户端写法。

TypeScript

// 1. Server Component (app/blog/page.tsx)
import { createClient } from '@blogflow/sdk/core';
import { BlogList } from '@blogflow/sdk/react';

export default async function Page() {
  const client = createClient({ apiKey: '...' });
  const posts = await client.getPosts({ next: { revalidate: 3600 } }); // 强调缓存
  
  return <BlogList initialData={posts} />;
}
E. API 文档 (API Reference)
Core Client: 列出 getPosts, getPost 等方法及参数。

React Hooks: 说明 useBlogPosts 现在支持服务端搜索了。

Components: 说明如何使用 className 自定义样式。