# Project Map — Squizyy / Drizzy

> **AI Instructions**: Do NOT perform a full repository scan. Use this verified map to navigate directly to the relevant files for your task. Only inspect the files you need.

---

## 1. Quick Navigation & Feature Map

| Feature / Domain | Primary Frontend Files | Backend Services / Controllers | Database Model |
| :--- | :--- | :--- | :--- |
| **Global Chrome & Layout** | `client/src/components/layout/AnnouncementBar.jsx`<br>`client/src/components/layout/Navbar.jsx`<br>`client/src/components/layout/Footer.jsx`<br>`client/src/App.jsx` | N/A | N/A |
| **Landing Page** | `client/src/pages/Home.jsx`<br>`client/src/components/sections/Hero.jsx`<br>`client/src/components/sections/FeatureTicker.jsx`<br>`client/src/components/sections/FeaturesGrid.jsx`<br>`client/src/components/sections/FullPageMedia.jsx`<br>`client/src/components/sections/MarqueeCards.jsx`<br>`client/src/components/sections/InstaFeed.jsx`<br>`client/src/components/product/ComparisonTable.jsx`<br>`client/src/components/product/FeaturedProductSection.jsx` | N/A (Static + Marketing) | N/A |
| **Catalog & Products** | `client/src/pages/Products.jsx`<br>`client/src/components/product/ProductCard.jsx` | `server/src/controllers/productController.js`<br>`server/src/services/productService.js` | `server/src/models/Product.js` |
| **Product Detail (PDP)** | `client/src/pages/ProductDetails.jsx`<br>`client/src/components/product/PdpBuyBox.jsx`<br>`client/src/components/product/BottleSelector.jsx`<br>`client/src/components/product/ProductGallery.jsx`<br>`client/src/components/product/GoodStuffOnly.jsx`<br>`client/src/components/product/ProductFaq.jsx`<br>`client/src/components/product/ReviewCarousel.jsx` | `server/src/controllers/productController.js`<br>`server/src/services/productService.js` | `server/src/models/Product.js` |
| **Cart & Drawer** | `client/src/context/CartContext.jsx`<br>`client/src/hooks/useCart.js`<br>`client/src/components/layout/CartDrawer.jsx`<br>`client/src/pages/CartPage.jsx` | `server/src/controllers/formController.js` (`checkoutOrder`) | `server/src/models/Order.js` |
| **Our Story** | `client/src/pages/OurStory.jsx` | N/A | N/A |
| **Store Locator** | `client/src/pages/StoreLocator.jsx` | `server/src/controllers/formController.js`<br>`server/src/services/storeService.js` | `server/src/models/Store.js` |
| **Wholesale** | `client/src/pages/Wholesale.jsx` | `server/src/controllers/formController.js` (`submitWholesale`) | `server/src/models/Wholesale.js` |
| **Sprouts Contest** | `client/src/pages/SproutsContest.jsx` | `server/src/controllers/formController.js` (`submitContest`) | `server/src/models/Contest.js` |
| **Newsletter** | `client/src/components/layout/NewsletterModal.jsx`<br>`client/src/components/sections/Newsletter.jsx` | `server/src/controllers/formController.js` (`subscribeNewsletter`) | `server/src/models/Newsletter.js` |
| **Admin Portal** | `client/src/pages/AdminDashboard.jsx` | `server/src/controllers/adminController.js`<br>`server/src/middleware/auth.js` | All Models |
| **Legal & Policies** | `client/src/pages/Rules.jsx`<br>`client/src/pages/PrivacyPolicy.jsx`<br>`client/src/pages/TermsOfService.jsx` | N/A | N/A |

---

## 2. Core Entry Points & Application Bootstrapping

- **Client Bootstrapping**:
  - `client/index.html` — HTML shell with Google Fonts preloads.
  - `client/src/main.jsx` — React root rendering `<App />` and importing `index.css`.
  - `client/src/App.jsx` — Router setup (`BrowserRouter`), global `CartProvider`, top-level layout shell (`App.module.css`), and route switch.
  - `client/src/index.css` — Global stylesheet importing reset, variables, typography, and universal button utilities.

