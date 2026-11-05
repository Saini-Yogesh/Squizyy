# Architecture & System Changelog — Squizyy

All notable architectural changes, system refactorings, and bug fixes are documented in this file.

---

## [2026-11-05] — Complete Brand Identity Transformation: "Drizzy" to "squizyy"

### Full-System Rebrand (Theme, React SPA, Node Server, Catalog)
- **Authentic Champ Black Vector Wordmark (`squizyy-dark-logo.svg` & `squizyy-white-logo.svg`)**: Replaced all legacy Drizzy wordmarks with authentic `squizyy` vector bezier typography generated from the original Champ Black typeface using `opentype.js`. Updated navbar, header, footer, mobile drawer, social preview OG/Twitter cards, and browser favicons.
- **Shopify Online Store 2.0 Theme (`squizyy-shopify-theme/`)**:
  - Rebranded 37 Liquid sections, snippets, templates, and config files across the theme.
  - Updated all visible branding, headings, button CTAs ("BUY SQUIZYY NOW", "BUY SQUIZYY PEANUT BUTTER NOW"), copy, image alts, and metadata.
  - Rebranded product handles to `squizyy-squeezy-peanut-butter-19-4-oz` with backward-compatible fallbacks for legacy URLs.
  - Duplicated all image assets to `SQUIZYY*` and `squizyy-*` aliases to satisfy Shopify Theme Check asset validation.
  - Deployed live to production store `squizyy-store.myshopify.com` (Theme ID: `#144876961855`).
- **React Frontend SPA (`client/src/`)**:
  - Rebranded 32 files including `index.html` (document title `Squizyy™ | The Squeezy Peanut Butter - No Jars, No Knives, No Mess`, meta descriptions, OG/Twitter tags).
  - Updated `Navbar.jsx`, `Footer.jsx`, `ComparisonTable.jsx`, `FeaturedProductSection.jsx`, `Hero.jsx`, `GoodStuffOnly.jsx`, `FeaturesGrid.jsx`, `FullPageMedia.jsx`, `OurStory.jsx`, `Wholesale.jsx`, `StoreLocator.jsx`, `SproutsContest.jsx`, `Rules.jsx`, and `PrivacyPolicy.jsx`.
  - Migrated cart storage to `squizyy_cart_v1` with seamless fallback read for existing `drizzy_cart_v1` user sessions.
  - Migrated admin session key to `squizyy_admin_key`.
- **Node.js Express Backend (`server/src/`)**:
  - Rebranded server entry point, database connection messages, error responses, and seed data (`Squizyy Squeezy Peanut Butter 19.4 Oz`).
  - Updated admin auth middleware (`server/src/middleware/auth.js`) to support `squizyy_admin_secret_key_2026` while maintaining backward-compatible support for legacy tokens.
- **Shopify Product Catalog (`shopify-products-import.csv`)**:
  - Rebranded handle to `squizyy-squeezy-peanut-butter-19-4-oz`, Vendor to `Squizyy`, Title to `Squizyy Squeezy Peanut Butter 19.4 Oz`, and SKUs to `SQUIZYY-PB-001` and `SQUIZYY-CASE-006`.
- **Package & Root Configs**:
  - Renamed monorepo packages to `squizyy`, `squizyy-client`, and `squizyy-server`.
- **Verification & Integrity Checks**:
  - `npm run client:build`: 0 errors (13.44s, 1692 modules).
  - `npm run theme:check`: 0 offenses across 57 files.
  - `npm run doc:verify`: 54 paths verified, 0 warnings.
  - `npm run theme:push`: Live on production store `#144876961855`.
  - `npm run theme:test`: All 7 core routes returned HTTP 200 OK.
  - Brand Scanner: 0 unintended visible references to Drizzy across the entire codebase.

---

## [2026-11-05] — Storefront Full-System Audit, Typography & Cart Robustness Hardening

