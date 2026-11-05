const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');

const fontPath = path.join(__dirname, '..', 'squizyy-shopify-theme', 'assets', 'Champ-Black.otf');
const buffer = fs.readFileSync(fontPath);
const font = opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));

function generateLogo(text, fontSize = 42, color = '#2C1329') {
  const pathObj = font.getPath(text, 0, 36, fontSize, { kerning: true });
  const bbox = pathObj.getBoundingBox();
  
  const padX = 4;
  const padY = 4;
  const minX = Math.floor(bbox.x1 - padX);
  const minY = Math.floor(bbox.y1 - padY);
  const width = Math.ceil(bbox.x2 - bbox.x1 + padX * 2);
  const height = Math.ceil(bbox.y2 - bbox.y1 + padY * 2);

  const pathData = pathObj.toPathData(2);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${minX} ${minY} ${width} ${height}" fill="none">
  <path d="${pathData}" fill="${color}" />
</svg>`;
}

const darkLogo = generateLogo('squizyy', 42, '#2C1329');
const whiteLogo = generateLogo('squizyy', 42, '#FFFBF2');

const targets = [
  path.join(__dirname, '..', 'squizyy-shopify-theme', 'assets', 'squizyy-dark-logo.svg'),
  path.join(__dirname, '..', 'squizyy-shopify-theme', 'assets', 'drizzy-dark-logo.svg'),
  path.join(__dirname, '..', 'client', 'public', 'assets', 'images', 'squizyy-dark-logo.svg'),
  path.join(__dirname, '..', 'client', 'public', 'assets', 'images', 'drizzy-dark-logo.svg'),
];

targets.forEach(t => {
  fs.mkdirSync(path.dirname(t), { recursive: true });
  fs.writeFileSync(t, darkLogo);
  console.log(`Saved: ${t}`);
});

// Also create white logo variants if needed
const whiteTargets = [
  path.join(__dirname, '..', 'squizyy-shopify-theme', 'assets', 'squizyy-white-logo.svg'),
  path.join(__dirname, '..', 'client', 'public', 'assets', 'images', 'squizyy-white-logo.svg'),
];
whiteTargets.forEach(t => {
  fs.mkdirSync(path.dirname(t), { recursive: true });
  fs.writeFileSync(t, whiteLogo);
  console.log(`Saved: ${t}`);
});

console.log('Logo generation complete!');
