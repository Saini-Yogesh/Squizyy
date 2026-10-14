# Drizzy Backend Server (Node.js + Express + MongoDB + Mongoose)

Professional REST API backend powering the Drizzy Peanut Butter full-stack application.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database & ODM**: MongoDB & Mongoose
- **Security**: Helmet, CORS, Data Sanitization, Request Validation
- **Logging**: Morgan

## Directory Structure
```
server/
├── src/
│   ├── config/          # Database configuration (db.js)
│   ├── controllers/     # Controller handlers (products, stores, forms, admin)
│   ├── models/          # Mongoose models (Product, Store, Wholesale, Contest, Newsletter, Review, Order)
│   ├── routes/          # Express route definitions
│   ├── services/        # Business logic & repository access
│   ├── middleware/      # Error handling, Auth, Uploads
│   ├── utils/           # API response helper
│   ├── app.js           # Express app setup
│   └── server.js        # Server listener
├── .env.example
├── package.json
└── README.md
```

## Setup & Running

1. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Configure environment variables**:
   Copy `.env.example` to `.env` and adjust if needed:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/drizzy
   NODE_ENV=development
   ADMIN_API_KEY=drizzy_admin_secret_key_2026
   CLIENT_URL=http://localhost:5173
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

## REST API Endpoints

### Products
- `GET /api/products` - Retrieve all available products with bundle options
- `GET /api/products/:slug` - Retrieve detailed product by slug

### Store Locator
- `GET /api/stores?query=...` - Search nationwide retail stockists by city, state, or ZIP code

### Reviews
- `GET /api/reviews?productSlug=...` - Retrieve customer reviews & ratings
- `POST /api/reviews` - Submit a new verified customer review

### Wholesale
- `POST /api/wholesale` - Submit wholesale & stockist inquiry

### Contest (Sprouts Launch Flights to Australia)
- `POST /api/contest` - Submit entry with receipt verification

### Newsletter
- `POST /api/newsletter` - Subscribe email for 10% off welcome discount

### Checkout & Cart
- `POST /api/cart/checkout` - Place order with customer & shipping details

### Admin API (Protected by `x-admin-key`)
- `GET /api/admin/stats` - Comprehensive revenue metrics, orders, inquiries & contest entries
- `PUT /api/admin/products/:slug` - Update product details or price
