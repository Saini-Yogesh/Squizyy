const fs = require('fs');

const custom = fs.readFileSync('scripts/drizzy_custom_styles.css', 'utf8');
const styles = fs.readFileSync('scripts/drizzy_styles.css', 'utf8');

console.log('=== CUSTOM STYLES ===');
console.log(custom);

console.log('\n=== SEARCHING STYLES.CSS FOR ANNOUNCEMENT ===');
const annMatch = styles.match(/[^{}]*announcement[^{}]*\{[^}]+\}/gi) || [];
console.log('Announcement rules:', annMatch.slice(0, 10));

console.log('\n=== SEARCHING STYLES.CSS FOR NAV / HEADER ===');
const navMatch = styles.match(/[^{}]*(header|navbar|nav-link|nav_item)[^{}]*\{[^}]+\}/gi) || [];
console.log('Nav rules:', navMatch.slice(0, 15));

console.log('\n=== SEARCHING STYLES.CSS FOR BADGE / STICKER ===');
const stickerMatch = styles.match(/[^{}]*(sticker|badge|rotating|rotate)[^{}]*\{[^}]+\}/gi) || [];
console.log('Sticker rules:', stickerMatch.slice(0, 10));

