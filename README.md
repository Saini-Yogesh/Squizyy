# Drizzy USA — Full-Stack Web Application

High-fidelity reconstruction and full-stack implementation of the Drizzy reference store ([getdrizzy.co](https://getdrizzy.co/)). Built with a **React.js + JavaScript + Tailwind CSS** frontend and a **Node.js + Express.js + MongoDB + Mongoose** backend.

---

## 🥜 Project Architecture

```
Squizyy/
├── client/                     # Frontend Application (React + Vite + Tailwind CSS)
│   ├── public/
│   │   └── assets/             # 127 Original reference images, stickers, SVGs & fonts
│   │       ├── fonts/          # Champ-Black.otf, Azeret Mono, Inter
│   │       └── images/         # Bottles, drips, mascots, retail partner logos
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # AnnouncementBar, Navbar, Footer, CartDrawer
│   │   │   ├── product/        # BottleSelector, ProductCard, ProductGallery,
│   │   │   │                   # ComparisonTable, ReviewCarousel
│   │   │   └── sections/       # Hero, FeatureTicker, FeaturesGrid, InstaFeed, Newsletter
│   │   ├── context/            # CartContext (persisted cart, free shipping meter, drawer)
│   │   ├── pages/              # Home, Products, ProductDetails, OurStory,
│   │   │                       # StoreLocator, Wholesale, SproutsContest, Rules,
│   │   │                       # PrivacyPolicy, TermsOfService, CartPage, AdminDashboard
│   │   ├── services/           # Centralized Axios API service (api.js)
│   │   ├── App.jsx             # React Router and layout assembly
│   │   ├── index.css           # Brand typography (@font-face Champ Black) & theme tokens
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
│
├── server/                     # Backend Application (Node.js + Express + Mongoose)
│   ├── src/
│   │   ├── config/             # MongoDB connection with hybrid fallback (db.js)
│   │   ├── controllers/        # productController, storeController, formController, adminController
│   │   ├── models/             # Product, Store, Wholesale, Contest, Newsletter, Review, Order
│   │   ├── routes/             # productRoutes, storeRoutes, formRoutes, adminRoutes
│   │   ├── services/           # productService, storeService, formService, seedData
│   │   ├── middleware/         # errorHandler, auth (admin token verification)
│   │   ├── utils/              # apiResponse
│   │   ├── app.js              # Express app, Helmet, CORS, Morgan
│   │   └── server.js           # Server listener
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── getdrizzy/                  # Original captured reference website archive
├── README.md                   # Full documentation and setup instructions
└── .gitignore
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18+ or v20+)
- **npm** (v9+)
- *(Optional)* **MongoDB** (local or Atlas URI). The backend features automatic graceful fallback so it functions completely out of the box even without a local MongoDB service running.

---

### 1. Backend Server Setup (`server/`)

1. Open a terminal and navigate to the `server/` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Default settings in `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/drizzy
   NODE_ENV=development
   ADMIN_API_KEY=drizzy_admin_secret_key_2026
   CLIENT_URL=http://localhost:5173
   ```

4. Start the server:
   ```bash
   npm start
   # Server will start on http://localhost:5000
   ```

---

### 2. Frontend Client Setup (`client/`)

1. In a new terminal window, navigate to the `client/` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   # Client will run on http://localhost:5173
   ```

4. Open your browser at **`http://localhost:5173`**.

---

## 🎨 Visual Accuracy & Design System

The frontend faithfully replicates the visual hierarchy, colors, spacing, and typography of the reference website:

- **Typography**: Authentic `@font-face` integration of **`Champ Black`** display font for headings, buttons, and prices, alongside **`Azeret Mono`** and **`Inter`**.
- **Color Palette**:
  - Background: `#f8ebd7` (signature peanut butter cream)
  - Text & Accents: `#2d0f28` (rich plum / deep purple)
  - Highlights: `#ca9af1` (lilac purple accent)
  - Badges & Trust: `#036e2c` (green accent)
- **Signature UI Elements**:
  - Top scrolling announcement bar with Union and peanut icons
  - 1x, 2x, 3x [Most Popular], 6x [Best Value] bottle quantity cards with real stickers
  - Free shipping progress meter in slide-out Cart Drawer ($49.99 threshold)
  - "Kiss Your Jar Goodbye, Mwa!" Drizzy vs. The Rest matrix
  - Real customer review carousel ("Loved by 1,000+ Aussies")
  - Instagram photo grid (`@getdrizzy`) featuring original lifestyle photography

---

## 🌐 Full Website Routes Reconstructed

| Route | Page Name | Features |
|---|---|---|
| `/` | **Home** | Hero banner, Feature ticker marquee, Interactive bottle selector, Comparison table, Customer reviews, Instagram gallery, Newsletter |
| `/collections/all` | **Shop All** | Complete product catalog grid with pricing, ratings, and quick add |
| `/products/:slug` | **Product Detail** | Thumbnail gallery, bottle bundle selector, subscribe & save 10%, ingredients accordion, review submission |
| `/pages/our-story` | **Our Story** | Australian Soul vs American Way interactive tab toggle, 3-chapter brand timeline |
| `/pages/store-locator` | **Store Locator** | Search nationwide Sprouts locations by city, state, or ZIP with Google Maps directions |
| `/pages/wholesale` | **Wholesale** | Retailer & cafe partnership inquiry form with instant submission API |
| `/pages/sproutslaunchwinflightstoaustralia` | **Sprouts Giveaway** | Flight to Australia giveaway landing page with receipt photo upload & entry verification |
| `/pages/rules` | **Official Rules** | Official sweepstakes rules, terms, and eligibility conditions |
| `/policies/privacy-policy` | **Privacy Policy** | Comprehensive privacy policy document |
| `/policies/terms-of-service` | **Terms of Service** | Terms of service and guarantee clauses |
| `/cart` | **Cart Page** | Full cart review, free shipping progress bar, shipping estimator, and simulated checkout |
| `/admin` | **Admin Dashboard** | Protected management console: live revenue metrics, orders, wholesale leads, contest entrants, and price manager |

---

## 🔌 API Endpoints Reference

### Products
- `GET /api/products` — Retrieve all available products with bundle options
- `GET /api/products/:slug` — Retrieve single product details by slug

### Stores
- `GET /api/stores?query=...` — Search retail stockists by city, state, or ZIP

### Customer Reviews
- `GET /api/reviews?productSlug=...` — Fetch reviews for product
- `POST /api/reviews` — Submit new customer review

### Inquiries & Forms
- `POST /api/newsletter` — Subscribe email (returns `WELCOME10` 10% coupon code)
- `POST /api/wholesale` — Submit wholesale retail partner application
- `POST /api/contest` — Submit Sprouts launch sweepstakes receipt entry

### Cart & Checkout
- `POST /api/cart/checkout` — Place order and receive order confirmation number

### Admin (Protected by header `x-admin-key: drizzy_admin_secret_key_2026`)
- `GET /api/admin/stats` — Load revenue metrics, orders, wholesale submissions, contest entries, subscribers
- `PUT /api/admin/products/:slug` — Update product details or base prices