- **Server Bootstrapping**:
  - `server/src/server.js` — Process entry point; handles MongoDB connection and initiates HTTP server listener.
  - `server/src/app.js` — Express application setup; middleware (CORS, body-parser), route mounts (`/api/*`), and centralized error handler.
  - `server/src/config/db.js` — Mongoose connection lifecycle and connection logging.

---

## 3. Directory Layout

```
Squizyy/
├── AGENTS.md                          # Universal instructions for AI agents
├── package.json                       # Monorepo scripts (dev, build, client, server)
├── docs/ai/                           # AI project memory & documentation
│   ├── PROJECT_MAP.md                 # Verified structure, feature mapping, paths
│   ├── ARCHITECTURE.md                # System patterns, styling, data flow
│   ├── API_REFERENCE.md               # Endpoints, payloads, and response schemas
│   └── CHANGELOG.md                   # Curated architectural log
├── scripts/
│   └── verify-ai-docs.js              # Lightweight doc verification script
├── client/                            # Frontend (React 18 + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                # Shared atomic UI (Button, Badge, Spinner)
│   │   │   ├── layout/                # Shell elements (Navbar, Footer, CartDrawer)
│   │   │   ├── product/               # PDP & catalog components (PdpBuyBox, BottleSelector)
│   │   │   └── sections/              # Homepage content sections (Hero, FeaturesGrid)
│   │   ├── context/                   # Global state (CartContext)
│   │   ├── hooks/                     # Custom hooks (useCart, useScrollToTop)
│   │   ├── pages/                     # 12 routed page components (*.jsx + *.module.css)
│   │   ├── services/api.js            # Defensive Axios HTTP client
│   │   ├── styles/                    # Global tokens (variables.css, reset.css, globals.css)
│   │   └── utils/                     # Formatting & validation helpers
│   ├── vite.config.js                 # Dev server proxy (/api -> localhost:5000)
│   ├── vercel.json                    # SPA routing rewrites for Vercel deployment
│   └── package.json                   # Client dependencies and build scripts
├── server/                            # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/                    # Database connection (db.js)
│   │   ├── controllers/               # Route handlers (product, form, admin)
│   │   ├── middleware/                # Auth & error handling
│   │   ├── models/                    # Mongoose schemas (Product, Order, Store, etc.)
│   │   ├── routes/                    # Express routers
│   │   ├── services/                  # Business logic & in-memory fallbacks
│   │   └── utils/                     # Backend helper functions
│   └── package.json                   # Server dependencies and scripts
└── squizyy-shopify-theme/             # Native Shopify Online Store 2.0 Theme
    ├── assets/                        # Theme CSS, JS, fonts, and images
    ├── config/                        # Theme settings schema and defaults
    ├── layout/                        # Theme layout shells (theme.liquid)
    ├── locales/                       # Locale translations (en.default.json)
    ├── sections/                      # Modular Liquid sections (31 sections)
    ├── snippets/                      # Reusable Liquid snippets (10 snippets)
    ├── templates/                     # JSON 2.0 templates (11 templates)
    └── README.md                      # Shopify CLI instructions and guide
```

---

## 4. Key Development Commands

| Command | Working Directory | Description |
| :--- | :--- | :--- |
| `npm run dev` | Project Root | Concurrently runs backend server (5000) and frontend client (5173) |
| `npm run client:build` | Project Root | Runs Vite production build (`client/dist/`) |
| `npm run doc:verify` | Project Root | Verifies all referenced paths in `PROJECT_MAP.md` and detects doc drift |
| `npm run build` | `client/` | Vite build command for the frontend |
| `npm run dev` | `client/` | Starts Vite dev server with proxy to backend |
| `npm run dev` | `server/` | Starts Express server with nodemon |
| `npm start` | `server/` | Starts Express server in production mode |

---

## 5. CSS Modules & Styling Guidelines

- Every component or page requiring custom styling has a dedicated adjacent `*.module.css` file.
- Global styles and design tokens are declared exclusively in `client/src/styles/`:
  - `variables.css`: Palette (`--color-background`, `--color-foreground`, `--color-cream`, `--color-accent-purple`), typography, spacing, border radii.
  - `globals.css`: Typography `@font-face` definitions (Champ Black, Azeret Mono), keyframes (`marquee`, `spin`), and universal button classes (`.button-primary`).
- Never introduce Tailwind CSS directives (`@tailwind`) or inline arbitrary Tailwind utility classes.
