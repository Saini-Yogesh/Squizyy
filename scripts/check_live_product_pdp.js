const https = require('https');

https.get({
  hostname: 'squizyy-store.myshopify.com',
  path: '/collections/all',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('Collections status:', res.statusCode);
    const links = [...html.matchAll(/href=["'](\/products\/[^"']+)["']/gi)].map(m => m[1]);
    console.log('Product links found:', [...new Set(links)]);
    if (links.length > 0) {
      checkProduct(links[0]);
    }
  });
});

function checkProduct(prodPath) {
  https.get({
    hostname: 'squizyy-store.myshopify.com',
    path: prodPath,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  }, (res) => {
    let phtml = '';
    res.on('data', c => phtml += c);
    res.on('end', () => {
      console.log('Product page status:', res.statusCode);
      // Check variants or data-variant-id
      const varIds = [...phtml.matchAll(/data-variant-id=["'](\d+)["']/gi)].map(m => m[1]);
      console.log('Variant IDs found in HTML:', [...new Set(varIds)]);
      const optSelect = phtml.match(/<select[^>]*variant[^>]*>[\s\S]*?<\/select>/i);
      console.log('Variant select dropdown:', optSelect ? optSelect[0] : 'None');
      const basePrice = phtml.match(/data-base-price=["']([^"']+)["']/i);
      console.log('data-base-price:', basePrice ? basePrice[1] : 'None');
    });
  });
}

