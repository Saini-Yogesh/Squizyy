# Squizyy — Shopify Online Store 2.0 Theme

## Complete Developer, Maintenance & Deployment Guide

* [ ] 

---

## ⚡ Quick Command Cheat Sheet

Always run commands from the project root (`c:\Users\yoges\Desktop\GitHub\Squizyy`) or `cd squizyy-shopify-theme`:

| Action                                     | Command from Project Root                                                                               | Command inside `squizyy-shopify-theme/`                                  |
| :----------------------------------------- | :------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------- |
| **Verify Theme Health**              | `npm run theme:check`                                                                                 | `npx shopify theme check`                                                |
| **Start Live Local Preview**         | `npx shopify theme dev --path squizyy-shopify-theme --store=squizyy-dev.myshopify.com`                | `npx shopify theme dev --store=squizyy-dev.myshopify.com`                |
| **Push as Safe Draft Theme**         | `npx shopify theme push --path squizyy-shopify-theme --store=squizyy-dev.myshopify.com --unpublished` | `npx shopify theme push --store=squizyy-dev.myshopify.com --unpublished` |
| **Push to Live Published Store**     | `npx shopify theme push --path squizyy-shopify-theme --store=squizyy-dev.myshopify.com --live`        | `npx shopify theme push --store=squizyy-dev.myshopify.com --live`        |
| **Pull Merchant Customizer Changes** | `npx shopify theme pull --path squizyy-shopify-theme --store=squizyy-dev.myshopify.com`               | `npx shopify theme pull --store=squizyy-dev.myshopify.com`               |

---

## 🚀 1. How to Push and Deploy Code to Shopify

You have two powerful options to deploy your code to your Shopify store:

### Method A: Shopify CLI (Direct Command Line Push)

#### Step 1: Log in to Shopify

When you run a Shopify CLI command for the first time, it will automatically open your web browser and prompt you to log into your Shopify partner / merchant account:

```powershell
npx shopify auth login
```

*(If you are already logged in, you can skip this step).*

#### Step 2: Push safely as an Unpublished Draft Theme (Recommended First)

Never push untested code directly to the live store. Push it as an unpublished theme first:

```powershell
# From project root:
npx shopify theme push --path squizyy-shopify-theme --store=squizyy-dev.myshopify.com --unpublished

# OR from inside squizyy-shopify-theme:
cd squizyy-shopify-theme
npx shopify theme push --store=squizyy-dev.myshopify.com --unpublished
```

- Shopify CLI will ask you to name this theme (e.g., `Squizyy Development [Date]`).
- It uploads all Liquid files, CSS, JS, templates, and assets to Shopify.
- It generates a private **Preview Link** that you can open in your browser or share with team members without affecting live visitors.

#### Step 3: Publish the Theme

Once you have tested the preview:

- **Option 1 (Via Shopify Admin)**: Go to **Shopify Admin > Online Store > Themes**, find your uploaded theme in the **Theme Library**, and click **Publish**.
- **Option 2 (Via CLI directly)**:
  ```powershell
  npx shopify theme push --path squizyy-shopify-theme --store=squizyy-dev.myshopify.com --live
  ```

---

### Method B: GitHub Integration (Automatic Auto-Deploy on `git push`)

Shopify can link directly to your GitHub repository so that every time you run `git push origin main`, Shopify automatically updates your theme!

1. Open **Shopify Admin** (`https://admin.shopify.com/store/squizyy-dev`).
2. Go to **Online Store > Themes**.
3. In the **Theme Library** section, click **Add theme > Connect from GitHub**.
4. Log into GitHub and select the repository: `Saini-Yogesh/Squizyy`.
5. Select the branch: `main`.
6. Select the theme directory: `squizyy-shopify-theme`.
7. Click **Connect**.
8. Now, whenever you push code with `git push`, Shopify instantly updates the theme in your store!

---

## 🛠️ 2. "Where Do I Change What?" (File Modification Guide)

Use this table as your directory map whenever you need to edit or customize a part of the website:

