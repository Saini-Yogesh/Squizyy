const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');

const fontPath = path.join(__dirname, '..', 'squizyy-shopify-theme', 'assets', 'Champ-Black.otf');
const buffer = fs.readFileSync(fontPath);
const font = opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));

function createLogoSvg(color = '#2C1329') {
  // Generate main text path
  const pathMain = font.getPath('SQUiZYY', 0, 40, 48, { kerning: true });
  
  // Calculate end of text to position TM
  const mainBbox = pathMain.getBoundingBox();
  const tmX = mainBbox.x2 + 2;
  const pathTm = font.getPath('TM', tmX, 16, 14, { kerning: true });

  // Combine commands
  const allCommands = [...pathMain.commands, ...pathTm.commands];

  // Apply italic shear (tan ~ 12.5 deg = 0.22)
  const shear = 0.22;
  allCommands.forEach(cmd => {
    if (cmd.x !== undefined) cmd.x += shear * (40 - cmd.y);
    if (cmd.x1 !== undefined) cmd.x1 += shear * (40 - cmd.y1);
    if (cmd.x2 !== undefined) cmd.x2 += shear * (40 - cmd.y2);
  });

  // Calculate combined bounding box
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  allCommands.forEach(cmd => {
    ['x', 'x1', 'x2'].forEach(k => {
      if (cmd[k] !== undefined) {
        if (cmd[k] < minX) minX = cmd[k];
        if (cmd[k] > maxX) maxX = cmd[k];
      }
    });
    ['y', 'y1', 'y2'].forEach(k => {
      if (cmd[k] !== undefined) {
        if (cmd[k] < minY) minY = cmd[k];
        if (cmd[k] > maxY) maxY = cmd[k];
      }
    });
  });

  const pad = 2;
  minX = Math.floor(minX - pad);
  minY = Math.floor(minY - pad);
  const w = Math.ceil(maxX - minX + pad * 2);
  const h = Math.ceil(maxY - minY + pad * 2);

  const pathObj = new opentype.Path();
  pathObj.commands = allCommands;
  const pathData = pathObj.toPathData(2);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${minX} ${minY} ${w} ${h}" fill="none">
  <path d="${pathData}" fill="${color}" />
</svg>`;
}

const darkSvg = createLogoSvg('#2C1329');
const whiteSvg = createLogoSvg('#FFFBF2');

const targetsDark = [
  path.join(__dirname, '..', 'squizyy-shopify-theme', 'assets', 'squizyy-dark-logo.svg'),
  path.join(__dirname, '..', 'squizyy-shopify-theme', 'assets', 'drizzy-dark-logo.svg'),
  path.join(__dirname, '..', 'client', 'public', 'assets', 'images', 'squizyy-dark-logo.svg'),
  path.join(__dirname, '..', 'client', 'public', 'assets', 'images', 'drizzy-dark-logo.svg'),
];

targetsDark.forEach(t => {
  fs.mkdirSync(path.dirname(t), { recursive: true });
  fs.writeFileSync(t, darkSvg);
  console.log('Saved dark logo to:', t);
});

const targetsWhite = [
  path.join(__dirname, '..', 'squizyy-shopify-theme', 'assets', 'squizyy-white-logo.svg'),
  path.join(__dirname, '..', 'client', 'public', 'assets', 'images', 'squizyy-white-logo.svg'),
];

targetsWhite.forEach(t => {
  fs.mkdirSync(path.dirname(t), { recursive: true });
  fs.writeFileSync(t, whiteSvg);
  console.log('Saved white logo to:', t);
});

