const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const html = await fetch('https://getdrizzy.co/');
  fs.writeFileSync('scripts/getdrizzy_home.html', html, 'utf8');
  console.log('Saved getdrizzy_home.html, size:', html.length);
  
  // Find modal / popup references
  const lines = html.split('\n');
  lines.forEach((l, i) => {
    if (l.toLowerCase().includes('modal') || l.toLowerCase().includes('popup') || l.toLowerCase().includes('tv') || l.toLowerCase().includes('10%')) {
      if (l.length < 300) console.log(`${i+1}: ${l.trim()}`);
    }
  });
}

run().catch(console.error);

