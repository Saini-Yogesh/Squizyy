const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, '..', 'squizyy-shopify-theme', 'assets'),
  path.join(__dirname, '..', 'client', 'public', 'assets', 'images')
];

const assetCopies = [
  { src: 'drizzy-1.jpg', dest: 'squizyy-1.jpg' },
  { src: 'drizzy-peanut-left.png', dest: 'squizyy-peanut-left.png' },
  { src: 'drizzy-peanut-left_1.png', dest: 'squizyy-peanut-left_1.png' },
  { src: 'drizzy-peanut-left_2.png', dest: 'squizyy-peanut-left_2.png' },
  { src: 'USADRIZZYFRONTcopy.jpg', dest: 'USASQUIZYYFRONTcopy.jpg' },
  { src: 'USADRIZZYBACKcopy.jpg', dest: 'USASQUIZYYBACKcopy.jpg' },
  { src: 'USADRIZZYGOODcopy.jpg', dest: 'USASQUIZYYGOODcopy.jpg' },
  { src: 'USADRIZZYHOWTOcopy.jpg', dest: 'USASQUIZYYHOWTOcopy.jpg' },
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  assetCopies.forEach(({ src, dest }) => {
    const srcPath = path.join(dir, src);
    const destPath = path.join(dir, dest);
    if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${src} -> ${dest} in ${path.relative(process.cwd(), dir)}`);
    }
  });
});

console.log('Asset copies complete.');