### Fixed & Improved
- **Authentic Retro TV Modal Stage (`snippets/newsletter-modal.liquid` & `assets/custom.js`)**: Replaced generic modal card with 1:1 authentic Retro TV stage ported from `NewsletterModal.jsx` and `NewsletterModal.module.css`. Features top peeking Drizzy bottle (`USADRIZZYFRONTcopy.jpg`), pixel-perfect TV frame with CRT scanlines and roasted gradient screen cutout (`radial-gradient`), inline form inside the screen with pill input, "NOT RIGHT NOW" dismiss link, and immediate in-screen coupon code reveal (`WELCOME10` with copy button).
- **Footer Newsletter Ajax Form & Instant Coupon Reveal (`sections/footer.liquid` & `assets/custom.js`)**: Added in-place Ajax form handling for the footer newsletter and popup forms. Customers submitting their email now receive instant feedback with discount code `WELCOME10` and a one-click copy button, while automatically registering their email in Shopify Admin Customers. Added `id="contact_form"` to the footer card container so fallback native posts anchor smoothly to the footer.
- **Automated Live Store Testing Suite (`scripts/test-live-store.js` & `scripts/test-theme-links.js`)**: Built an automated end-to-end testing script that authenticates against `https://squizyy-dev.myshopify.com` via session cookies and verifies HTTP status codes across all primary routes (`/`, PDP, catalog, our-story, wholesale, store-locator, cart) with a 100% pass rate.
- **Defensive Navigation Guards (`sections/header.liquid` & `sections/footer.liquid`)**: Wrapped optional campaign links ("Win Flights" and "Sweepstakes Rules") in defensive Liquid existence checks, eliminating 404 links while allowing them to seamlessly render the moment those pages are created in Shopify Admin.
- **Wholesale Hero Cleanup (`sections/wholesale-hero.liquid`)**: Removed redundant "Already a partner? Login" prompt and unused CSS from the Wholesale page hero card since customer/partner accounts do not utilize a login portal.
- **Global Exclusive Accordion Controller (`assets/custom.js`, `sections/product-faq.liquid`, `sections/product-main.liquid`)**: Fixed FAQ accordions on the Wholesale page (`/pages/wholesale`) and all other pages where clicking questions failed because the listener was previously trapped inside the PDP buy box controller. Built a global, event-delegated exclusive accordion handler ensuring only 1 question is open at a time (automatically collapsing any other open question), with smooth fade-in transitions and rotating `+` to `✕` icons.
- **Browser Tab Favicon & Apple Touch Icon (`layout/theme.liquid`)**: Added fallback to authentic brand SVG favicon (`Union.svg`) and Apple touch icon when `settings.favicon` is unconfigured, resolving the missing browser tab icon issue across desktop and mobile browsers.
- **Docked Newsletter Launcher Tab (`snippets/newsletter-modal.liquid`)**: Fixed the floating mascot and "10% OFF" badge that hovered over content/photos in mid-air. Replaced with the authentic bottom-docked tab (`bottom: 0`, `border-bottom: none`, `border-radius: 8px 8px 0 0`) matching `NewsletterModal.module.css` with an inline mascot icon and "Get 10% Off" label.
- **Store Locator "Available Soon" Redesign (`sections/store-locator.liquid` & `assets/custom.js`)**: Removed all mock/fake grocer cards (Sprouts Austin, Dallas, etc.), removed the search input, and pruned dead search JS from `custom.js`. Created a clean, branded "Stores Will Be Available Soon!" card with "Buy Drizzy Online" and "Wholesale Inquiries" CTAs.
- **Zero-404 Page Handle Resiliency (`header.liquid` & `footer.liquid`)**: Added multi-alias handle resolution for all custom pages (`sprouts-launch-win-flights-to-australia`, `stockists`, `find-in-store`, `about-us`, `official-rules`, `sweepstakes-rules`), ensuring internal links resolve dynamically regardless of whether pages were titled with spaces or hyphens.
- **Robust Ajax Cart Drawer (`assets/cart.js`)**: Protected against null image references (`item.featured_image?.url || item.image`) with fallback placeholder peanut icon to prevent JS errors if products are imported without images. Added HTML escaping (`escapeHtml`) to prevent script injection in cart titles and variant text.
- **Shopify CDN Self-Hosted Brand Fonts (`layout/theme.liquid`)**: Added direct Liquid `asset_url` `@font-face` bindings for `Champ Black`, `Azeret Mono`, and `Inter` (regular & bold), eliminating reliance on external Google Fonts and ensuring instant, zero-flicker typography across all devices.
- **Cart Page Image Fallbacks (`sections/main-cart.liquid`)**: Added safe fallback hierarchy (`item.image` -> `item.product.featured_image` -> `'DRIZZY12302.jpg' | asset_url`) so full-page cart table never renders broken image placeholders.
- **Collection Fallback Navigation (`sections/main-collection.liquid`)**: Updated fallback product cards to link directly to respective product detail pages (`/products/drizzy-squeezy-peanut-butter-19-4-oz` and `/products/food-services-pack-6-units`) avoiding dummy variant ID add-to-cart attempts before catalog ingestion.
- **CSV Data Integrity (`shopify-products-import.csv`)**: Resolved CSV parsing shift where `Variant Compare At Price` received boolean `"TRUE"`, aligning all 49 standard Shopify columns with accurate pricing ($9.99 and $37.50).
- **Verified Theme Deployment**: Pushed all updates live to dev store `squizyy-dev.myshopify.com` (Theme #`187576582232`). Passed `npm run theme:check` with 0 offenses across 57 files and `npm run doc:verify` with 0 warnings.

---

## [2026-11-04] — Authentic UI Restoration & Zero-404 Dynamic Route Resolution

### Fixed
- **Authentic Product Gallery & Fallback Images**: Restored authentic 11 high-resolution product photos (`USADRIZZYFRONTcopy.jpg`, `DRIZZY12302.jpg`, `DRIZZY13034.jpg`, `DRIZZY13132.jpg`, `DRIZZY12496.jpg`, etc.) in `snippets/product-gallery.liquid` with desktop 2-column square subgrid and mobile scrollable thumbnail strip.
- **Authentic Featured Product Section**: Replaced generic buy box in `sections/featured-products.liquid` with authentic warm brown section (`#894031`), floating peanuts, 5-thumbnail compact gallery with interactive switching, 5-star review score, 3 checkmark bullet items, and "BUY DRIZZY PEANUT BUTTER NOW" CTA.
- **Collection Fallback Cards**: Added authentic product cards to `sections/main-collection.liquid` so collection pages gracefully display Drizzy Squeezy Peanut Butter and Food Services Pack with secondary hover image swap when Shopify catalog items are empty.
- **Footer Drip Preceding Section Overlap**: Replaced `position: absolute; transform: translateY(-98%);` with natural document flow (`position: relative; line-height: 0; width: 100%;`) in `sections/footer.liquid`. This completely eliminated the 420px solid cream SVG overlapping and slicing into previous section content (e.g. InstaFeed cards, timeline, FAQs) across all pages.
- **Footer Section Gap**: Removed extraneous `margin-top: 5rem` / `margin-top: 7rem` on `.footer-section`, restoring the seamless visual transition between page content and the pastel footer gradient.
- **Footer Layout Alignment**: Ported 1:1 CSS from `Footer.module.css` for form fields, full-width `button-primary` button, and responsive column layouts.
- **Zero-404 Dynamic Routing**: Implemented dynamic Liquid product and page resolution across `sections/header.liquid`, `sections/hero.liquid`, `sections/announcement-bar.liquid`, `sections/footer.liquid`, and `sections/marquee-cards.liquid`. Product links dynamically resolve to the main product handle, fallback to `collections.all.products.first`, or degrade to collection URL, completely eliminating hardcoded slug 404s.
- **Mobile Drawer Close Listener**: Updated `assets/custom.js` to query all `[data-mobile-menu-toggle]` triggers with `querySelectorAll`, ensuring both the hamburger and internal close buttons work seamlessly.
- **Theme Check Zero-Offense Compliance**: Resolved `RemoteAsset` warning in `sections/full-page-media.liquid` by converting external video link to dynamic setting `video_url` with verified fallback (`shopify theme check` passed with 57 files inspected, 0 offenses).

### Refactored
- **Pixel-Perfect Authentic UI Restoration**: Replaced simplified theme sections with authentic markup and styling ported directly from `client/src/`:
  - `sections/announcement-bar.liquid`: Restored purple pill infinite marquee with "FREE SHIPPING ON ORDERS $49.99+" and underlined "BUY NOW".
  - `sections/header.liquid`: Restored authentic 3-column navigation with "BUY DRIZZY NOW" chunky purple button, mobile actions, and cart item counter badge.
  - `sections/hero.liquid`: Restored authentic overlaid rating (5 purple `#CA9AF1` SVG stars), headline, floating sticker badge, and bottom gradient with "BUY DRIZZY PEANUT BUTTER NOW" CTA button inside the frame.
  - `sections/feature-ticker.liquid`: Restored cream background and 4 authentic icons/pillars (`AUSSIE-OWNED`, `ULTRA-SMOOTH`, `ZERO ADDED SUGAR`, `NATURAL FUEL`).
  - `sections/product-comparison.liquid`: Restored "Kiss Your Jar Goodbye, Mwa!" layout with top cream drip graphic, floating peanuts, side bottles, pill badges, and central VS circle.
  - `sections/features-grid.liquid`: Restored 2-column layout with framed image (`drizzy-1.jpg`), rotated slogan badge overlay, 4 features with authentic SVGs, and "SHOP NOW" CTA.
  - `sections/full-page-media.liquid`: Restored full-bleed background video with overlaid floating story card and peanut sticker.
  - `sections/marquee-cards.liquid`: Restored mascot/peanut icon header row, title, subtitle, and CTA button.
  - `sections/footer.liquid`: Restored pastel background, top drip divider, dual cards ("Sign up & save 10%" and "Get Drizzy with it"), social SVG icons, and giant logo.
  - `assets/theme.css`: Standardized all semantic tokens, radii, shadows, and font aliases matching `variables.css`.

### Fixed
- **Zero-Offense Theme Check Resolution**: Resolved all 61 offenses (50 errors, 11 warnings) across 27 files in `squizyy-shopify-theme/` using `npx shopify theme check` (57 files inspected, 0 offenses found).
- **ParserBlockingScript**: Replaced parser-blocking `script_tag` filters with deferred `<script defer="defer"></script>` tags in `layout/theme.liquid`.
- **RemoteAsset & Fonts**: Replaced Google Fonts with local `@font-face` definitions in `assets/theme.css` using local assets (`inter_n4.*.woff2`, `inter_n7.*.woff2`), removing external font links. Converted contest hero video into a dynamic section setting.
- **MissingAsset**: Replaced missing `bundle-1x.png` fallback with verified `pdp-image.png`.
- **OrphanedSnippet**: Integrated all 6 reusable snippets (`bottle-selector.liquid`, `button.liquid`, `icon.liquid`, `price.liquid`, `product-badge.liquid`, `product-gallery.liquid`) across PDP, card, cart, header, and 404 sections.
- **UnusedAssign**: Implemented sold-out state badge display in `snippets/price.liquid` using `available`.
- **ImgWidthAndHeight**: Calculated intrinsic dimensions from binary headers (PNG, WebP VP8X, AVIF `ispe`, and SVG `viewBox`) and added explicit `width`, `height`, and `loading="lazy"` attributes across 46 image tags.

---

## [2026-10-26] — Native Shopify Online Store 2.0 Theme Migration

### Added
- **`squizyy-shopify-theme/`**: Complete native Shopify Online Store 2.0 Theme recreating the Squizyy storefront.
- **Shopify Layout & Assets**:
  - `layout/theme.liquid`: Master shell with fonts, meta tags, cart drawer, and newsletter popup.
  - `assets/`: 150+ authentic assets copied from client, alongside `base.css`, `theme.css`, `animations.css`, `responsive.css`, `cart.js`, `product.js`, and `custom.js`.
- **Commerce Functionality**:
  - Shopify Ajax Cart API integration (`/cart/add.js`, `/cart/change.js`, `/cart.js`) with slide-out drawer, live item count, and dynamic free-shipping progress meter at $49.99.
  - Native Shopify Checkout (`/checkout`) integration with variant bottle selector (1x/2x/3x/6x) and one-time vs subscribe & save toggle.
- **31 Liquid Sections & 10 Snippets**: Modular components covering Homepage, PLP collection, PDP, Cart, Our Story, Store Locator, Wholesale, Contest, FAQs, and Reviews.
- **11 Online Store 2.0 JSON Templates**: `index.json`, `product.json`, `collection.json`, `cart.json`, `page.json`, `page.our-story.json`, `page.store-locator.json`, `page.wholesale.json`, `page.contest.json`, `page.rules.json`, and `404.json`.
- **`MIGRATION_PROGRESS.md` & `squizyy-shopify-theme/README.md`**: Complete migration tracking board and development documentation.

---

## [2026-10-19] — AI Memory & Documentation System Implementation

### Added
- **`AGENTS.md`**: Universal root instruction file for all AI coding agents (Cursor, VS Code Copilot, Claude Code, Windsurf, Gemini, etc.).
- **`docs/ai/PROJECT_MAP.md`**: Compact project navigation, verified paths, feature-to-file map, and command directory.
- **`docs/ai/ARCHITECTURE.md`**: Architectural specification of monorepo, CSS Modules design system, state lifecycle, and services.
- **`docs/ai/API_REFERENCE.md`**: Complete REST API specification with payload schemas and status codes.
- **`scripts/verify-ai-docs.js`**: Pure Node.js verification tool that validates all file paths mentioned in `PROJECT_MAP.md`, detects structural drift, and ensures documentation integrity.
- **Vendor Compatibility Shims**: Minimal reference files (`CLAUDE.md`, `GEMINI.md`, `.cursorrules`, `.github/copilot-instructions.md`) redirecting tools to `AGENTS.md`.

---

## [2026-10-19] — Enterprise CSS Modules Refactoring & Critical Bug Fixes

### Fixed
- **CartDrawer & CartContext Incompatibility**: Fixed property and method mismatches in `client/src/context/CartContext.jsx` and `CartDrawer.jsx` by adding bidirectional accessors and backward-compatible overloads.
- **Order Confirmation Disappearance**: Normalized response parsing in `client/src/services/api.js` and `server/src/controllers/formController.js` to ensure `res.order` resolves correctly.
- **StoreLocator Address Resolution Crash**: Prevented `TypeError: Cannot read properties of undefined (reading 'toLowerCase')` by adding defensive address parsing in `StoreLocator.jsx` and `storeService.js`.
- **Product Slug 404 Bug**: Removed fallback override in `server/src/services/productService.js`, restoring 404 responses for missing products and implementing DB-backed `updateProduct`.
- **Newsletter Duplicate Key Error**: Added RFC 5322 email regex and MongoDB 11000 duplicate handling in `formController.js` and `formService.js`.

### Refactored
- **CSS Architecture**: Replaced Tailwind CSS directives with isolated CSS Modules (`*.module.css`) across all 12 pages and components.
- **Component Decomposition**: Split 700-line PDP into modular subcomponents: `PdpBuyBox`, `GoodStuffOnly`, `ProductFaq`, `ReviewCarousel`, and `ProductGallery`.
- **Design Tokens**: Standardized CSS custom properties in `client/src/styles/variables.css` and typography/reset in `globals.css` and `reset.css`.
- **Cleaned Dependencies**: Removed Tailwind directives from `client/src/index.css`.
