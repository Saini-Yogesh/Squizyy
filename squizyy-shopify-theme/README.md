# Squizyy Shopify Online Store 2.0 Theme

A native, high-performance, responsive Shopify Online Store 2.0 Theme reproducing the authentic **Squizyy / Drizzy** brand identity and e-commerce experience.

---

## 1. Architecture Overview

This theme is designed strictly adhering to **Shopify Online Store 2.0** standards. It contains no external frontend framework runtimes (no React, no Next.js, no Tailwind) and uses **native Shopify Liquid**, modular CSS tokens with scoped component styles, vanilla modern JavaScript, and Shopify's **Ajax Cart API**.

```text
squizyy-shopify-theme/
├── assets/                  # Stylesheets, vanilla JavaScript, authentic brand fonts & graphics
│   ├── base.css             # HTML5 resets, accessibility focus states, skip links
│   ├── theme.css            # Brand CSS custom properties, buttons, containers, typography
│   ├── responsive.css       # Fluid layout breakpoints and responsive utilities
│   ├── animations.css       # Marquee engines, bounce, peanut spin, micro-interactions
│   ├── cart.js              # Shopify Ajax Cart API controller, live drawer & free-shipping bar
│   ├── product.js           # Bottle bundle calculator (1x/2x/3x/6x), subscriptions, gallery
│   └── custom.js            # Retro TV newsletter modal, mobile drawer, store locator search
│
├── config/
│   ├── settings_schema.json # Merchant Theme Editor controls (Colors, Shipping Threshold, Social)
│   └── settings_data.json   # Default brand configurations & values
│
├── layout/
│   └── theme.liquid         # Global HTML document shell, meta tags, header, cart drawer, footer
│
├── locales/
│   └── en.default.json      # English translations and interface strings
│
├── sections/                # 31 Merchant-configurable Liquid sections
│   ├── announcement-bar.liquid
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero.liquid
│   ├── featured-products.liquid
│   ├── features-grid.liquid
│   ├── feature-ticker.liquid
│   ├── full-page-media.liquid
│   ├── marquee-cards.liquid
│   ├── insta-feed.liquid
│   ├── review-carousel.liquid
│   ├── product-main.liquid
│   ├── product-good-stuff.liquid
│   ├── product-premium-peanuts.liquid
│   ├── product-recommendations.liquid
│   ├── product-comparison.liquid
│   ├── product-faq.liquid
│   ├── main-collection.liquid
│   ├── main-cart.liquid
│   ├── store-locator.liquid
│   ├── story-hero.liquid
│   ├── story-founders.liquid
│   ├── story-timeline.liquid
│   ├── wholesale-hero.liquid
│   ├── wholesale-form.liquid
│   ├── contest-hero.liquid
│   ├── contest-details.liquid
│   ├── contest-instructions.liquid
│   ├── contest-draw.liquid
│   ├── rules-content.liquid
│   ├── main-page.liquid
│   └── main-404.liquid
│
├── snippets/                # 10 Reusable Liquid snippets
│   ├── seo-meta.liquid
│   ├── cart-drawer.liquid
│   ├── newsletter-modal.liquid
│   ├── product-card.liquid
│   ├── product-gallery.liquid
│   ├── bottle-selector.liquid
│   ├── price.liquid
│   ├── product-badge.liquid
│   ├── button.liquid
│   └── icon.liquid
│
└── templates/               # 11 JSON 2.0 Templates
    ├── index.json           # Homepage
    ├── product.json         # Product Details Page (PDP)
    ├── collection.json      # Collection / Product Listing Page (PLP)
    ├── cart.json            # Dedicated Cart Page
    ├── page.json            # Generic Legal / Content Pages
    ├── page.our-story.json  # Our Story Brand Page
    ├── page.store-locator.json # Interactive Store Locator Page
    ├── page.wholesale.json  # Wholesale Inquiry & Partner Page
    ├── page.contest.json    # Sprouts Australia Flight Giveaway Contest
    ├── page.rules.json      # Contest Official Rules Page
    └── 404.json             # Branded 404 Error Page
```

---

## 2. Core Features & Capabilities

### Visual Aesthetics & Design System
- **Authentic Brand Fonts**: Embedded `@font-face` definitions for `Champ Black` (headings) and `Azeret Mono` (labels, accents, tickers, buttons).
- **Brand Color Palette**:
  - Background: `#f8ebd7` / `#fffaf3`
  - Foreground: `#2d0f28` / `#2b1408`
  - Accent Purple: `#ca9af1`
  - Accent Green: `#036e2c` / `#176537`
  - Cream: `#fffbf2`
- **Chunky Retro Tactile Buttons**: Pill shape (`9999px`), 2px solid border with 4px drop-shadow bottom border and active depression state.

