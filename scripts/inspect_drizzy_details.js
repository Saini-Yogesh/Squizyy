const fs = require('fs');
const https = require('https');

const html = fs.readFileSync('scripts/drizzy_home.html', 'utf8');

// Find desktop announcement bar
const idxAnn = html.indexOf('hidden lg:block');
if (idxAnn !== -1) {
  console.log('=== DESKTOP ANNOUNCEMENT BAR ===');
  console.log(html.substring(idxAnn - 50, idxAnn + 1000));
} else {
  const matchAnn = html.match(/announcement-bar[\s\S]*?<\/section>/i);
  console.log('=== FULL ANNOUNCEMENT BAR ===');
  console.log(matchAnn ? matchAnn[0] : 'not found');
}

// Find header/nav
const idxNav = html.indexOf('nav');
console.log('\n=== NAV OCCURRENCES ===');
const navMatches = [...html.matchAll(/<nav[\s\S]*?<\/nav>/gi)];
navMatches.forEach((m, i) => {
  console.log(`Nav ${i}:`, m[0].slice(0, 1000));
});

// Download sticker.png from getdrizzy
const stickerUrl = 'https://getdrizzy.co/cdn/shop/files/sticker.png?v=1786726875&width=600';
https.get(stickerUrl, (res) => {
  const chunks = [];
  res.on('data', c => chunks.push(c));
  res.on('end', () => {
    const buffer = Buffer.concat(chunks);
    fs.writeFileSync('scripts/drizzy_sticker_orig.png', buffer);
    console.log('Saved drizzy_sticker_orig.png, size:', buffer.length);
  });
});

