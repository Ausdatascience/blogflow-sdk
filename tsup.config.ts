import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Entry file
  format: ['cjs', 'esm'],  // Output CommonJS (legacy) and ESM (modern) formats
  dts: true,               // Automatically generate .d.ts type definition files
  splitting: false,
  sourcemap: true,
  clean: true,             // Clean dist directory before each build
});