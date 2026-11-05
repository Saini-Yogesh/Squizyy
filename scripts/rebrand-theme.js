const fs = require('fs');
const path = require('path');

const themeDir = path.join(__dirname, '..', 'squizyy-shopify-theme');

// Files to update with custom replacements
function updateFile(relPath, replacer) {
  const fullPath = path.join(themeDir, relPath);
  if (!fs.existsSync(fullPath)) return;
  const original = fs.readFileSync(fullPath, 'utf8');
  const updated = replacer(original);
  if (original !== updated) {
    fs.writeFileSync(fullPath, updated, 'utf8');
    console.log(`Updated theme file: ${relPath}`);
  }
}

// 1. Header
updateFile('sections/header.liquid', (c) => {
  return c
    .replace(/drizzy-squeezy-peanut-butter-19-4-oz/g, 'squizyy-squeezy-peanut-butter-19-4-oz')
    .replace(/all_products\['squizyy-squeezy-peanut-butter-19-4-oz'\]/g, "all_products['squizyy-squeezy-peanut-butter-19-4-oz'].title != blank ? all_products['squizyy-squeezy-peanut-butter-19-4-oz'] : all_products['drizzy-squeezy-peanut-butter-19-4-oz']")
    .replace(/drizzy-peanut-butter/g, 'squizyy-peanut-butter')
    .replace(/drizzy-dark-logo\.svg/g, 'squizyy-dark-logo.svg')
    .replace(/Drizzy USA/g, 'Squizyy USA')
    .replace(/alt="Drizzy"/g, 'alt="Squizyy"')
    .replace(/BUY DRIZZY NOW/g, 'BUY SQUIZYY NOW')
    .replace(/BUY DRIZZY PEANUT BUTTER NOW/g, 'BUY SQUIZYY PEANUT BUTTER NOW')
    .replace(/BUY DRIZZY/g, 'BUY SQUIZYY');
});

// 2. Footer
updateFile('sections/footer.liquid', (c) => {
  return c
    .replace(/drizzy-squeezy-peanut-butter-19-4-oz/g, 'squizyy-squeezy-peanut-butter-19-4-oz')
    .replace(/drizzy-peanut-butter/g, 'squizyy-peanut-butter')
    .replace(/drizzy-dark-logo\.svg/g, 'squizyy-dark-logo.svg')
    .replace(/Get Drizzy with it/g, 'Get Squizyy with it')
    .replace(/Shop Drizzy/g, 'Shop Squizyy')
    .replace(/alt="DRIZZY"/g, 'alt="SQUIZYY"')
    .replace(/alt="Drizzy"/g, 'alt="Squizyy"')
    .replace(/Drizzy Pty Limited/g, 'Squizyy Pty Limited')
    .replace(/Drizzy Pty Ltd/g, 'Squizyy Pty Ltd')
    .replace(/drizzypeanuts/g, 'squizyypeanuts')
    .replace(/getdrizzypeanuts/g, 'getsquizyypeanuts')
    .replace(/getdrizzy/g, 'squizyy');
});

// 3. Hero
updateFile('sections/hero.liquid', (c) => {
  return c
    .replace(/BUY DRIZZY PEANUT BUTTER NOW/g, 'BUY SQUIZYY PEANUT BUTTER NOW')
    .replace(/BUY DRIZZY NOW/g, 'BUY SQUIZYY NOW')
    .replace(/drizzy-squeezy-peanut-butter-19-4-oz/g, 'squizyy-squeezy-peanut-butter-19-4-oz')
    .replace(/drizzy-peanut-butter/g, 'squizyy-peanut-butter')
    .replace(/Drizzy Peanut Butter/g, 'Squizyy Peanut Butter')
    .replace(/Drizzy bottle/g, 'Squizyy bottle')
    .replace(/Drizzy/g, 'Squizyy');
});

// 4. Announcement Bar
updateFile('sections/announcement-bar.liquid', (c) => {
  return c
    .replace(/drizzy-squeezy-peanut-butter-19-4-oz/g, 'squizyy-squeezy-peanut-butter-19-4-oz')
    .replace(/drizzy-peanut-butter/g, 'squizyy-peanut-butter')
    .replace(/BUY DRIZZY NOW/g, 'BUY SQUIZYY NOW')
    .replace(/BUY DRIZZY/g, 'BUY SQUIZYY');
});

// 5. Featured Products
updateFile('sections/featured-products.liquid', (c) => {
  return c
    .replace(/drizzy-squeezy-peanut-butter-19-4-oz/g, 'squizyy-squeezy-peanut-butter-19-4-oz')
    .replace(/Drizzy Squeezy Peanut Butter 19\.4 Oz/g, 'Squizyy Squeezy Peanut Butter 19.4 Oz')
    .replace(/Drizzy Squeezy Peanut Butter/g, 'Squizyy Squeezy Peanut Butter')
    .replace(/BUY DRIZZY PEANUT BUTTER NOW/g, 'BUY SQUIZYY PEANUT BUTTER NOW')
    .replace(/BUY DRIZZY NOW/g, 'BUY SQUIZYY NOW')
    .replace(/drizzy-peanut-left/g, 'squizyy-peanut-left')
    .replace(/Drizzy/g, 'Squizyy')
    .replace(/DRIZZY/g, 'SQUIZYY');
});

