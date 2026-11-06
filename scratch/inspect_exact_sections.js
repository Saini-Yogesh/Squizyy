const fs = require('fs');

const html = fs.readFileSync('getdrizzy/html/index.html', 'utf8');

function getSectionHtml(id) {
  const startStr = `<div id="${id}"`;
  const start = html.indexOf(startStr);
  if (start === -1) {
    console.log('Not found:', id);
    return;
  }
  const endStr = '</div>';
  // Let's find matching section end
  const nextSection = html.indexOf('<div id="shopify-section-', start + 10);
  const chunk = html.substring(start, nextSection !== -1 ? nextSection : start + 5000);
  console.log(`\n=== SECTION ${id} (Length: ${chunk.length}) ===`);
  console.log(chunk.substring(0, 1000) + '...\n');
}

getSectionHtml('shopify-section-sections--22221105168555__aee8d273-a723-4121-98fe-3e6743d9dbc4');
getSectionHtml('shopify-section-template--22221105463467__hero_DqxALE');
getSectionHtml('shopify-section-template--22221105463467__comparison_k3FRjd');
