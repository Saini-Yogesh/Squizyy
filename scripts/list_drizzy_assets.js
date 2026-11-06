const fs = require('fs');
const html = fs.readFileSync('scripts/drizzy_home.html', 'utf8');
const matches = [...html.matchAll(/cdn\/shop\/files\/[^"'<>\s]+\.(png|svg|webp|jpg)/gi)].map(m => m[0]);
console.log('Files found:', [...new Set(matches)]);

