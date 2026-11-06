const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');
const { adminAuthLimiter } = require('../middleware/rateLimiter');

// Protect all admin endpoints with rate limiting and strict auth header validation
router.use(adminAuthLimiter);
router.use(adminAuth);

router.get('/stats', adminController.getDashboardStats);
router.put('/products/:slug', adminController.updateProduct);

module.exports = router;
