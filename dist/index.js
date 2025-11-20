var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BlogFlow: () => BlogFlow,
  createClient: () => createClient
});
module.exports = __toCommonJS(index_exports);

// src/client.ts
var DEFAULT_API_URL = "https://api.blogflow.com.au/v1";
var BlogFlow = class {
  apiKey;
  baseUrl;
  constructor(config) {
    if (!config.apiKey) {
      throw new Error("BlogFlow Error: API Key is required.");
    }
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || DEFAULT_API_URL;
  }
  /**
   * 通用 Fetch 方法 (带鉴权和错误处理)
   */
  async request(endpoint, options) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      ...options == null ? void 0 : options.headers
    };
    try {
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
  async getPosts(params = {}) {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.append("page", params.page.toString());
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.tag) searchParams.append("tag", params.tag);
    return this.request(`/posts?${searchParams.toString()}`, {
      next: { revalidate: 600 }
      // Next.js 特性：默认缓存 10 分钟
    });
  }
  /**
   * 获取单篇文章详情
   */
  async getPostBySlug(slug) {
    try {
      return await this.request(`/posts/${slug}`, {
        next: { revalidate: 3600 }
        // 详情页缓存 1 小时
      });
    } catch (error) {
      return null;
    }
  }
};

// src/index.ts
var createClient = (config) => new BlogFlow(config);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BlogFlow,
  createClient
});
//# sourceMappingURL=index.js.map