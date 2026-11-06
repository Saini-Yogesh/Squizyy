const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const { formSubmissionLimiter, checkoutLimiter } = require('../middleware/rateLimiter');

router.post('/newsletter', formSubmissionLimiter, formController.subscribeNewsletter);
router.post('/wholesale', formSubmissionLimiter, formController.submitWholesale);
router.post('/contest', formSubmissionLimiter, formController.submitContest);
router.get('/reviews', formController.getReviews);
router.post('/reviews', formSubmissionLimiter, formController.submitReview);
router.post('/cart/checkout', checkoutLimiter, formController.checkout);

module.exports = router;
