const http = require('http');

function testUrl(url, options = {}, postData = null) {
  return new Promise((resolve) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, data: data.substring(0, 150) });
      });
    });
    req.on('error', (e) => resolve({ status: 'ERR', error: e.message }));
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('=== TESTING API & CLIENT ENDPOINTS ===\n');

  // 1. Health
  console.log('1. Health check:');
  console.log(await testUrl('http://localhost:5000/api/health'));

  // 2. Products
  console.log('\n2. Products API:');
  console.log(await testUrl('http://localhost:5000/api/products'));

  // 3. Single Product
  console.log('\n3. Product Slug API:');
  console.log(await testUrl('http://localhost:5000/api/products/drizzy-squeezy-peanut-butter-19-4-oz'));

  // 4. Stores
  console.log('\n4. Stores API:');
  console.log(await testUrl('http://localhost:5000/api/stores?query=Dallas'));

  // 5. Reviews
  console.log('\n5. Reviews API:');
  console.log(await testUrl('http://localhost:5000/api/reviews'));

  // 6. Newsletter POST
  console.log('\n6. Newsletter POST:');
  console.log(await testUrl('http://localhost:5000/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'peanutlover@example.com' }));

  // 7. Wholesale POST
  console.log('\n7. Wholesale POST:');
  console.log(await testUrl('http://localhost:5000/api/wholesale', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { name: 'Alice', email: 'alice@cafe.com', company: 'Alice Smoothie Bar', estimatedLocations: '1-5' }));

  // 8. Contest POST
  console.log('\n8. Contest POST:');
  console.log(await testUrl('http://localhost:5000/api/contest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { firstName: 'Sam', lastName: 'Taylor', email: 'sam@sproutsfan.com', agreedRules: true }));

  // 9. Admin Stats (Authorized)
  console.log('\n9. Admin Stats (Authorized):');
  console.log(await testUrl('http://localhost:5000/api/admin/stats', {
    headers: { 'x-admin-key': 'drizzy_admin_secret_key_2026' }
  }));

  // 10. Admin Stats (Unauthorized - should return 401)
  console.log('\n10. Admin Stats (Unauthorized):');
  console.log(await testUrl('http://localhost:5000/api/admin/stats'));

  // 11. Frontend Vite Server
  console.log('\n11. Frontend Vite Server (http://localhost:5173/):');
  console.log(await testUrl('http://localhost:5173/'));
}

runTests();
