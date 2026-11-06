const https = require('https');

function getJson(path) {
  https.get({
    hostname: 'squizyy-store.myshopify.com',
    path: path,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  }, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('Path:', path, 'Status:', res.statusCode);
      try {
        const json = JSON.parse(data);
        console.log('JSON data:', JSON.stringify(json, null, 2).slice(0, 1500));
      } catch (e) {
        console.log('Not JSON, preview:', data.slice(0, 300));
      }
    });
  });
}

getJson('/products.json');

