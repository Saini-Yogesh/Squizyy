const fs = require('fs');

const html = fs.readFileSync('getdrizzy/html/index.html', 'utf8');

// Find all top-level elements inside <body>
const bodyStart = html.indexOf('<body');
const bodyEnd = html.indexOf('</body>');
const bodyContent = html.substring(bodyStart, bodyEnd);

console.log('Body length:', bodyContent.length);

// Let's find all tags directly inside body or major divisions
const divisions = bodyContent.match(/<(header|footer|nav|main|section|div id="[^"]*" class="shopify-section[^"]*")[^>]*>/gi) || [];
console.log('Top level elements:');
divisions.forEach(d => console.log(' - ' + d));
