const formService = require('../services/formService');
const productService = require('../services/productService');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Defensive string sanitizer to prevent injection and XSS
 */
const sanitizeText = (val, maxLen = 255) => {
  if (typeof val !== 'string') return '';
  return val
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Strip control chars
    .trim()
    .slice(0, maxLen);
};

const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email, source } = req.body;
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return sendError(res, 'Please provide a valid email address', 400);
    }
    const cleanEmail = email.trim().toLowerCase().slice(0, 100);
    const cleanSource = sanitizeText(source || 'website', 50);

    const result = await formService.subscribeNewsletter(cleanEmail, cleanSource);
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
    const cleanName = sanitizeText(name, 100);
    const cleanEmail = String(email || '').trim().toLowerCase().slice(0, 100);
    const cleanCompany = sanitizeText(company, 150);

    if (!cleanName) {
      return sendError(res, 'Full name is required', 400);
    }
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return sendError(res, 'A valid business email address is required', 400);
    }
    if (!cleanCompany) {
      return sendError(res, 'Company or store name is required', 400);
    }

    const submission = await formService.submitWholesale({
      name: cleanName,
      email: cleanEmail,
      company: cleanCompany,
      phone: sanitizeText(phone, 25),
      estimatedLocations: sanitizeText(estimatedLocations || '1-5', 20),
      message: sanitizeText(message, 1500)
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
    const cleanFirstName = sanitizeText(firstName, 60);
    const cleanLastName = sanitizeText(lastName, 60);
    const cleanEmail = String(email || '').trim().toLowerCase().slice(0, 100);

    if (!cleanFirstName || !cleanLastName) {
      return sendError(res, 'First name and last name are required', 400);
    }
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return sendError(res, 'A valid email address is required', 400);
    }
    if (!agreedRules) {
      return sendError(res, 'You must agree to the Official Rules & Eligibility Terms', 400);
    }

    const cleanReceipt = sanitizeText(receiptFile || (req.file ? `/uploads/${req.file.filename}` : 'receipt_online.jpg'), 200);

    const entry = await formService.submitContest({
      firstName: cleanFirstName,
      lastName: cleanLastName,
      email: cleanEmail,
      agreedRules: true,
      newsletterOptIn: Boolean(newsletterOptIn),
      receiptFile: cleanReceipt
    });

    return sendSuccess(
      res, 
      entry, 
      'Congratulations! Your entry for the Squizyy India Grand Launch Giveaway has been received.', 
      201
    );
  } catch (err) {
    next(err);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const cleanSlug = sanitizeText(req.query.productSlug || '', 100);
    const reviews = await formService.getReviews(cleanSlug);
    return sendSuccess(res, reviews, 'Reviews retrieved successfully');
  } catch (err) {
    next(err);
  }
};

const submitReview = async (req, res, next) => {
  try {
    const { author, rating, title, content, location, productSlug } = req.body;
    const cleanAuthor = sanitizeText(author, 80);
    if (!cleanAuthor) {
      return sendError(res, 'Author name is required', 400);
    }
    const numericRating = Math.min(5, Math.max(1, Math.round(Number(rating) || 5)));
    const cleanContent = sanitizeText(content, 2000);
    if (!cleanContent) {
      return sendError(res, 'Review comments/content cannot be empty', 400);
    }

    const newReview = await formService.createReview({
      author: cleanAuthor,
      rating: numericRating,
      title: sanitizeText(title || 'Loved it!', 100),
      content: cleanContent,
      location: sanitizeText(location || 'Verified Buyer', 60),
      productSlug: sanitizeText(productSlug || 'squizyy-squeezy-peanut-butter-19-4-oz', 100)
    });

    return sendSuccess(res, newReview, 'Thank you for your review!', 201);
  } catch (err) {
    next(err);
  }
};

/**
 * Robust, tamper-proof checkout controller
 * Prices are strictly verified against the server catalog. Client totals are ignored.
 */
