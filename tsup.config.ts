import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // 入口文件
  format: ['cjs', 'esm'],  // 输出 CommonJS (旧) 和 ESM (新) 两种格式
  dts: true,               // 自动生成 .d.ts 类型定义文件
  splitting: false,
  sourcemap: true,
  clean: true,             // 每次打包前清空 dist 目录
});