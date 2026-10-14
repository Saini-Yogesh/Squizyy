const Product = require('../models/Product');
const { productsData } = require('./seedData');
const { getIsConnected } = require('../config/db');

// In-memory fallback cache
let memoryProducts = [...productsData];

const getAllProducts = async () => {
  if (getIsConnected()) {
    try {
      const products = await Product.find({ available: true });
      if (products && products.length > 0) return products;
    } catch (err) {
      console.warn('Mongoose query failed, using memory cache:', err.message);
    }
  }
  return memoryProducts;
};

const getProductBySlug = async (slug) => {
  if (getIsConnected()) {
    try {
      const product = await Product.findOne({ slug });
      if (product) return product;
    } catch (err) {
      console.warn('Mongoose query failed, using memory cache:', err.message);
    }
  }
  return memoryProducts.find(p => p.slug === slug || (slug === 'drizzy-peanut-drizzle' && p.slug === 'drizzy-squeezy-peanut-butter-19-4-oz')) || memoryProducts[0];
};

const updateProductInMemory = (slug, data) => {
  const index = memoryProducts.findIndex(p => p.slug === slug);
  if (index !== -1) {
    memoryProducts[index] = { ...memoryProducts[index], ...data };
    return memoryProducts[index];
  }
  return null;
};

module.exports = {
  getAllProducts,
  getProductBySlug,
  updateProductInMemory
};