### Commerce & Ajax Cart
- **Shopify Ajax Cart API**: Full real-time cart mutations via `/cart/add.js`, `/cart/change.js`, and `/cart.js` without full-page reloads.
- **Dual Cart Modes**:
  - Slide-out Cart Drawer (`snippets/cart-drawer.liquid`) accessible from any page.
  - Dedicated Cart Page (`templates/cart.json`).
- **Free Shipping Threshold Meter**: Real-time progress bar calculated dynamically from merchant settings (`$49.99` default) celebrating unlocks.
- **Product Quantity & Bundle Selector**:
  - 1-Pack (Standard)
  - 2-Pack (Save 10%)
  - 3-Pack (Popular, Save 15%)
  - 6-Pack (Best Value, Save 20%)
  - One-time purchase vs. Subscribe & Save toggle.

### Custom Interactive Experiences
- **Store Locator**: Live client-side search by city, state, or zip code, chain filtering (Sprouts, Target, Whole Foods, H-E-B, Wegmans), "In Stock" indicators, and directions deep links.
- **Retro TV Newsletter Modal**: Nostalgic 10% discount popup with peeking bottle mascot, cookie/localStorage suppression, and custom launcher button.
- **Wholesale & Sprouts Contest**: Native Shopify Customer Contact forms capturing custom attributes (receipts, company, phone, marketing opt-ins).
- **Reviews & Social Feed**: Responsive 5-star customer review carousel and Instagram grid with smooth scroll arrows.

---

## 3. Local Development with Shopify CLI

### Prerequisites
- Node.js (v18+)
- Local Shopify CLI installed in the workspace (`npx shopify`)
- Store Access: `squizyy-dev.myshopify.com`

### Development Commands

1. **Start Live Theme Preview**:
   ```bash
   cd squizyy-shopify-theme
   npx shopify theme dev --store=squizyy-dev.myshopify.com
   ```
   This will spin up a local development server and provide a private theme preview URL.

2. **Run Theme Check Linting**:
   ```bash
   npx shopify theme check
   ```

3. **Push Theme to Shopify Store**:
   ```bash
   npx shopify theme push --store=squizyy-dev.myshopify.com
   ```

4. **Pull Settings / Changes from Store**:
   ```bash
   npx shopify theme pull --store=squizyy-dev.myshopify.com
   ```

---

## 4. Merchant Configuration & Shopify Admin Setup

### Pages Setup (Online Store > Pages)
Create the following pages in Shopify Admin and assign their corresponding theme templates:

| Page Title | Handle / URL Slug | Theme Template |
| :--- | :--- | :--- |
| **Our Story** | `/pages/our-story` | `page.our-story` |
| **Store Locator** | `/pages/store-locator` | `page.store-locator` |
| **Wholesale** | `/pages/wholesale` | `page.wholesale` |
| **Sprouts Australia Contest** | `/pages/sproutslaunchwinflightstoaustralia` | `page.contest` |
| **Official Rules** | `/pages/rules` | `page.rules` |
| **Privacy Policy** | `/policies/privacy-policy` | `Default page` (`page`) |
| **Terms of Service** | `/policies/terms-of-service` | `Default page` (`page`) |

### Recommended Product Metafields (`custom.*`)
To empower the merchant to customize product information per SKU without editing code, configure these metafield definitions in **Settings > Custom data > Products**:

| Metafield Key | Type | Description |
| :--- | :--- | :--- |
| `custom.origin` | Single line text | Peanut origin (e.g. "Kingaroy, Queensland, Australia") |
| `custom.ingredients` | Multi-line text | Product ingredients list (e.g. "Hi-Oleic Peanuts (99.2%), Sea Salt") |
| `custom.protein` | Single line text | Protein per serving (e.g. "7g Protein per 2 Tbsp") |
| `custom.storage` | Single line text | Storage instructions (e.g. "Store in a cool, dry place. No stirring required.") |
| `custom.bottle_count` | Number (integer) | Pack size multiplier (1, 2, 3, 6) |
| `custom.promo_badge` | Single line text | Custom promotional badge text (e.g. "HOT DEAL", "BESTSELLER") |

---

## 5. Performance & SEO Highlights

- **Native Lazy Loading**: `loading="lazy"` on all offscreen images.
- **Responsive Picture Formats**: Uses Shopify's `image_url` filter with dynamic widths.
- **Zero Heavy JS Libraries**: Vanilla ES6+ without React, jQuery, or third-party overhead.
- **Full SEO & OpenGraph**: Structured schema markup and dynamic canonical tags in `snippets/seo-meta.liquid`.
- **Accessible & Keyboard Friendly**: WCAG compliant focus outlines, skip-links, and semantic HTML5 landmarks.
