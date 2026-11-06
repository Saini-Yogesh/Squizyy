const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');

const fontPath = path.join(__dirname, '..', 'squizyy-shopify-theme', 'assets', 'Champ-Black.otf');
const buffer = fs.readFileSync(fontPath);
const font = opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));

function getLogoSvg(text, fontSize = 48, italicShear = 0) {
  const pathObj = font.getPath(text, 0, 40, fontSize, { kerning: true });
  
  if (italicShear !== 0) {
    pathObj.commands.forEach(cmd => {
      if (cmd.x !== undefined) cmd.x += italicShear * (40 - cmd.y);
      if (cmd.x1 !== undefined) cmd.x1 += italicShear * (40 - cmd.y1);
      if (cmd.x2 !== undefined) cmd.x2 += italicShear * (40 - cmd.y2);
    });
  }

  const bbox = pathObj.getBoundingBox();
  const pad = 6;
  const w = Math.ceil(bbox.x2 - bbox.x1 + pad * 2);
  const h = Math.ceil(bbox.y2 - bbox.y1 + pad * 2);
  const minX = Math.floor(bbox.x1 - pad);
  const minY = Math.floor(bbox.y1 - pad);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${minX} ${minY} ${w} ${h}" fill="none">
  <path d="${pathObj.toPathData(2)}" fill="#2D0F28" />
</svg>`;
}

fs.writeFileSync('scripts/test_logo_upper.svg', getLogoSvg('SQUIZYY', 48, 0));
fs.writeFileSync('scripts/test_logo_slanted.svg', getLogoSvg('SQUIZYY', 48, 0.22));
fs.writeFileSync('scripts/test_logo_slanted_tm.svg', getLogoSvg('SQUIZYY™', 48, 0.22));

console.log('Saved test logo SVGs');