const checkout = async (req, res, next) => {
  try {
    const { customer, shippingAddress, items } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return sendError(res, 'Your cart is empty. Please add items before checking out.', 400);
    }

    const cleanFirstName = sanitizeText(customer?.firstName, 60);
    const cleanEmail = String(customer?.email || '').trim().toLowerCase().slice(0, 100);

    if (!cleanFirstName) {
      return sendError(res, 'First name is required', 400);
    }
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return sendError(res, 'A valid customer email address is required', 400);
    }

    // Server-Side Source of Truth Price Verification
    const validatedItems = [];
    for (const item of items) {
      const cleanSlug = sanitizeText(item.slug || item.productId || 'squizyy-squeezy-peanut-butter-19-4-oz', 100);
      const bottleCount = Math.max(1, Math.min(24, parseInt(item.bottleCount, 10) || 1));
      const quantity = Math.max(1, Math.min(100, parseInt(item.quantity, 10) || 1));

      // Query database/catalog for authentic price
      const catalogProduct = await productService.getProductBySlug(cleanSlug);
      let verifiedUnitPrice = 34900; // Fallback ₹349.00 in cents

      if (catalogProduct) {
        verifiedUnitPrice = catalogProduct.price || 34900;
        if (catalogProduct.bottleOptions && Array.isArray(catalogProduct.bottleOptions)) {
          const matchedOpt = catalogProduct.bottleOptions.find(opt => opt.quantity === bottleCount);
          if (matchedOpt) {
            verifiedUnitPrice = matchedOpt.price;
          } else {
            // Apply authentic tier discount if option not matched
            if (bottleCount === 2) verifiedUnitPrice = Math.round(verifiedUnitPrice * 2 * 0.90);
            else if (bottleCount === 3) verifiedUnitPrice = Math.round(verifiedUnitPrice * 3 * 0.85);
            else verifiedUnitPrice = verifiedUnitPrice * bottleCount;
          }
        }
      }

      validatedItems.push({
        productId: cleanSlug,
        title: sanitizeText(catalogProduct?.name || item.title || item.name || 'Squizyy Squeezy Peanut Butter', 120),
        bottleCount,
        unitPrice: verifiedUnitPrice,
        quantity,
        image: sanitizeText(item.image || '/assets/images/1_bottle.png', 200),
        purchaseType: 'one-time',
        deliveryFrequency: ''
      });
    }

    // Server-Side Totals Calculation (Tamper-Proof)
    const verifiedSubtotal = validatedItems.reduce(
      (sum, item) => sum + (item.unitPrice * item.quantity), 
      0
    );
    // Free delivery over ₹499 (49900 cents)
    const verifiedShipping = verifiedSubtotal >= 49900 || verifiedSubtotal === 0 ? 0 : 5000;
    // 5% GST for peanut butter in India
    const verifiedTax = Math.round(verifiedSubtotal * 0.05);
    const verifiedTotal = verifiedSubtotal + verifiedShipping + verifiedTax;

    const validatedCustomer = {
      firstName: cleanFirstName,
      lastName: sanitizeText(customer?.lastName || 'Customer', 60),
      email: cleanEmail,
      phone: sanitizeText(customer?.phone || '', 25)
    };

    const validatedShippingAddress = {
      address1: sanitizeText(shippingAddress?.address1 || 'Saurashtra Street', 150),
      address2: sanitizeText(shippingAddress?.address2 || '', 100),
      city: sanitizeText(shippingAddress?.city || 'Ahmedabad', 60),
      state: sanitizeText(shippingAddress?.state || 'Gujarat', 60),
      zip: sanitizeText(shippingAddress?.zip || '380001', 20),
      country: sanitizeText(shippingAddress?.country || 'India', 50)
    };

    const order = await formService.createOrder({
      customer: validatedCustomer,
      shippingAddress: validatedShippingAddress,
      items: validatedItems,
      subtotal: verifiedSubtotal,
      shipping: verifiedShipping,
      tax: verifiedTax,
      total: verifiedTotal
    });

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
