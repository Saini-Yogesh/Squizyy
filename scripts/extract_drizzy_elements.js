const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'getdrizzy.co',
  path: '/',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
};

https.get(options, (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    fs.writeFileSync('scripts/drizzy_home.html', html);
    console.log('Saved drizzy_home.html, length:', html.length);
    
    // Find announcement bar section
    const ann = html.match(/<section[^>]*announcement[^>]*>[\s\S]*?<\/section>/i) ||
                html.match(/<div[^>]*announcement[^>]*>[\s\S]*?<\/div>/i) ||
                html.match(/FREE SHIPPING ON ORDERS[\s\S]{0,1000}/i);
    console.log('\n--- ANNOUNCEMENT BAR HTML ---');
    console.log(ann ? ann[0].slice(0, 1000) : 'not found');

    // Find header
    const hdr = html.match(/<header[\s\S]*?<\/header>/i);
    console.log('\n--- HEADER HTML ---');
    console.log(hdr ? hdr[0].slice(0, 1500) : 'not found');

    // Find sticker
    const sticker = html.match(/<[^>]+(sticker|badge|SHAKE)[\s\S]{0,1000}/i) ||
                    html.match(/SHAKE\.[\s\S]{0,500}/i);
    console.log('\n--- STICKER HTML ---');
    console.log(sticker ? sticker[0].slice(0, 1000) : 'not found');
  });
});

