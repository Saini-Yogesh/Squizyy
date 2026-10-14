const formService = require('../services/formService');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email, source } = req.body;
    if (!email || !email.includes('@')) {
      return sendError(res, 'Please provide a valid email address', 400);
    }
    const result = await formService.subscribeNewsletter(email, source);
    return sendSuccess(res, result, result.isNew ? 'Thanks for subscribing! Use code WELCOME10 for 10% off.' : 'You are already subscribed!');
  } catch (err) {
    next(err);
  }
};

const submitWholesale = async (req, res, next) => {
  try {
    const { name, email, company, phone, estimatedLocations, message } = req.body;
    if (!name || !email || !company) {
      return sendError(res, 'Name, email, and company are required fields', 400);
    }
    const submission = await formService.submitWholesale({
      name,
      email,
      company,
      phone,
      estimatedLocations,
      message
    });
    return sendSuccess(res, submission, 'Thank you! Your wholesale inquiry has been submitted. Our sales team will reach out within 24-48 hours.', 201);
  } catch (err) {
    next(err);
  }
};

const submitContest = async (req, res, next) => {
  try {
    const { firstName, lastName, email, agreedRules, newsletterOptIn, receiptFile } = req.body;
    if (!firstName || !lastName || !email) {
      return sendError(res, 'Please provide your first name, last name, and email', 400);
    }
    if (!agreedRules) {
      return sendError(res, 'You must agree to the Official Rules & Eligibility Terms', 400);
    }
    const entry = await formService.submitContest({
      firstName,
      lastName,
      email,
      agreedRules: true,
      newsletterOptIn: !!newsletterOptIn,
      receiptFile: receiptFile || (req.file ? `/uploads/${req.file.filename}` : 'receipt_demo.jpg')
    });
    return sendSuccess(res, entry, 'Congratulations! Your entry for the Australia trip draw has been received.', 201);
  } catch (err) {
    next(err);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const { productSlug } = req.query;
    const reviews = await formService.getReviews(productSlug);
    return sendSuccess(res, reviews, 'Reviews retrieved successfully');
  } catch (err) {
    next(err);
  }
};

const submitReview = async (req, res, next) => {
  try {
    const { author, rating, title, content, location, productSlug } = req.body;
    if (!author || !rating || !content) {
      return sendError(res, 'Author name, rating, and review content are required', 400);
    }
    const newReview = await formService.createReview({
      author,
      rating: Number(rating),
      title: title || 'Loved it!',
      content,
      location: location || 'Verified Buyer',
      productSlug: productSlug || 'drizzy-squeezy-peanut-butter-19-4-oz'
    });
    return sendSuccess(res, newReview, 'Thank you for your review!', 201);
  } catch (err) {
    next(err);
  }
};

const checkout = async (req, res, next) => {
  try {
    const { customer, shippingAddress, items, subtotal, shipping, tax, total } = req.body;
    if (!items || !items.length) {
      return sendError(res, 'Your cart is empty', 400);
    }
    if (!customer?.email || !customer?.firstName) {
      return sendError(res, 'Customer name and email are required', 400);
    }

    const order = await formService.createOrder({
      customer,
      shippingAddress: shippingAddress || {
        address1: '123 Main St',
        city: 'Dallas',
        state: 'TX',
        zip: '75201',
        country: 'US'
      },
      items,
      subtotal: subtotal || 0,
      shipping: shipping || 0,
      tax: tax || 0,
      total: total || subtotal
    });

    return sendSuccess(res, order, 'Order confirmed successfully! Thank you for your purchase.', 201);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  subscribeNewsletter,
  submitWholesale,
  submitContest,
  getReviews,
  submitReview,
  checkout
};
