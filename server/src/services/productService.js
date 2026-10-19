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
  if (!slug) return null;
  const cleanSlug = String(slug).trim().toLowerCase();

  if (getIsConnected()) {
    try {
      const product = await Product.findOne({
        $or: [
          { slug: cleanSlug },
          { _id: cleanSlug.match(/^[0-9a-fA-F]{24}$/) ? cleanSlug : null }
        ]
      });
      if (product) return product;
    } catch (err) {
      console.warn('Mongoose query failed, using memory cache:', err.message);
    }
  }

  // Alias compatibility
  const targetSlug = cleanSlug === 'drizzy-peanut-drizzle' 
    ? 'drizzy-squeezy-peanut-butter-19-4-oz' 
    : cleanSlug;

  const found = memoryProducts.find(p => p.slug === targetSlug || p.id === cleanSlug || p._id === cleanSlug);
  return found || null;
};

const updateProductInMemory = (slug, data) => {
  const index = memoryProducts.findIndex(p => p.slug === slug || p.id === slug);
  if (index !== -1) {
    memoryProducts[index] = { ...memoryProducts[index], ...data };
    return memoryProducts[index];
  }
  return null;
};

const updateProduct = async (slug, data) => {
  let updatedDoc = null;
  if (getIsConnected()) {
    try {
      updatedDoc = await Product.findOneAndUpdate(
        { $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }] },
        { $set: data },
        { new: true }
      );
    } catch (err) {
      console.warn('Mongoose update product error:', err.message);
    }
  }

  const memoryUpdated = updateProductInMemory(slug, data);
  return updatedDoc || memoryUpdated;
};

module.exports = {
  getAllProducts,
  getProductBySlug,
  updateProductInMemory,
  updateProduct
};
