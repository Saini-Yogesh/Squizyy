const fs = require('fs');
const path = require('path');

const serverDir = path.join(__dirname, '..', 'server', 'src');

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

walk(serverDir, (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.js', '.json'].includes(ext)) return;

  const original = fs.readFileSync(filePath, 'utf8');

  let updated = original
    .replace(/drizzy-squeezy-peanut-butter-19-4-oz/g, 'squizyy-squeezy-peanut-butter-19-4-oz')
    .replace(/drizzy-peanut-drizzle/g, 'squizyy-peanut-drizzle')
    .replace(/drizzy-peanut-butter/g, 'squizyy-peanut-butter')
    .replace(/DRIZZY-PB-001/g, 'SQUIZYY-PB-001')
    .replace(/DRIZZY-FS-006/g, 'SQUIZYY-FS-006')
    .replace(/DRIZZY-CASE-006/g, 'SQUIZYY-CASE-006')
    .replace(/drizzy_orders/g, 'squizyy_orders')
    .replace(/drizzy_db/g, 'squizyy_db')
    .replace(/Drizzy Squeezy Peanut Butter 19\.4 Oz/g, 'Squizyy Squeezy Peanut Butter 19.4 Oz')
    .replace(/Drizzy Squeezy Peanut Butter/g, 'Squizyy Squeezy Peanut Butter')
    .replace(/Drizzy API Server/g, 'Squizyy API Server')
    .replace(/Drizzy Server/g, 'Squizyy Server')
    .replace(/Drizzy Store/g, 'Squizyy Store')
    .replace(/Drizzy™/g, 'Squizyy™')
    .replace(/Drizzy/g, 'Squizyy')
    .replace(/DRIZZY/g, 'SQUIZYY');

  // Also replace any standalone 'drizzy'
  updated = updated.replace(/\bdrizzy\b/g, 'squizyy');

  if (original !== updated) {
    fs.writeFileSync(filePath, updated, 'utf8');
    modifiedCount++;
    console.log(`Updated server file: ${path.relative(serverDir, filePath)}`);
  }
});

console.log(`Rebranded ${modifiedCount} files in server/src`);

