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

  const resHome = await req({ hostname: STORE_DOMAIN, path: '/', method: 'GET' });
  console.log('Live home status:', resHome.status);
  console.log('Contains Shipping Policy link:', resHome.body.includes('Shipping Policy'));
  console.log('Contains Refund Policy link:', resHome.body.includes('Refund Policy'));
  console.log('Contains Stories & Blog link:', resHome.body.includes('Stories &amp; Blog') || resHome.body.includes('Stories & Blog'));
  console.log('Contains Contact Us link:', resHome.body.includes('Contact Us'));
  console.log('Contains FAQ link:', resHome.body.includes('>FAQ<'));
  console.log('Does NOT contain Win Flights:', !resHome.body.includes('Win Flights'));
}

run().catch(console.error);

