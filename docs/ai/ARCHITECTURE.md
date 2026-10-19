# System Architecture — Squizyy / Drizzy

This document details the architectural decisions, patterns, and state flow across the full-stack Squizyy / Drizzy application.

---

## 1. High-Level Architecture

The project is structured as a clean full-stack monorepo:

```
[ Client: Vite + React 18 ] <---- HTTP/JSON ----> [ Server: Node.js + Express ]
         |                                                   |
    CSS Modules                                     Mongoose / MongoDB
  Design Tokens (CSS Vars)                         (In-Memory Fallbacks)
```

- **Client (`client/`)**: Modern Single-Page Application (SPA) built with React 18, Vite 5, React Router v6, and localized CSS Modules.
- **Server (`server/`)**: RESTful Node.js + Express backend with a layered Controller-Service-Model pattern and resilient in-memory fallback datasets.

---

## 2. Frontend Architecture (`client/`)

### 2.1 Component Hierarchy & Directory Conventions
Components are strictly categorized by responsibility:
- **`components/common/`**: Reusable primitive UI components (`Button`, `Badge`, `Spinner`). They accept standard props and contain zero domain-specific business logic.
- **`components/layout/`**: Page chrome elements rendered across routes or toggled globally (`Navbar`, `Footer`, `AnnouncementBar`, `CartDrawer`, `NewsletterModal`).
- **`components/product/`**: Domain components specific to catalog, PDP, and e-commerce (`PdpBuyBox`, `BottleSelector`, `ProductGallery`, `ComparisonTable`, `ReviewCarousel`, `GoodStuffOnly`, `ProductFaq`).
- **`components/sections/`**: Modular sections assembled on marketing/landing pages (`Hero`, `FeaturesGrid`, `FeatureTicker`, `FullPageMedia`, `MarqueeCards`, `InstaFeed`, `Newsletter`).
- **`pages/`**: Full page views mounted by `react-router-dom` in `App.jsx`. Each page has an adjacent `*.module.css` file.

### 2.2 Styling Strategy: CSS Modules & Design System
- **Strict Isolation**: Tailwind CSS directives have been replaced with localized CSS Modules (`[name].module.css`). Classes are scoped automatically to prevent global namespace pollution.
- **Tokens & Variables**: Core theme variables reside in `client/src/styles/variables.css`:
  - Background: `--color-background: #fffaf3`
  - Foreground / Dark Brown: `--color-foreground: #2b1408`
  - Cream: `--color-cream: #fffbf2`
  - Accent Purple: `--color-accent-purple: #ca9af1`
  - Accent Green: `--color-accent-green: #176537`
  - Fonts: `--font-primary: 'Champ Black', serif`, `--font-secondary: 'Azeret Mono', monospace`, `--font-body: 'Inter', sans-serif`
- **Global Reset & Base**: `client/src/styles/reset.css` provides modern HTML5 resets, while `client/src/styles/globals.css` declares custom `@font-face` definitions, keyframe animations (`marquee`, `announcement-marquee`, `spin`), and universal chunky button classes (`.button-primary`).

### 2.3 State Management & Cart Lifecycle
- **CartContext (`client/src/context/CartContext.jsx`)**:
  - Manages cart drawer visibility (`isOpen` / `isCartOpen`), item quantity, and cart operations.
  - Automatically persists cart state to `localStorage` under `drizzy_cart`.
  - Calculates subtotal, shipping cost (free over $49.99 / 4999 cents), tax, and free shipping progress meter.
  - Provides dual-API backward compatibility for property names (`items` and `cart.items`) and method overloads (`removeFromCart(id)` and `removeFromCart(productId, count, type)`).

### 2.4 API Communication Layer (`client/src/services/api.js`)
- Standardized Axios instance with 10-second timeout and `/api` baseURL (proxied to `http://localhost:5000` during development via `client/vite.config.js`).
- Defensive data extraction: responses are normalized so components receive predictable arrays or objects even if the backend returns `{ success: true, data: [...] }`.

---

## 3. Backend Architecture (`server/`)

### 3.1 Layered Controller-Service-Model Pattern
1. **Routes (`server/src/routes/`)**: Define HTTP verbs, endpoint paths, and connect endpoints to controller methods.
2. **Controllers (`server/src/controllers/`)**: Parse and validate request bodies, query params, and headers. Call services and return JSON responses with standard status codes.
3. **Services (`server/src/services/`)**: Implement business logic, database queries, data formatting, and in-memory fallback datasets.
4. **Models (`server/src/models/`)**: Mongoose schemas defining schema rules, defaults, timestamps, and indexes.

### 3.2 Resilient In-Memory Fallbacks
When MongoDB is not connected (e.g. initial development, testing, or offline development), the services (`productService.js`, `storeService.js`) automatically fall back to memory-backed mock datasets. This ensures frontend functionality remains completely operational without database downtime.

### 3.3 Security & Middleware
- **CORS**: Configured in `server/src/app.js` with client origin support.
- **Admin Authentication (`server/src/middleware/auth.js`)**: Verifies the `x-admin-key` header against `process.env.ADMIN_SECRET_KEY` for protected routes (`/api/admin/*`).
- **Input Validation**: RFC 5322 email regex verification and range clamping on user submissions.
- **Centralized Error Handler (`server/src/middleware/errorHandler.js`)**: Catches unhandled errors and MongoDB duplicate key errors (11000), returning standard error envelopes without crashing the server process.

---

## 4. Key Workflows

### 4.1 E-Commerce Checkout Flow
1. User selects bottle quantity (1, 2, 3, or 6 bottles) and purchase type (one-time or subscription with frequency) on PDP (`ProductDetails.jsx` -> `PdpBuyBox.jsx`).
2. Item added to `CartContext`. `CartDrawer` automatically opens.
3. User navigates to `/cart` (`CartPage.jsx`) and submits customer & shipping details.
4. `checkoutOrder` service POSTs payload to `/api/cart/checkout`.
5. Backend creates new `Order` document with generated `orderNumber` (e.g. `DRZ-1001`) and saves to database.
6. Frontend clears cart and renders order confirmation view with order ID and summary.

### 4.2 Store Locator Search Flow
1. User enters city, state, or ZIP code on `/pages/store-locator` (`StoreLocator.jsx`).
2. Defensive search matches against `name`, `street`, `city`, `state`, or `zip`.
3. Selected store displays interactive Google Maps directions link and details card.
