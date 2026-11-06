const https = require('https');

// Squizyy password storefront session
// Let's first submit password or inspect password page vs main page
const req = https.get({
  hostname: 'squizyy-store.myshopify.com',
  path: '/',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode, 'Length:', html.length);
    console.log('Title:', html.match(/<title>([^<]+)<\/title>/i)?.[1]);
    const fonts = html.match(/@font-face[^}]+}/gi);
    console.log('Font-faces found in page:', fonts);
    const otfMatch = html.match(/https:[^"'\s)]+\.otf[^"'\s)]*/gi) || html.match(/\/\/[^"'\s)]+\.otf[^"'\s)]*/gi);
    console.log('OTF URLs found in page:', otfMatch);
  });
});

