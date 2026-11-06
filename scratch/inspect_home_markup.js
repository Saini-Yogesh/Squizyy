const fs = require('fs');

const html = fs.readFileSync('getdrizzy/html/index.html', 'utf8');

function inspectSection(name, startTag, endTag) {
  const start = html.indexOf(startTag);
  if (start === -1) {
    console.log('Not found:', name);
    return;
  }
  const end = html.indexOf(endTag, start);
  const content = html.substring(start, end !== -1 ? end + endTag.length : start + 3000);
  console.log(`\n======================================================`);
  console.log(`SECTION: ${name} (Length: ${content.length})`);
  console.log(`======================================================`);
  // Look at images in this section
  const imgs = content.match(/<img[^>]+>/g) || [];
  console.log(`Images in ${name}:`, imgs.length);
  imgs.forEach(i => {
    const src = (i.match(/src="([^"]+)"/) || [])[1];
    const alt = (i.match(/alt="([^"]*)"/) || [])[1];
    const cls = (i.match(/class="([^"]*)"/) || [])[1];
    console.log(`  - SRC: ${src}`);
    console.log(`    CLS: ${cls}`);
  });
}

inspectSection('ANNOUNCEMENT BAR', '<section\n  class="announcement-bar', '</section>');
inspectSection('HEADER', '<header-487', '</header-487>');
inspectSection('HERO', 'id="shopify-section-template--22221105463467__hero_DqxALE"', '</section>');
inspectSection('LOGOS MARQUEE', 'id="shopify-section-template--22221105463467__logos_marquee_BxkYjX"', '</section>');
inspectSection('COMPARISON', 'id="shopify-section-template--22221105463467__comparison_k3FRjd"', '</section>');
inspectSection('FEATURED PRODUCT', 'id="shopify-section-template--22221105463467__featured_product_dzQzaz"', '</section>');
inspectSection('IMAGE WITH TEXT', 'id="shopify-section-template--22221105463467__image_with_text_kAJNAP"', '</section>');
inspectSection('FULL PAGE MEDIA', 'id="shopify-section-template--22221105463467__full_page_media_QVigQN"', '</section>');
inspectSection('MARQUEE CARDS', 'id="shopify-section-template--22221105463467__marquee_cards_mMYQLW"', '</section>');
inspectSection('INSTAGRAM FEED', 'id="shopify-section-template--22221105463467__178698386217403125"', '</section>');
inspectSection('FOOTER', 'id="shopify-section-sections--22221105135787__footer_BGPBbi"', '</section>');
