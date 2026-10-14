const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.post('/newsletter', formController.subscribeNewsletter);
router.post('/wholesale', formController.submitWholesale);
router.post('/contest', formController.submitContest);
router.get('/reviews', formController.getReviews);
router.post('/reviews', formController.submitReview);
router.post('/cart/checkout', formController.checkout);

module.exports = router;
