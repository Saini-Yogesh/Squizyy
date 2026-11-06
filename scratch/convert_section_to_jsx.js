const fs = require('fs');

function htmlToJsx(htmlStr) {
  let jsx = htmlStr;

  // Replace image urls
  jsx = jsx.replace(/\/\/getdrizzy\.co\/cdn\/shop\/files\/([^\?"'\s&]+)(?:\?[^"'\s]*)?/g, '/assets/images/$1');
  jsx = jsx.replace(/https:\/\/getdrizzy\.co\/cdn\/shop\/files\/([^\?"'\s&]+)(?:\?[^"'\s]*)?/g, '/assets/images/$1');

  // Replace class= with className=
  jsx = jsx.replace(/\bclass="/g, 'className="');

  // Replace for= with htmlFor=
  jsx = jsx.replace(/\bfor="/g, 'htmlFor="');

  // Replace style attributes style="..." with JSX style objects
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styleContent) => {
    const rules = styleContent.split(';').filter(r => r.trim());
    const objRules = rules.map(r => {
      const parts = r.split(':');
      if (parts.length < 2) return '';
      const key = parts[0].trim();
      const val = parts.slice(1).join(':').trim();
      if (key.startsWith('--')) {
        return `"${key}": "${val}"`;
      }
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      return `"${camelKey}": "${val}"`;
    }).filter(Boolean);
    return `style={{ ${objRules.join(', ')} }}`;
  });

  // Self close void elements: img, input, br, hr
  jsx = jsx.replace(/<(img|input|br|hr)([^>]*?)(?<!\/)>/gi, '<$1$2 />');

  // Replace comments
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

  // Replace custom element tags like <header-487>, <custom-carousel>, <price-quote>, etc with div or standard elements
  jsx = jsx.replace(/<\/?header-487([^>]*)>/g, '<header$1>');
  jsx = jsx.replace(/<\/?custom-carousel([^>]*)>/g, '<div$1>');
  jsx = jsx.replace(/<\/?bottle-quantity-selector([^>]*)>/g, '<div$1>');
  jsx = jsx.replace(/<\/?quick-view-button([^>]*)>/g, '<div$1>');

  return jsx;
}

module.exports = { htmlToJsx };
