const https = require('https');

https.get({
  hostname: 'getdrizzy.co',
  path: '/products/drizzy-squeezy-peanut-butter-19-4-oz.js',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    try {
      const p = JSON.parse(data);
      console.log('Product title:', p.title);
      console.log('Variants:');
      p.variants.forEach(v => {
        console.log(`- ID: ${v.id}, Title: "${v.title}", Price: $${(v.price/100).toFixed(2)}, Compare: $${(v.compare_at_price/100).toFixed(2)}`);
      });
      console.log('Options:', p.options);
    } catch (e) {
      console.log('Preview:', data.slice(0, 500));
    }
  });
});

