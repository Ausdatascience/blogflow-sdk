// src/index.ts

// 导出所有类型，方便用户使用
export * from './types';

// 导出核心客户端
export * from './client';

// 也可以导出一个默认的工厂函数
import { BlogFlow } from './client';
import { BlogFlowConfig } from './types';

export const createClient = (config: BlogFlowConfig) => new BlogFlow(config);