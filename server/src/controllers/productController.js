const productService = require('../services/productService');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    return sendSuccess(res, products, 'Products retrieved successfully');
  } catch (err) {
    next(err);
  }
};

const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await productService.getProductBySlug(slug);
    if (!product) {
      return sendError(res, 'Product not found', 404);
    }
    return sendSuccess(res, product, 'Product retrieved successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductBySlug
};
