const fs = require('fs');

const html = fs.readFileSync('getdrizzy/html/index.html', 'utf8');

// Find all shopify-section divs
const sections = html.match(/<div id="shopify-section-[^"]*" class="shopify-section[^"]*">([\s\S]*?)<\/section>\s*<\/div>/g) || [];
console.log('Total sections in index.html:', sections.length);

sections.forEach((sec, idx) => {
  const idMatch = sec.match(/id="([^"]*)"/);
  const classMatch = sec.match(/class="([^"]*)"/);
  // Get first 300 chars of text content
  const text = sec.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 150);
  console.log(`\n================ SECTION ${idx + 1}: ${idMatch ? idMatch[1] : 'unknown'} ================`);
  console.log('Text preview:', text);
});
