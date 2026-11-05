const fs = require('fs');
const path = require('path');

const clientDir = path.join(__dirname, '..', 'client', 'src');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      walk(full, callback);
    } else {
      callback(full);
    }
  });
}

let modifiedCount = 0;

walk(clientDir, (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jsx', '.js', '.css'].includes(ext)) return;

  const original = fs.readFileSync(filePath, 'utf8');

  let updated = original
    // Exact brand name replacements
    .replace(/drizzy-squeezy-peanut-butter-19-4-oz/g, 'squizyy-squeezy-peanut-butter-19-4-oz')
    .replace(/drizzy-peanut-drizzle/g, 'squizyy-peanut-drizzle')
    .replace(/drizzy-peanut-butter/g, 'squizyy-peanut-butter')
    .replace(/drizzy-dark-logo\.svg/g, 'squizyy-dark-logo.svg')
    .replace(/drizzy_cart/g, 'squizyy_cart')
    .replace(/drizzy_popup_seen/g, 'squizyy_popup_seen')
    .replace(/drizzy-1\.jpg/g, 'squizyy-1.jpg')
    .replace(/drizzy-peanut-left/g, 'squizyy-peanut-left')
    .replace(/Drizzy Squeezy Peanut Butter 19\.4 Oz/g, 'Squizyy Squeezy Peanut Butter 19.4 Oz')
    .replace(/Drizzy Squeezy Peanut Butter/g, 'Squizyy Squeezy Peanut Butter')
    .replace(/Drizzy Pty Limited/g, 'Squizyy Pty Limited')
    .replace(/Drizzy Pty Ltd/g, 'Squizyy Pty Ltd')
    .replace(/Drizzy USA/g, 'Squizyy USA')
    .replace(/Drizzy Duo/g, 'Squizyy Duo')
    .replace(/Drizzy Bottle/g, 'Squizyy Bottle')
    .replace(/Drizzy bottle/g, 'Squizyy bottle')
    .replace(/BUY DRIZZY PEANUT BUTTER NOW/g, 'BUY SQUIZYY PEANUT BUTTER NOW')
    .replace(/BUY DRIZZY NOW/g, 'BUY SQUIZYY NOW')
    .replace(/BUY DRIZZY/g, 'BUY SQUIZYY')
    .replace(/Shop Drizzy/g, 'Shop Squizyy')
    .replace(/Get Drizzy with it/g, 'Get Squizyy with it')
    .replace(/getdrizzy\.co/g, 'squizyy.com')
    .replace(/@getdrizzy/g, '@squizyy')
    .replace(/getdrizzy/g, 'squizyy')
    .replace(/Drizzy™/g, 'Squizyy™')
    .replace(/DRIZZY/g, 'SQUIZYY')
    .replace(/Drizzy/g, 'Squizyy');

  // Also replace any remaining lowercase standalone drizzy when used as word
  updated = updated.replace(/\bdrizzy\b/g, 'squizyy');

  if (original !== updated) {
    fs.writeFileSync(filePath, updated, 'utf8');
    modifiedCount++;
    console.log(`Updated client file: ${path.relative(clientDir, filePath)}`);
  }
});

console.log(`Rebranded ${modifiedCount} files in client/src`);

