const https = require('https');
const STORE_DOMAIN = 'squizyy-store.myshopify.com';
const STORE_PASSWORD = '123456';
let cookieJar = '';

function req(options, postData) {
  return new Promise((resolve, reject) => {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Cookie': cookieJar
    };
    options.headers = { ...headers, ...options.headers };
    const r = https.request(options, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        if (res.headers['set-cookie']) {
          const c = res.headers['set-cookie'].map(s => s.split(';')[0]).join('; ');
          cookieJar = cookieJar ? cookieJar + '; ' + c : c;
        }
        resolve({ status: res.statusCode, headers: res.headers, body: d });
      });
    });
    r.on('error', reject);
    if (postData) r.write(postData);
    r.end();
  });
}

async function run() {
  const p = await req({ hostname: STORE_DOMAIN, path: '/password', method: 'GET' });
  const m = p.body.match(/name="authenticity_token"\s+value="([^"]+)"/);
  const token = m ? m[1] : '';
  const data = 'form_type=storefront_password&utf8=%E2%9C%93&authenticity_token=' + encodeURIComponent(token) + '&password=' + encodeURIComponent(STORE_PASSWORD);
  await req({
    hostname: STORE_DOMAIN,
    path: '/password',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  }, data);

  const art = await req({
    hostname: STORE_DOMAIN,
    path: '/blogs/news/introducing-squizyy-a-new-beginning-in-peanut-butter',
    method: 'GET'
  });
  console.log('Article HTTP Status:', art.status);
  console.log('Has split grid layout:', art.body.includes('article-split-grid'));
  console.log('Has left column (media & buy card):', art.body.includes('article-left-col'));
  console.log('Has right column (content card):', art.body.includes('article-right-col'));
  console.log('Has sticky product card with ₹499 price:', art.body.includes('product-card-price'));
  console.log('Has BUY NOW CTA button:', art.body.includes('product-card-buy-btn'));
  console.log('Has natural title:', art.body.includes('Introducing Squizyy – A New Beginning in Peanut Butter!'));
}

run().catch(console.error);
