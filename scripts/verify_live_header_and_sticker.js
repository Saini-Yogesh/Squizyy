const https = require('https');

https.get({
  hostname: 'squizyy-store.myshopify.com',
  path: '/',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('Homepage status:', res.statusCode);
    
    // Check font-face rules in HTML
    const fontFaces = html.match(/@font-face\s*\{[^}]+\}/gi) || [];
    console.log('Total @font-face rules on live store:', fontFaces.length);
    const champRules = fontFaces.filter(f => f.includes('Champ Black'));
    console.log('Champ Black rules:', champRules);

    // Check announcement bar styles
    const annSize = html.match(/font-size:\s*14px/i);
    console.log('Announcement 14px found:', !!annSize);

    // Check sticker asset
    const stickerMatch = html.match(/["']([^"']+\/sticker\.png[^"']*)["']/i);
    console.log('Sticker URL on live store:', stickerMatch ? stickerMatch[1] : 'not found');
    if (stickerMatch) {
      let stickerUrl = stickerMatch[1];
      if (stickerUrl.startsWith('//')) stickerUrl = 'https:' + stickerUrl;
      https.get(stickerUrl, (sRes) => {
        console.log('Live sticker HTTP status:', sRes.statusCode, 'Content-Type:', sRes.headers['content-type'], 'Size:', sRes.headers['content-length']);
      });
    }
  });
});
