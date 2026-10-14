const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

// Protect all admin endpoints
router.use(adminAuth);

router.get('/stats', adminController.getDashboardStats);
router.put('/products/:slug', adminController.updateProduct);

module.exports = router;
