const https = require('https');
const http = require('http');

const STORE_DOMAIN = process.env.STORE_DOMAIN || 'squizyy-store.myshopify.com';
const STORE_PASSWORD = process.env.STORE_PASSWORD || '123456';

console.log('====================================================');
console.log('🚀 LIVE SHOPIFY STORE AUTOMATED END-TO-END TEST');
console.log(`🌐 Store Target: https://${STORE_DOMAIN}`);
console.log('====================================================\n');

let cookieJar = '';

function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        // Collect Set-Cookie headers
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
  console.log('🔑 [Step 1] Authenticating with store password...');
  
  // 1. First fetch /password to get authenticity token and initial cookies
  const initialRes = await request({
    hostname: STORE_DOMAIN,
    path: '/password',
    method: 'GET',
    headers: {
      'User-Agent': 'SquizyyAutomatedTester/1.0',
    },
  });

  // Extract authenticity token
  const tokenMatch = initialRes.body.match(/name="authenticity_token"\s+value="([^"]+)"/);
  const token = tokenMatch ? tokenMatch[1] : '';

  // 2. POST password to /password
  const postBody = new URLSearchParams({
    utf8: '✓',
    authenticity_token: token,
    password: STORE_PASSWORD,
  }).toString();

  const authRes = await request(
    {
      hostname: STORE_DOMAIN,
      path: '/password',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postBody),
        'User-Agent': 'SquizyyAutomatedTester/1.0',
        Cookie: cookieJar,
      },
    },
    postBody
  );

  console.log(`✅ Authentication response status: ${authRes.statusCode} (${authRes.headers.location || 'OK'})`);
}

async function testRoute(pathName, description) {
  try {
    const res = await request({
      hostname: STORE_DOMAIN,
      path: pathName,
      method: 'GET',
      headers: {
        'User-Agent': 'SquizyyAutomatedTester/1.0',
        Cookie: cookieJar,
      },
    });

    const isRedirect = res.statusCode >= 300 && res.statusCode < 400;
    const isSuccess = res.statusCode >= 200 && res.statusCode < 300;
    const location = res.headers.location ? ` -> ${res.headers.location}` : '';

    if (isSuccess || isRedirect) {
      console.log(`  ✅ [${res.statusCode}] ${pathName} ${location} — ${description}`);
      return { path: pathName, status: res.statusCode, ok: true, body: res.body };
    } else {
      console.log(`  ❌ [${res.statusCode}] ${pathName} — ${description}`);
      return { path: pathName, status: res.statusCode, ok: false, body: res.body };
    }
  } catch (err) {
    console.log(`  ❌ [ERR] ${pathName} — ${err.message}`);
    return { path: pathName, status: 0, ok: false, error: err.message };
  }
}

async function run() {
  await authenticate();

  console.log('\n🔍 [Step 2] Testing core customer pages & routes:');
  const routesToTest = [
    { path: '/', desc: 'Homepage' },
    { path: '/products/drizzy-squeezy-peanut-butter-19-4-oz', desc: 'Main PDP (Product Page)' },
    { path: '/collections/all', desc: 'All Products Collection Catalog' },
    { path: '/pages/our-story', desc: 'Our Story (Brand Journey)' },
    { path: '/pages/wholesale', desc: 'Wholesale B2B Inquiry Page' },
    { path: '/pages/store-locator', desc: 'Store Locator Page' },
    { path: '/cart', desc: 'Shopping Cart Page' },
  ];

  let passed = 0;
  let failed = 0;

  for (const r of routesToTest) {
    const result = await testRoute(r.path, r.desc);
    if (result.ok) passed++;
    else failed++;
  }

  console.log('\n====================================================');
  console.log(`📊 LIVE TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

run();