// 6. Product Comparison
updateFile('sections/product-comparison.liquid', (c) => {
  return c
    .replace(/drizzy-peanut-left/g, 'squizyy-peanut-left')
    .replace(/Drizzy/g, 'Squizyy')
    .replace(/DRIZZY/g, 'SQUIZYY')
    .replace(/drizzy/g, 'squizyy');
});

// 7. Store Locator
updateFile('sections/store-locator.liquid', (c) => {
  return c
    .replace(/BUY DRIZZY ONLINE/g, 'BUY SQUIZYY ONLINE')
    .replace(/drizzy-squeezy-peanut-butter-19-4-oz/g, 'squizyy-squeezy-peanut-butter-19-4-oz')
    .replace(/Drizzy/g, 'Squizyy');
});

// 8. Wholesale Hero & Form
updateFile('sections/wholesale-hero.liquid', (c) => {
  return c
    .replace(/Drizzy/g, 'Squizyy')
    .replace(/DRIZZY/g, 'SQUIZYY');
});
updateFile('sections/wholesale-form.liquid', (c) => {
  return c
    .replace(/stock Drizzy/g, 'stock Squizyy')
    .replace(/Wholesale Drizzy/g, 'Wholesale Squizyy')
    .replace(/Drizzy/g, 'Squizyy');
});

// 9. Story Sections
['sections/story-founders.liquid', 'sections/story-hero.liquid', 'sections/story-timeline.liquid'].forEach(f => {
  updateFile(f, (c) => {
    return c
      .replace(/Drizzy/g, 'Squizyy')
      .replace(/DRIZZY/g, 'SQUIZYY')
      .replace(/drizzy/g, 'squizyy');
  });
});

// 10. Newsletter Modal
updateFile('snippets/newsletter-modal.liquid', (c) => {
  return c
    .replace(/Retro Drizzy TV/g, 'Retro Squizyy TV')
    .replace(/Drizzy Bottle/g, 'Squizyy Bottle')
    .replace(/Drizzy/g, 'Squizyy');
});

// 11. Product Gallery & Card
updateFile('snippets/product-card.liquid', (c) => {
  return c
    .replace(/drizzy-squeezy-peanut-butter-19-4-oz/g, 'squizyy-squeezy-peanut-butter-19-4-oz')
    .replace(/Drizzy/g, 'Squizyy');
});
updateFile('snippets/product-gallery.liquid', (c) => {
  return c
    .replace(/Drizzy/g, 'Squizyy')
    .replace(/DRIZZY/g, 'SQUIZYY');
});

// 12. Main Product PDP & FAQs
updateFile('sections/product-main.liquid', (c) => {
  return c
    .replace(/drizzy-squeezy-peanut-butter-19-4-oz/g, 'squizyy-squeezy-peanut-butter-19-4-oz')
    .replace(/drizzy-peanut-butter/g, 'squizyy-peanut-butter')
    .replace(/Drizzy/g, 'Squizyy')
    .replace(/DRIZZY/g, 'SQUIZYY');
});
updateFile('sections/product-faq.liquid', (c) => {
  return c
    .replace(/Drizzy/g, 'Squizyy')
    .replace(/DRIZZY/g, 'SQUIZYY')
    .replace(/drizzy/g, 'squizyy');
});
updateFile('sections/product-good-stuff.liquid', (c) => {
  return c
    .replace(/Drizzy/g, 'Squizyy')
    .replace(/drizzy/g, 'squizyy');
});

// 13. Other Sections
['sections/features-grid.liquid', 'sections/full-page-media.liquid', 'sections/marquee-cards.liquid', 'sections/insta-feed.liquid', 'sections/main-404.liquid', 'sections/main-cart.liquid', 'sections/main-collection.liquid', 'sections/review-carousel.liquid', 'sections/rules-content.liquid', 'sections/contest-draw.liquid', 'sections/contest-hero.liquid', 'sections/contest-instructions.liquid'].forEach(f => {
  updateFile(f, (c) => {
    return c
      .replace(/drizzy-squeezy-peanut-butter-19-4-oz/g, 'squizyy-squeezy-peanut-butter-19-4-oz')
      .replace(/drizzy-1\.jpg/g, 'squizyy-1.jpg')
      .replace(/Drizzy/g, 'Squizyy')
      .replace(/DRIZZY/g, 'SQUIZYY')
      .replace(/@getdrizzy/g, '@squizyy')
      .replace(/getdrizzy/g, 'squizyy');
  });
});

// 14. Locales & Config
updateFile('locales/en.default.json', (c) => {
  return c.replace(/Drizzy/g, 'Squizyy').replace(/drizzy/g, 'squizyy');
});
updateFile('config/settings_data.json', (c) => {
  return c.replace(/Drizzy/g, 'Squizyy').replace(/drizzy/g, 'squizyy');
});
updateFile('config/settings_schema.json', (c) => {
  return c.replace(/Drizzy/g, 'Squizyy').replace(/drizzy/g, 'squizyy');
});

// 15. Templates
['templates/index.json', 'templates/page.store-locator.json', 'templates/page.wholesale.json'].forEach(f => {
  updateFile(f, (c) => {
    return c
      .replace(/drizzy-squeezy-peanut-butter-19-4-oz/g, 'squizyy-squeezy-peanut-butter-19-4-oz')
      .replace(/Drizzy/g, 'Squizyy')
      .replace(/drizzy/g, 'squizyy');
  });
});

console.log('Shopify theme rebranding complete.');

