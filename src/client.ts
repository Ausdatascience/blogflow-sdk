// src/client.ts
import { BlogFlowConfig, BlogPost, GetPostsParams } from './types';

// 🚨 这里的地址要换成你 BlogFlow 后端真实的 API 地址
const DEFAULT_API_URL = "https://bloglink-api-sql.vercel.app/v2"; 

export class BlogFlow {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: BlogFlowConfig) {
    if (!config.apiKey) {
      throw new Error("BlogFlow Error: API Key is required.");
    }
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || DEFAULT_API_URL;
  }

  /**
   * 通用 Fetch 方法 (带鉴权和错误处理)
   */
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      ...options?.headers,
    };

    try {
      // Next.js 默认会缓存 fetch，这里我们允许用户通过 options 控制缓存
      const res = await fetch(url, { ...options, headers });

      if (!res.ok) {
        throw new Error(`BlogFlow API Error: ${res.status} ${res.statusText}`);
      }

      return await res.json();
    } catch (error) {
      console.error(`[BlogFlow SDK] Request failed: ${url}`, error);
      throw error;
    }
  }

  /**
   * 获取文章列表
   */
  async getPosts(params: GetPostsParams = {}): Promise<BlogPost[]> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.tag) searchParams.append('tag', params.tag);

    return this.request<BlogPost[]>(`/posts?${searchParams.toString()}`, {
      next: { revalidate: 600 } // Next.js 特性：默认缓存 10 分钟
    } as any);
  }

  /**
   * 获取单篇文章详情
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      return await this.request<BlogPost>(`/posts/${slug}`, {
         next: { revalidate: 3600 } // 详情页缓存 1 小时
      } as any);
    } catch (error) {
      return null; // 找不到返回 null，不报错
    }
  }
}