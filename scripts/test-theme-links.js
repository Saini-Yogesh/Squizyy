const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sectionsDir = path.join(root, 'squizyy-shopify-theme', 'sections');
const snippetsDir = path.join(root, 'squizyy-shopify-theme', 'snippets');
const templatesDir = path.join(root, 'squizyy-shopify-theme', 'templates');
const assetsDir = path.join(root, 'squizyy-shopify-theme', 'assets');
const layoutDir = path.join(root, 'squizyy-shopify-theme', 'layout');

console.log('==============================================');
console.log('🤖 SHOPIFY THEME AUTOMATED AUDIT SUITE');
console.log('==============================================\n');

const assets = new Set(fs.readdirSync(assetsDir));
const sections = new Set(fs.readdirSync(sectionsDir).map(f => f.replace('.liquid', '')));
const snippets = new Set(fs.readdirSync(snippetsDir).map(f => f.replace('.liquid', '')));
const templates = new Set(fs.readdirSync(templatesDir).map(f => f.replace('.json', '')));

let errors = [];
let warnings = [];
let totalLinksChecked = 0;
let totalAssetsChecked = 0;
let totalSnippetsChecked = 0;

function checkFile(dir, file) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');

  // 1. Snippet renders
  const renderRegex = /\{%[-\s]*render\s+'([^']+)'/g;
  let match;
  while ((match = renderRegex.exec(content)) !== null) {
    totalSnippetsChecked++;
    const snippetName = match[1];
    if (!snippets.has(snippetName)) {
      errors.push(`[${file}] Renders non-existent snippet: '${snippetName}'`);
    }
  }

  // 2. Asset URLs
  const assetRegex = /'([^']+)'\s*\|\s*asset_url/g;
  while ((match = assetRegex.exec(content)) !== null) {
    totalAssetsChecked++;
    const assetName = match[1];
    if (!assets.has(assetName)) {
      errors.push(`[${file}] References non-existent asset: '${assetName}'`);
    }
  }

  // 3. Link targets
  const linkRegex = /href=["'](\/[^"'#\s]*)["']/g;
  while ((match = linkRegex.exec(content)) !== null) {
    totalLinksChecked++;
    const url = match[1];
    const validPrefixes = [
      '/',
      '/collections',
      '/products',
      '/pages',
      '/cart',
      '/checkout',
      '/policies'
    ];
    const isValid = validPrefixes.some(p => url === '/' || url.startsWith(p));
    if (!isValid) {
      warnings.push(`[${file}] Contains non-standard internal link: '${url}'`);
    }
  }
}

// Audit layout, sections, and snippets
fs.readdirSync(layoutDir).filter(f => f.endsWith('.liquid')).forEach(f => checkFile(layoutDir, f));
fs.readdirSync(sectionsDir).filter(f => f.endsWith('.liquid')).forEach(f => checkFile(sectionsDir, f));
fs.readdirSync(snippetsDir).filter(f => f.endsWith('.liquid')).forEach(f => checkFile(snippetsDir, f));

// Audit templates (JSON 2.0 structure & section availability)
let templateSectionsChecked = 0;
fs.readdirSync(templatesDir).filter(f => f.endsWith('.json')).forEach(f => {
  try {
    const raw = fs.readFileSync(path.join(templatesDir, f), 'utf8');
    const json = JSON.parse(raw);
    if (json.sections) {
      for (const [key, sec] of Object.entries(json.sections)) {
        templateSectionsChecked++;
        if (!sections.has(sec.type)) {
          errors.push(`[Template: ${f}] Uses non-existent section type: '${sec.type}'`);
        }
      }
    }
  } catch (err) {
    errors.push(`[Template: ${f}] Invalid JSON: ${err.message}`);
  }
});

console.log(`📊 Total Assets Checked: ${totalAssetsChecked}`);
console.log(`📊 Total Snippets Checked: ${totalSnippetsChecked}`);
console.log(`📊 Total Links Checked: ${totalLinksChecked}`);
console.log(`📊 Total Template Sections Checked: ${templateSectionsChecked}\n`);

if (errors.length === 0) {
  console.log('✅ PASS: Zero asset or snippet linkage errors found.');
} else {
  console.log(`❌ FAIL: Found ${errors.length} linkage errors:`);
  errors.forEach(e => console.log('   - ' + e));
}

if (warnings.length > 0) {
  console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
  warnings.forEach(w => console.log('   - ' + w));
} else {
  console.log('✅ PASS: Zero routing warnings found.');
}

console.log('\n==============================================');

