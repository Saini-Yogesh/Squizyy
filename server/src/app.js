const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const storeRoutes = require('./routes/storeRoutes');
const formRoutes = require('./routes/formRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorHandler');
const { generalApiLimiter } = require('./middleware/rateLimiter');

const app = express();

// Security headers with Helmet
app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false // Handled at reverse proxy/storefront level
}));

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://squizyy-store.myshopify.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests or dev mode
    if (!origin || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.myshopify.com')) {
      return callback(null, true);
    }
    return callback(new Error('CORS request blocked by Squizyy security policy'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
  credentials: true
}));

// HTTP Logger
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Request size limits to prevent body-parser Denial-of-Service
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Static uploads if any
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// General API Rate Limiting across all /api routes
app.use('/api', generalApiLimiter);

// Root test route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Squizyy API Server is running', status: 'ok' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount Routes
app.use('/api/products', productRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api', formRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Centralized error handler
app.use(errorHandler);

module.exports = app;
