# Architecture & System Changelog — Squizyy / Drizzy

All notable architectural changes, system refactorings, and bug fixes are documented in this file.

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
