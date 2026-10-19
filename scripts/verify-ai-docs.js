#!/usr/bin/env node

/**
 * AI Documentation Verification & Drift Detection Script
 *
 * Validates that all file paths referenced in docs/ai/PROJECT_MAP.md exist on disk
 * and inspects Git changes to detect newly added or removed files that should be
 * documented, preventing documentation drift without expensive repository scanning.
 *
 * Zero external dependencies (uses standard Node.js libraries only).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const PROJECT_MAP_PATH = path.join(ROOT_DIR, 'docs', 'ai', 'PROJECT_MAP.md');
const API_REF_PATH = path.join(ROOT_DIR, 'docs', 'ai', 'API_REFERENCE.md');

const isSuggestMode = process.argv.includes('--suggest');

console.log('🔍 Checking AI Project Documentation Integrity...\n');

let hasErrors = false;
let warningsCount = 0;

// 1. Verify existence of PROJECT_MAP.md
if (!fs.existsSync(PROJECT_MAP_PATH)) {
  console.error(`❌ Missing critical file: ${path.relative(ROOT_DIR, PROJECT_MAP_PATH)}`);
  process.exit(1);
}

const projectMapContent = fs.readFileSync(PROJECT_MAP_PATH, 'utf8');

// 2. Extract and verify file paths mentioned in PROJECT_MAP.md (e.g. `client/src/...` or `server/src/...`)
const pathRegex = /`((?:client|server|scripts|docs)\/[^`]+)`/g;
let match;
const referencedPaths = new Set();

while ((match = pathRegex.exec(projectMapContent)) !== null) {
  const relPath = match[1].trim();
  // Skip wildcards or ellipses
  if (relPath.includes('*') || relPath.includes('...') || relPath.endsWith('/')) {
    continue;
  }
  referencedPaths.add(relPath);
}

console.log(`📋 Found ${referencedPaths.size} concrete file references in PROJECT_MAP.md`);

const missingFiles = [];
referencedPaths.forEach((relPath) => {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    missingFiles.push(relPath);
  }
});

if (missingFiles.length > 0) {
  console.error('\n❌ Broken references in docs/ai/PROJECT_MAP.md:');
  missingFiles.forEach((f) => console.error(`   - Missing file: ${f}`));
  hasErrors = true;
} else {
  console.log('✅ All referenced files in PROJECT_MAP.md exist on disk.');
}

// 3. Git-based Drift Detection
try {
  const gitStatus = execSync('git status --porcelain', { cwd: ROOT_DIR, encoding: 'utf8' });
  const statusLines = gitStatus.split('\n').filter(Boolean);

  const untrackedFiles = [];
  const modifiedRoutes = [];

  statusLines.forEach((line) => {
    const status = line.slice(0, 2).trim();
    const filePath = line.slice(3).trim();

    // Check newly added source files in client/src or server/src
    if (status === '??' || status === 'A') {
      const isSourceFile =
        (filePath.startsWith('client/src/') || filePath.startsWith('server/src/')) &&
        (filePath.endsWith('.jsx') || filePath.endsWith('.js'));

      // If it's a CSS module, check if its companion component is tracked
      const isCssModule = filePath.endsWith('.module.css');
      const companionJsx = filePath.replace('.module.css', '.jsx');

      if (isSourceFile && !projectMapContent.includes(filePath)) {
        untrackedFiles.push(filePath);
      } else if (isCssModule && !projectMapContent.includes(filePath) && !projectMapContent.includes(companionJsx)) {
        untrackedFiles.push(filePath);
      }
    }

    // Check modified backend routes
    if (filePath.startsWith('server/src/routes/')) {
      modifiedRoutes.push(filePath);
    }
  });

  if (untrackedFiles.length > 0) {
    console.warn('\n⚠️  Documentation Drift Detected (New files not mentioned in PROJECT_MAP.md):');
    untrackedFiles.forEach((f) => {
      warningsCount++;
      console.warn(`   - ${f}`);
    });

    if (isSuggestMode) {
      console.log('\n💡 Suggested entries for docs/ai/PROJECT_MAP.md:');
      untrackedFiles.forEach((f) => {
        console.log(`   | \`${f}\` | Component / Service | Description |`);
      });
    } else {
      console.log('\n👉 Run with --suggest to see suggested markdown entries.');
    }
  }

  if (modifiedRoutes.length > 0) {
    console.log(`\nℹ️  Backend route changes detected (${modifiedRoutes.length} files).`);
    console.log('   Please ensure docs/ai/API_REFERENCE.md reflects any endpoint changes.');
  }
} catch {
  console.log('ℹ️  Git not detected or no repository found. Skipping Git-based drift checks.');
}

// Summary
console.log('\n----------------------------------------');
if (hasErrors) {
  console.error('❌ Documentation verification FAILED. Please fix broken file references.');
  process.exit(1);
} else {
  console.log(`✅ AI documentation verified successfully! (${warningsCount} warnings)`);
  process.exit(0);
}
