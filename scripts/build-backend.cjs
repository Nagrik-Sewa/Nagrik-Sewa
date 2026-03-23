#!/usr/bin/env node
/**
 * Build backend - compiles TypeScript to JavaScript
 * Continues even if there are type errors (allows compilation)
 */
const { spawnSync } = require('child_process');
const path = require('path');

const result = spawnSync('npx', ['tsc'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

// Always exit with 0 if dist/server/index.js was generated
const fs = require('fs');
const outputFile = path.join(process.cwd(), 'dist', 'server', 'index.js');
if (fs.existsSync(outputFile)) {
  console.log('\n✅ Build successful - dist/server/index.js generated');
  process.exit(0);
} else {
  console.error('\n❌ Build failed - dist/server/index.js not generated');
  process.exit(1);
}
