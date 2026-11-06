const https = require('https');
const fs = require('fs');

const STORE_URL = 'https://squizyy-store.myshopify.com';
const STORE_PASSWORD = process.env.SHOPIFY_STORE_PASSWORD || 'squizyy2025';

function fetchPage(url, cookie = '') {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'Cookie': cookie, 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  // Login first to bypass storefront password if needed
  const postData = 'form_type=storefront_password&utf8=%E2%9C%93&password=' + encodeURIComponent(STORE_PASSWORD);
  const authRes = await new Promise((resolve) => {
    const req = https.request(STORE_URL + '/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      resolve(res);
    });
    req.write(postData);
    req.end();
  });

  const cookie = (authRes.headers['set-cookie'] || []).map(c => c.split(';')[0]).join('; ');
  const home = await fetchPage(STORE_URL + '/', cookie);
  fs.writeFileSync('scripts/live_home.html', home.body, 'utf8');
  console.log('Saved live_home.html, size:', home.body.length);

  const keywords = ['Drizzle', 'drizzle', 'Drizzy', 'drizzy', 'Claim 10%', 'RetroNewsletterModal', 'story-tv', 'shopify-forms'];
  for (const kw of keywords) {
    const matches = home.body.split(kw).length - 1;
    console.log(`Keyword "${kw}": count = ${matches}`);
  }
}

run().catch(console.error);

