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

  const resOurStory = await req({ hostname: STORE_DOMAIN, path: '/pages/our-story', method: 'GET' });
  console.log('/pages/our-story has story-hero:', resOurStory.body.includes('story-hero'));
  console.log('/pages/our-story has story-timeline:', resOurStory.body.includes('story-timeline'));

  const resWholesale = await req({ hostname: STORE_DOMAIN, path: '/pages/wholesale', method: 'GET' });
  console.log('/pages/wholesale has wholesale-form:', resWholesale.body.includes('wholesale-form'));

  const resLocator = await req({ hostname: STORE_DOMAIN, path: '/pages/store-locator', method: 'GET' });
  console.log('/pages/store-locator has store-locator:', resLocator.body.includes('store-locator'));

  const resRules = await req({ hostname: STORE_DOMAIN, path: '/pages/official-rules', method: 'GET' });
  console.log('/pages/official-rules has rules-content:', resRules.body.includes('rules-content'));
}

run().catch(console.error);
