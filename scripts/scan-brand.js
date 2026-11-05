const fs = require('fs');
const path = require('path');

const targets = [
  'squizyy-shopify-theme',
  'client/src',
  'client/index.html',
  'server/src',
  'shopify-products-import.csv',
  'package.json'
];

const ignore = ['node_modules', '.git', 'dist', 'build', '.gemini'];
let fileMatches = {};

function scan(item) {
  if (!fs.existsSync(item)) return;
  const stat = fs.statSync(item);
  if (stat.isDirectory()) {
    if (ignore.includes(path.basename(item))) return;
    fs.readdirSync(item).forEach(child => scan(path.join(item, child)));
  } else {
    const ext = path.extname(item).toLowerCase();
    if (['.jpg', '.png', '.ttf', '.otf', '.woff2', '.jpeg', '.webp'].includes(ext)) return;
    try {
      const text = fs.readFileSync(item, 'utf8');
      const matches = text.match(/drizzy/gi);
      if (matches && matches.length > 0) {
        fileMatches[item] = matches.length;
      }
    } catch (e) {}
  }
}

targets.forEach(t => scan(t));

console.log(`Found drizzy references in ${Object.keys(fileMatches).length} files:`);
for (const [file, count] of Object.entries(fileMatches)) {
  console.log(`[${count}] ${file}`);
}

