interface BlogPost {
    id: string;
    title: string;
    slug: string;
    summary?: string;
    contentHtml?: string;
    coverImage?: string;
    publishedAt: string;
    tags?: string[];
    author?: {
        name: string;
        avatar?: string;
    };
}
interface BlogFlowConfig {
    apiKey: string;
    baseUrl?: string;
}
interface GetPostsParams {
    page?: number;
    limit?: number;
    tag?: string;
}

declare class BlogFlow {
    private apiKey;
    private baseUrl;
    constructor(config: BlogFlowConfig);
    /**
     * 通用 Fetch 方法 (带鉴权和错误处理)
     */
    private request;
    /**
     * 获取文章列表
     */
    getPosts(params?: GetPostsParams): Promise<BlogPost[]>;
    /**
     * 获取单篇文章详情
     */
    getPostBySlug(slug: string): Promise<BlogPost | null>;
}

declare const createClient: (config: BlogFlowConfig) => BlogFlow;

export { BlogFlow, type BlogFlowConfig, type BlogPost, type GetPostsParams, createClient };
