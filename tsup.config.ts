import { defineConfig } from 'tsup';
import { execSync } from 'child_process';

export default defineConfig({
  entry: {
    index: 'src/index.ts',   // Default entry
    core: 'src/core.ts',     // Core logic entry
    react: 'src/react.ts',   // React UI entry
  },
  format: ['cjs', 'esm'],  // Output CommonJS (legacy) and ESM (modern) formats
  dts: true,               // Automatically generate .d.ts type definition files
  splitting: false,
  sourcemap: true,
  clean: true,             // Clean dist directory before each build
  
  // Generate CSS files after build
  onSuccess: async () => {
    console.log('\n🎨 Generating theme CSS files...')
    try {
      execSync('npx tsx scripts/generate-css.ts', { stdio: 'inherit' })
    } catch (error) {
      console.error('❌ Failed to generate CSS files:', error)
    }
  },
});