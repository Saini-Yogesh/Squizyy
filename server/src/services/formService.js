const Wholesale = require('../models/Wholesale');
const Contest = require('../models/Contest');
const Newsletter = require('../models/Newsletter');
const Review = require('../models/Review');
const Order = require('../models/Order');
const { reviewsData } = require('./seedData');
const { getIsConnected } = require('../config/db');

// In-memory fallbacks
let memoryWholesale = [];
let memoryContest = [];
let memoryNewsletter = [];
let memoryReviews = [...reviewsData];
let memoryOrders = [];

// Newsletter
const subscribeNewsletter = async (email, source = 'homepage-footer') => {
  const cleanEmail = email.toLowerCase().trim();
  if (getIsConnected()) {
    try {
      const existing = await Newsletter.findOne({ email: cleanEmail });
      if (existing) {
        return { subscriber: existing, isNew: false };
      }
      const newSub = await Newsletter.create({ email: cleanEmail, source });
      return { subscriber: newSub, isNew: true };
    } catch (err) {
      console.warn('Mongoose newsletter error:', err.message);
    }
  }

  const existing = memoryNewsletter.find(n => n.email === cleanEmail);
  if (existing) return { subscriber: existing, isNew: false };
  const newSub = {
    _id: 'sub_' + Date.now(),
    email: cleanEmail,
    source,
    createdAt: new Date()
  };
  memoryNewsletter.push(newSub);
  return { subscriber: newSub, isNew: true };
};

// Wholesale
const submitWholesale = async (data) => {
  if (getIsConnected()) {
    try {
      const sub = await Wholesale.create(data);
      return sub;
    } catch (err) {
      console.warn('Mongoose wholesale error:', err.message);
    }
  }

  const sub = {
    _id: 'wh_' + Date.now(),
    ...data,
    status: 'new',
    createdAt: new Date()
  };
  memoryWholesale.push(sub);
  return sub;
};

// Contest
const submitContest = async (data) => {
  if (getIsConnected()) {
    try {
      const entry = await Contest.create(data);
      return entry;
    } catch (err) {
      console.warn('Mongoose contest error:', err.message);
    }
  }

  const entry = {
    _id: 'contest_' + Date.now(),
    ...data,
    status: 'pending',
    createdAt: new Date()
  };
  memoryContest.push(entry);
  return entry;
};

// Reviews
const getReviews = async (productSlug = 'drizzy-squeezy-peanut-butter-19-4-oz') => {
  if (getIsConnected()) {
    try {
      const reviews = await Review.find({ productSlug }).sort({ createdAt: -1 });
      if (reviews && reviews.length > 0) return reviews;
    } catch (err) {
      console.warn('Mongoose reviews error:', err.message);
    }
  }
  return memoryReviews.filter(r => !productSlug || r.productSlug === productSlug);
};

const createReview = async (data) => {
  if (getIsConnected()) {
    try {
      const review = await Review.create(data);
      return review;
    } catch (err) {
      console.warn('Mongoose create review error:', err.message);
    }
  }
  const review = {
    _id: 'rev_' + Date.now(),
    ...data,
    createdAt: new Date()
  };
  memoryReviews.unshift(review);
  return review;
};

// Orders / Checkout
const createOrder = async (orderData) => {
  const orderNumber = 'DRZ-' + Math.floor(100000 + Math.random() * 900000);
  const fullOrder = {
    orderNumber,
    ...orderData,
    status: 'paid',
    createdAt: new Date()
  };

  if (getIsConnected()) {
    try {
      const saved = await Order.create(fullOrder);
      return saved;
    } catch (err) {
      console.warn('Mongoose create order error:', err.message);
    }
  }

  memoryOrders.unshift(fullOrder);
  return fullOrder;
};

// Admin metrics
const getAdminData = async () => {
  let orders = memoryOrders;
  let wholesale = memoryWholesale;
  let contest = memoryContest;
  let newsletter = memoryNewsletter;

  if (getIsConnected()) {
    try {
      orders = await Order.find().sort({ createdAt: -1 });
      wholesale = await Wholesale.find().sort({ createdAt: -1 });
      contest = await Contest.find().sort({ createdAt: -1 });
      newsletter = await Newsletter.find().sort({ createdAt: -1 });
    } catch (err) {
      console.warn('Mongoose admin fetch error:', err.message);
    }
  }

  const totalSalesCents = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return {
    metrics: {
      totalOrders: orders.length,
      totalRevenue: (totalSalesCents / 100).toFixed(2),
      wholesaleInquiries: wholesale.length,
      contestEntries: contest.length,
      subscribersCount: newsletter.length
    },
    orders,
    wholesale,
    contest,
    newsletter
  };
};

module.exports = {
  subscribeNewsletter,
  submitWholesale,
  submitContest,
  getReviews,
  createReview,
  createOrder,
  getAdminData
};
