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
  await req({ hostname: STORE_DOMAIN, path: '/password', method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(data) } }, data);

  const resContact = await req({ hostname: STORE_DOMAIN, path: '/pages/contact', method: 'GET' });
  console.log('/pages/contact status:', resContact.status);
  console.log('Contains SAY HELLO TO SQUIZYY:', resContact.body.includes('SAY HELLO TO SQUIZYY'));
  console.log('Contains Send a Message or Feedback:', resContact.body.includes('Send a Message or Feedback'));
  console.log('Contains contact form action:', resContact.body.includes('action="/contact#contact_form"') || resContact.body.includes('action="/contact"'));
  console.log('Contains WhatsApp Chat:', resContact.body.includes('WHATSAPP CHAT'));
  console.log('Contains support@squizyy.in:', resContact.body.includes('support@squizyy.in'));
  console.log('Contains Topic dropdown:', resContact.body.includes('Order &amp; Delivery Tracking') || resContact.body.includes('Order & Delivery Tracking'));
  console.log('Does NOT show empty placeholder text:', !resContact.body.includes("Please edit this page's content in your Shopify Admin"));
}

run().catch(console.error);

