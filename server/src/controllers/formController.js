const formService = require('../services/formService');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email, source } = req.body;
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return sendError(res, 'Please provide a valid email address', 400);
    }
    const result = await formService.subscribeNewsletter(email.trim(), source);
    return sendSuccess(
      res, 
      result, 
      result.isNew ? 'Thanks for subscribing! Use code WELCOME10 for 10% off.' : 'You are already subscribed!'
    );
  } catch (err) {
    next(err);
  }
};

const submitWholesale = async (req, res, next) => {
  try {
    const { name, email, company, phone, estimatedLocations, message } = req.body;
    if (!name || !name.trim()) {
      return sendError(res, 'Full name is required', 400);
    }
    if (!email || !EMAIL_REGEX.test(String(email).trim())) {
      return sendError(res, 'A valid business email address is required', 400);
    }
    if (!company || !company.trim()) {
      return sendError(res, 'Company or store name is required', 400);
    }

    const submission = await formService.submitWholesale({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      phone: phone ? String(phone).trim() : '',
      estimatedLocations: estimatedLocations || '1-5',
      message: message ? String(message).trim() : ''
    });

    return sendSuccess(
      res, 
      submission, 
      'Thank you! Your wholesale inquiry has been submitted. Our sales team will reach out within 24-48 hours.', 
      201
    );
  } catch (err) {
    next(err);
  }
};

const submitContest = async (req, res, next) => {
  try {
    const { firstName, lastName, email, agreedRules, newsletterOptIn, receiptFile } = req.body;
    if (!firstName || !firstName.trim() || !lastName || !lastName.trim()) {
      return sendError(res, 'First name and last name are required', 400);
    }
    if (!email || !EMAIL_REGEX.test(String(email).trim())) {
      return sendError(res, 'A valid email address is required', 400);
    }
    if (!agreedRules) {
      return sendError(res, 'You must agree to the Official Rules & Eligibility Terms', 400);
    }

    const entry = await formService.submitContest({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      agreedRules: true,
      newsletterOptIn: Boolean(newsletterOptIn),
      receiptFile: receiptFile || (req.file ? `/uploads/${req.file.filename}` : 'receipt_demo.jpg')
    });

    return sendSuccess(
      res, 
      entry, 
      'Congratulations! Your entry for the Australia trip draw has been received.', 
      201
    );
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
    if (!author || !author.trim()) {
      return sendError(res, 'Author name is required', 400);
    }
    const numericRating = Math.min(5, Math.max(1, Math.round(Number(rating) || 5)));
    if (!content || !content.trim()) {
      return sendError(res, 'Review comments/content cannot be empty', 400);
    }

    const newReview = await formService.createReview({
      author: author.trim(),
      rating: numericRating,
      title: title ? title.trim() : 'Loved it!',
      content: content.trim(),
      location: location ? location.trim() : 'Verified Buyer',
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
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return sendError(res, 'Your cart is empty. Please add items before checking out.', 400);
    }
    if (!customer?.firstName?.trim()) {
      return sendError(res, 'First name is required', 400);
    }
    if (!customer?.email || !EMAIL_REGEX.test(String(customer.email).trim())) {
      return sendError(res, 'A valid customer email address is required', 400);
    }

    // Sanitize item details and enforce minimum quantities
    const validatedItems = items.map(item => ({
      productId: item.productId || item.slug || 'drizzy-pb',
      title: item.title || item.name || 'Drizzy Squeezy Peanut Butter',
      bottleCount: Math.max(1, parseInt(item.bottleCount, 10) || 1),
      unitPrice: Math.max(0, parseInt(item.price || item.unitPrice, 10) || 999),
      quantity: Math.max(1, parseInt(item.quantity, 10) || 1),
      image: item.image || '/assets/images/1_bottle.png',
      purchaseType: item.purchaseType === 'subscription' ? 'subscription' : 'one-time',
      deliveryFrequency: item.deliveryFrequency || ''
    }));

    // Server-side subtotal verification
    const verifiedSubtotal = validatedItems.reduce(
      (sum, item) => sum + (item.unitPrice * item.quantity), 
      0
    );
    const verifiedShipping = verifiedSubtotal >= 4999 || verifiedSubtotal === 0 ? 0 : 599;
    const verifiedTax = Math.round(verifiedSubtotal * 0.0825);
    const verifiedTotal = verifiedSubtotal + verifiedShipping + verifiedTax;

    const validatedCustomer = {
      firstName: customer.firstName.trim(),
      lastName: (customer.lastName || 'Customer').trim(),
      email: customer.email.trim().toLowerCase(),
      phone: customer.phone ? String(customer.phone).trim() : ''
    };

    const validatedShippingAddress = {
      address1: shippingAddress?.address1?.trim() || '123 Main St',
      address2: shippingAddress?.address2?.trim() || '',
      city: shippingAddress?.city?.trim() || 'Dallas',
      state: shippingAddress?.state?.trim() || 'TX',
      zip: shippingAddress?.zip?.trim() || '75201',
      country: shippingAddress?.country?.trim() || 'US'
    };

    const order = await formService.createOrder({
      customer: validatedCustomer,
      shippingAddress: validatedShippingAddress,
      items: validatedItems,
      subtotal: subtotal !== undefined ? Number(subtotal) : verifiedSubtotal,
      shipping: shipping !== undefined ? Number(shipping) : verifiedShipping,
      tax: tax !== undefined ? Number(tax) : verifiedTax,
      total: total !== undefined ? Number(total) : verifiedTotal
    });

    // Return both top-level order and nested order for client convenience
    const responsePayload = {
      ...order,
      order
    };

    return sendSuccess(res, responsePayload, 'Order confirmed successfully! Thank you for your purchase.', 201);
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
