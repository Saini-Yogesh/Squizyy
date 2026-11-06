const https = require('https');

const STORE_DOMAIN = process.env.STORE_DOMAIN || 'squizyy-store.myshopify.com';
const STORE_PASSWORD = process.env.STORE_PASSWORD || '123456';

let cookieJar = '';

function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const defaultHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    };
    if (cookieJar) {
      defaultHeaders['Cookie'] = cookieJar;
    }
    options.headers = { ...defaultHeaders, ...options.headers };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.headers['set-cookie']) {
          const newCookies = res.headers['set-cookie']
            .map((c) => c.split(';')[0])
            .join('; ');
          cookieJar = cookieJar ? `${cookieJar}; ${newCookies}` : newCookies;
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', (err) => reject(err));

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function authenticate() {
  console.log('🔑 Authenticating with store password...');
  const initialRes = await request({
    hostname: STORE_DOMAIN,
    path: '/password',
    method: 'GET',
  });

  const tokenMatch = initialRes.body.match(/name="authenticity_token"\s+value="([^"]+)"/);
  const authToken = tokenMatch ? tokenMatch[1] : '';

  const postData = `form_type=storefront_password&utf8=%E2%9C%93&authenticity_token=${encodeURIComponent(
    authToken
  )}&password=${encodeURIComponent(STORE_PASSWORD)}`;

  const loginRes = await request(
    {
      hostname: STORE_DOMAIN,
      path: '/password',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    },
    postData
  );

  console.log(`✅ Authenticated! HTTP Status: ${loginRes.statusCode}`);
}

async function verify() {
  await authenticate();

  console.log('\n--- 1. Testing /products/all ---');
  const resProductsAll = await request({
    hostname: STORE_DOMAIN,
    path: '/products/all',
    method: 'GET',
  });
  console.log('HTTP Status:', resProductsAll.statusCode);
  const hasMetaRefresh = resProductsAll.body.includes('http-equiv="refresh"') && resProductsAll.body.includes('/collections/all');
  const hasScriptRedirect = resProductsAll.body.includes('/collections/all');
  console.log('Has meta refresh to /collections/all:', hasMetaRefresh);
  console.log('Has script redirect to /collections/all:', hasScriptRedirect);

  console.log('\n--- 2. Testing /collections/all ---');
  const resCollectionsAll = await request({
    hostname: STORE_DOMAIN,
    path: '/collections/all',
    method: 'GET',
  });
  console.log('HTTP Status:', resCollectionsAll.statusCode);
  console.log('Contains Collections/All Catalog:', resCollectionsAll.body.includes('collections/all') || resCollectionsAll.body.includes('catalog') || resCollectionsAll.body.includes('Products'));

  console.log('\n--- 3. Testing Homepage Header Typography & Assets ---');
  const resHome = await request({
    hostname: STORE_DOMAIN,
    path: '/',
    method: 'GET',
  });
  console.log('Home HTTP Status:', resHome.statusCode);
  console.log('Contains squizyy-dark-logo.svg:', resHome.body.includes('squizyy-dark-logo.svg'));
  console.log('Contains sticker.png:', resHome.body.includes('sticker.png'));
  console.log('Contains font-weight: 100 900 for Champ Black:', resHome.body.includes('font-weight: 100 900'));
  console.log('Contains 20px nav links:', resHome.body.includes('font-size: 20px'));
  console.log('Contains BUY SQUIZYY NOW:', resHome.body.includes('BUY SQUIZYY NOW'));
}

verify().catch(console.error);
