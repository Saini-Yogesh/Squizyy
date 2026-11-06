const https = require('https');
const fs = require('fs');

function fetchFile(targetUrl, cb) {
  const u = new URL(targetUrl);
  const options = {
    hostname: u.hostname,
    path: u.pathname + u.search,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  };
  https.get(options, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => cb(data));
  }).on('error', err => console.error(err));
}

fetchFile('https://getdrizzy.co/cdn/shop/t/3/assets/custom-styles.css', (customCss) => {
  console.log('Custom CSS length:', customCss.length);
  // Search for announcement / marquee / nav / header / sticker
  fs.writeFileSync('scripts/drizzy_custom_styles.css', customCss);
  console.log('Saved custom-styles.css');
});

fetchFile('https://getdrizzy.co/cdn/shop/t/3/assets/styles.css', (stylesCss) => {
  console.log('Styles CSS length:', stylesCss.length);
  fs.writeFileSync('scripts/drizzy_styles.css', stylesCss);
  console.log('Saved styles.css');
});