| What do you want to change?                     | Which file to edit                                                                              | What to look for inside                                                                                                     |
| :---------------------------------------------- | :---------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **Brand Colors, Fonts, Global Tokens**    | `assets/theme.css`                                                                            | `:root` custom properties (`--color-background`, `--color-foreground`, `--color-accent-purple`, `--font-primary`) |
| **Header Navigation & Logo**              | `sections/header.liquid`                                                                      | Menu links (`Shop`, `Our Story`, `Store Locator`), cart icon, logo                                                    |
| **Announcement Bar Text & Ticker**        | `sections/announcement-bar.liquid`                                                            | Top running ticker text & animation speed                                                                                   |
| **Footer Links, Copyright & Newsletter**  | `sections/footer.liquid`                                                                      | Navigation columns, social media links, copyright notice                                                                    |
| **Homepage Hero Banner & CTAs**           | `sections/hero.liquid`                                                                        | Headline, subtext, CTA button links, hero background images                                                                 |
| **Homepage Section Ordering**             | `templates/index.json`                                                                        | The `"order"` array controls which sections appear on the homepage and in what order                                      |
| **Product Detail Page (PDP) Layout**      | `sections/product-main.liquid`                                                                | PDP Buy Box, ratings, subscription toggle, accordions                                                                       |
| **Product Image Gallery & Thumbnails**    | `snippets/product-gallery.liquid`                                                             | PDP image frame, zoom, thumbnail strip buttons                                                                              |
| **Bottle Pack Selector (1x, 2x, 3x, 6x)** | `snippets/bottle-selector.liquidassets/product.js`                                            | Pack sizes, discount percentages (10%, 15%, 20%), bundle calculation logic                                                  |
| **Product Cards in Shop/Collections**     | `snippets/product-card.liquid`                                                                | Product title, star rating, hover image swap, add-to-cart button                                                            |
| **Pricing & Sale Badges**                 | `snippets/price.liquidsnippets/product-badge.liquid`                                          | Currency formatting, compare-at crossed prices, sale badges                                                                 |
| **Slide-Out Ajax Cart Drawer**            | `snippets/cart-drawer.liquidassets/cart.js`                                                   | Cart layout, free shipping meter progress, quantity buttons (+/-), remove item                                              |
| **Free Shipping Threshold ($49.99)**      | `config/settings_data.json`                                                                   | `"free_shipping_threshold": 4999` (value in cents, e.g. 4999 = $49.99)                                                    |
| **10% Off Retro TV Newsletter Popup**     | `snippets/newsletter-modal.liquidassets/custom.js`                                            | Modal popup delay, 10% discount text, peeking mascot launcher                                                               |
| **Store Locator Page & Retailers**        | `sections/store-locator.liquid`                                                               | Retail stores list (Sprouts, Target, Whole Foods), zip/city search filter                                                   |
| **Our Story Brand Page & Timeline**       | `sections/story-hero.liquidsections/story-founders.liquid``sections/story-timeline.liquid`  | Flight map, founders story photo, 2024–2026 milestone cards                                                                |
| **Wholesale Inquiry Page**                | `sections/wholesale-hero.liquidsections/wholesale-form.liquid`                                | Partner inquiry form, retail ticker icons, Sprouts banner                                                                   |
| **Contest / Giveaway Page**               | `sections/contest-hero.liquidsections/contest-details.liquid``sections/contest-draw.liquid` | Contest video URL, prize cards ($2,000, flights), draw form                                                                 |
| **404 Not Found Page**                    | `sections/main-404.liquid`                                                                    | Mascot image, 404 heading, return home button                                                                               |
| **Global Buttons, Icons & SVGs**          | `snippets/button.liquidsnippets/icon.liquid`                                                  | Pill button styles, SVG icons (cart, close, check, star, arrow)                                                             |
| **Add New Images, SVGs, or Fonts**        | `assets/`                                                                                     | Drop files in `assets/` and reference using `{{ 'filename.ext' \| asset_url }}`                                          |

---

## 💻 3. How to Preview & Develop Locally (`shopify theme dev`)

Before pushing code to Shopify, you can run a local development server that reloads automatically as you edit files:

```powershell
# From project root:
npx shopify theme dev --path squizyy-shopify-theme --store=squizyy-dev.myshopify.com

# OR from inside squizyy-shopify-theme:
cd squizyy-shopify-theme
npx shopify theme dev --store=squizyy-dev.myshopify.com
```

### What this does:

