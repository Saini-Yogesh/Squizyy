const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\yoges\\Desktop\\GitHub\\Squizyy';
const cssTargetDir = path.join(rootDir, 'client/src/assets/css');
fs.mkdirSync(cssTargetDir, { recursive: true });

// Copy styles.css and custom-styles.css
fs.copyFileSync(
  path.join(rootDir, 'getdrizzy/css/cdn/shop/t/3/assets/styles.css'),
  path.join(cssTargetDir, 'styles.css')
);

fs.copyFileSync(
  path.join(rootDir, 'getdrizzy/css/cdn/shop/t/3/assets/custom-styles.css'),
  path.join(cssTargetDir, 'custom-styles.css')
);

console.log('Copied styles.css and custom-styles.css to client/src/assets/css/');
