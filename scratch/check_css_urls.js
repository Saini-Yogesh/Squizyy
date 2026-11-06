const fs = require('fs');

const css = fs.readFileSync('client/src/assets/css/styles.css', 'utf8');
const urls = css.match(/url\([^\)]+\)/g) || [];
console.log('Total URLs in styles.css:', urls.length);
urls.slice(0, 20).forEach(u => console.log(' - ' + u));
