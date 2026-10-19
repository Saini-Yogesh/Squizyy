# API Reference — Squizyy / Drizzy

Base URL: `http://localhost:5000/api` (proxied in development to `/api`)

---

## 1. Response Envelope Format

### Successful Response
```json
{
  "success": true,
  "data": { ... } // or array
}
```

### Error Response
```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

---

## 2. Public Endpoints

### 2.0 System & Health

#### `GET /`
Root test route for verifying server responsiveness in a browser.
- **Response**: `{ "success": true, "message": "Drizzy API Server is running", "status": "ok" }`
- **Status Code**: `200 OK`

#### `GET /api/health`
Liveness probe endpoint.
- **Response**: `{ "status": "ok", "timestamp": "2026-10-19T..." }`
- **Status Code**: `200 OK`

---

### 2.1 Products

#### `GET /api/products`
Retrieves all available products.
- **Response**: Array of product objects.

#### `GET /api/products/:slug`
Retrieves product details by URL slug (e.g. `drizzy-squeezy-peanut-butter-19-4-oz`).
- **Response**: Single product object including `bottleOptions`, `nutritionFacts`, `ingredients`.
- **Status Codes**: `200 OK`, `404 Not Found`.

---

### 2.2 Store Locator

#### `GET /api/stores`
Retrieves retail stores stocking Drizzy.
- **Query Params**: `query` (optional string, e.g. `Dallas`, `TX`, `75206`).
- **Response**: Array of store objects with normalized address, contact phone, and operating hours.

---

### 2.3 Reviews

#### `GET /api/reviews`
Retrieves customer reviews.
- **Query Params**: `productSlug` (optional string).
- **Response**: Array of review objects with ratings (1–5) and verified badge flags.

#### `POST /api/reviews`
Submits a customer product review.
- **Request Body**:
  ```json
  {
    "productSlug": "drizzy-squeezy-peanut-butter-19-4-oz",
    "author": "Jane D.",
    "rating": 5,
    "title": "Best PB ever!",
    "content": "Super smooth, no knives needed."
  }
  ```
- **Validation**: Rating must be an integer between 1 and 5. Author, title, and content are required.
- **Status Codes**: `201 Created`, `400 Bad Request`.

---

### 2.4 Cart & Checkout

#### `POST /api/cart/checkout`
Processes an order checkout.
- **Request Body**:
  ```json
  {
    "customer": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "(555) 123-4567"
    },
    "shippingAddress": {
      "address1": "123 Main St",
      "city": "Austin",
      "state": "TX",
      "zip": "78701",
      "country": "US"
    },
    "items": [
      {
        "id": "8932474355883-3",
        "title": "Drizzy Squeezy Peanut Butter 19.4 Oz",
        "price": 2697,
        "quantity": 1,
        "purchaseType": "one-time"
      }
    ],
    "subtotal": 2697,
    "shipping": 500,
    "tax": 222,
    "total": 3419
  }
  ```
- **Response**: `{ "success": true, "data": { ...order, "orderNumber": "DRZ-1001" } }`.
- **Status Codes**: `201 Created`, `400 Bad Request`.

---

### 2.5 Forms & Lead Capture

#### `POST /api/newsletter`
Subscribes an email to the newsletter.
- **Request Body**: `{ "email": "user@example.com", "source": "homepage_signup_10" }`
- **Validation**: RFC 5322 email regex verification.
- **Behavior**: Existing/duplicate emails return status `200` with confirmation rather than throwing database duplicate errors.

#### `POST /api/wholesale`
Submits a B2B wholesale partner inquiry.
- **Request Body**:
  ```json
  {
    "name": "Sarah Smith",
    "email": "sarah@market.com",
    "company": "Smith Gourmet Grocers",
    "phone": "(555) 987-6543",
    "estimatedLocations": "1-5",
    "message": "Interested in stocking case packs."
  }
  ```

#### `POST /api/contest`
Submits an entry into the Sprouts Australia flights giveaway.
- **Request Body**:
  ```json
  {
    "firstName": "Alex",
    "lastName": "Rivera",
    "email": "alex@example.com",
    "agreedRules": true,
    "newsletterOptIn": true,
    "receiptFile": "receipt_2026.jpg"
  }
  ```
- **Validation**: `agreedRules` must be `true`.

---

## 3. Protected Admin Endpoints

All admin endpoints require the `x-admin-key` HTTP header matching the server's `ADMIN_SECRET_KEY` (default: `drizzy_admin_secret_key_2026`).

#### `GET /api/admin/stats`
- **Headers**: `x-admin-key: <ADMIN_SECRET_KEY>`
- **Response**: Aggregated metrics (total orders, total revenue, wholesale count, contest entries count, subscriber count) and recent document records.
- **Status Codes**: `200 OK`, `401 Unauthorized`.

#### `PUT /api/admin/products/:slug`
- **Headers**: `x-admin-key: <ADMIN_SECRET_KEY>`
- **Request Body**: Updates to product pricing or inventory, e.g. `{ "price": 999 }`.
- **Status Codes**: `200 OK`, `401 Unauthorized`, `404 Not Found`.