1. Connects securely to `squizyy-dev.myshopify.com` to pull your live product and collection data.
2. Serves your local Liquid files, CSS, and JS at `http://127.0.0.1:9292`.
3. Provides hot-reload in your browser: whenever you save a file in VS Code or your IDE, the page refreshes automatically!
4. Provides a link to the **Shopify Theme Editor (Customize)** so you can test tweaking settings live.
5. Press `Ctrl + C` in the terminal when you are done.

---

## 🔄 4. How to Pull Changes from Shopify (`shopify theme pull`)

### Why this is critical:

When you or a merchant uses the **Shopify Theme Editor (Customize button in Shopify Admin)** to change colors, announcement text, or section order, Shopify saves those edits in `templates/*.json` and `config/settings_data.json` on Shopify's cloud servers.

If you edit local code and push without pulling first, you might overwrite merchant customizer settings!

### Best Practice Workflow:

1. **Pull before starting work**:
   ```powershell
   npx shopify theme pull --path squizyy-shopify-theme --store=squizyy-dev.myshopify.com
   ```

   Select your theme from the interactive list.
2. **Commit the pulled changes to Git**:
   ```powershell
   git add .
   git commit -m "chore: sync theme settings from Shopify"
   ```
3. **Make your code edits** in `squizyy-shopify-theme/`.
4. **Validate**:
   ```powershell
   npm run theme:check
   ```
5. **Push your updated theme**:
   ```powershell
   npx shopify theme push --path squizyy-shopify-theme --store=squizyy-dev.myshopify.com --unpublished
   ```

---

## ⚠️ 5. Crucial Things You Need to Know (Rules & Gotchas)

### 1. Always Run `npm run theme:check` Before Pushing

We have achieved **0 offenses, 0 errors, and 0 warnings** across all 57 theme files. Keep it clean!

- **Correct way from root**: `npm run theme:check`
- **Correct way inside folder**: `cd squizyy-shopify-theme; npx shopify theme check`
- **Avoid**: Running `npx shopify theme check` in the root without `--path squizyy-shopify-theme` (this checks the root monorepo instead of the theme).

### 2. Never Use Parser-Blocking Scripts

- **Do NOT use**: `{{ 'script.js' | asset_url | script_tag }}` (This blocks browser rendering and triggers `ParserBlockingScript`).
- **Always use**: `<script src="{{ 'script.js' | asset_url }}" defer="defer"></script>`

### 3. Always Include `width` and `height` on Images

- Shopify Theme Check requires explicit dimensions on `<img>` tags to eliminate Cumulative Layout Shift (CLS):
  ```liquid
  <img src="{{ 'photo.png' | asset_url }}" alt="Description" width="1500" height="1000" loading="lazy">
  ```
- For above-the-fold hero banners, do **not** add `loading="lazy"`. For all below-the-fold images, add `loading="lazy"`.

### 4. How Liquid Asset References Work

- To reference any image, font, or stylesheet in `assets/`, always use the `asset_url` filter:
  ```liquid
  {{ 'theme.css' | asset_url | stylesheet_tag }}
  <img src="{{ 'pdp-image.png' | asset_url }}" ...>
  ```
- Never hardcode absolute paths like `/assets/image.png` or external CDN domains.

### 5. How Online Store 2.0 Templates Work

- All templates in `templates/*.json` are JSON files defining:
  1. Which sections render on the page (`"sections": { ... }`).
  2. The display order of those sections (`"order": [ ... ]`).
- To reorder sections or add a new section, you can simply edit the JSON file or drag-and-drop sections in the Shopify Theme Editor!

---

## 📞 Support & Verification Checklist

Before deploying to live customers, verify:

- [ ] Run `npm run theme:check` — Must report `57 files inspected with no offenses found`.
- [ ] Test Ajax Cart — Add items to cart; verify drawer opens, count updates, and free shipping progress meter calculates correctly.
- [ ] Test Bottle Bundle Selector — Toggle 1-Pack, 2-Pack, 3-Pack, 6-Pack; verify price updates with 10%, 15%, 20% discounts.
- [ ] Test Responsive Mobile View — Open on mobile viewport; check burger menu drawer, logo, and buy button.
- [ ] Test Checkout Button — Click "Checkout" in drawer; verify redirect to Shopify's secure native `/checkout` page.
