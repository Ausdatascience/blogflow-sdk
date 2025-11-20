// src/types.ts

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    summary?: string;
    contentHtml?: string; // HTML 内容
    coverImage?: string;
    publishedAt: string;
    tags?: string[];
    author?: {
      name: string;
      avatar?: string;
    };
  }
  
  export interface BlogFlowConfig {
    apiKey: string;
    baseUrl?: string; // 允许用户覆盖 API 地址
  }
  
  export interface GetPostsParams {
    page?: number;
    limit?: number;
    tag?: string;
  }