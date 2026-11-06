const fs = require('fs');

const html = fs.readFileSync('getdrizzy/html/index.html', 'utf8');
const headEnd = html.indexOf('</head>');
const head = html.substring(0, headEnd);

const styleMatches = head.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
console.log('Total style tags in head:', styleMatches.length);

let combinedCss = '';
styleMatches.forEach((s, idx) => {
  const content = s.replace(/<style[^>]*>/, '').replace(/<\/style>/, '').trim();
  if (content.includes(':root') || content.includes('@font-face') || content.includes('color-scheme')) {
    console.log(`\n=== STYLE BLOCK ${idx + 1} ===`);
    console.log(content.substring(0, 500) + '...\n');
    combinedCss += content + '\n\n';
  }
});

fs.writeFileSync('client/src/assets/css/theme-vars.css', combinedCss);
console.log('Saved theme-vars.css');
