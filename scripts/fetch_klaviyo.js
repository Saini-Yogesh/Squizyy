const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const klaviyoConfigUrl = 'https://static.klaviyo.com/onsite/js/RDKKLt/klaviyo.js?company_id=RDKKLt';
  const js = await fetch(klaviyoConfigUrl);
  console.log('Klaviyo JS length:', js.length);

  // Look for form IDs or API calls
  const formMatches = js.match(/[A-Za-z0-9_-]{6,}/g);
  // Also check klaviyo onsite forms endpoint
  const formsUrl = 'https://a.klaviyo.com/onsite/components?company_id=RDKKLt';
  try {
    const formsData = await fetch(formsUrl);
    console.log('Forms API:', formsData.slice(0, 500));
    require('fs').writeFileSync('scripts/klaviyo_forms.json', formsData, 'utf8');
  } catch (e) {
    console.error(e);
  }
}

run().catch(console.error);

