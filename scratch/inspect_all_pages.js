const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const pages = [
  { name: 'Home', file: 'getdrizzy/html/index.html' },
  { name: 'SproutsContest', file: 'getdrizzy/html/pages/sproutslaunchwinflightstoaustralia' },
  { name: 'OurStory', file: 'getdrizzy/html/pages/our-story' },
  { name: 'StoreLocator', file: 'getdrizzy/html/pages/store-locator' },
  { name: 'Wholesale', file: 'getdrizzy/html/pages/wholesale' },
  { name: 'Rules', file: 'getdrizzy/html/pages/rules' },
  { name: 'CollectionsAll', file: 'getdrizzy/html/collections/all' },
  { name: 'ProductDrizzy', file: 'getdrizzy/html/products/drizzy-squeezy-peanut-butter-19-4-oz' },
  { name: 'Cart', file: 'getdrizzy/html/cart' }
];

const results = {};

for (const p of pages) {
  const filePath = path.resolve(p.file);
  if (!fs.existsSync(filePath)) {
    results[p.name] = { error: 'file not found: ' + filePath };
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html);
  
  const sections = [];
  $('main#MainContent > *, #MainContent > *').each((i, el) => {
    const id = $(el).attr('id') || '';
    const tag = el.tagName;
    const cls = $(el).attr('class') || '';
    const h1 = $(el).find('h1, h2').map((_, h) => $(h).text().trim()).get();
    sections.push({ tag, id, cls: cls.split(' ').slice(0, 3).join(' '), headings: h1 });
  });

  results[p.name] = {
    title: $('title').text().trim(),
    sectionCount: sections.length,
    sections: sections
  };
}

console.log(JSON.stringify(results, null, 2));
