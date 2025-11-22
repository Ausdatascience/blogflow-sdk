/**
 * Generate CSS Files Script
 * Generates static CSS files for all themes
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { generateCSS } from '../src/styles/generator.js'
import { themes } from '../src/styles/themes/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const OUTPUT_DIR = path.join(__dirname, '../dist/styles')

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Generate CSS for each theme
Object.entries(themes).forEach(([name, theme]) => {
  const css = generateCSS(theme)
  const filename = `${name}.css`
  const filepath = path.join(OUTPUT_DIR, filename)
  
  fs.writeFileSync(filepath, css, 'utf-8')
  console.log(`✅ Generated: ${filename}`)
})

console.log(`\n🎨 Generated ${Object.keys(themes).length} theme CSS files in dist/styles/`)

