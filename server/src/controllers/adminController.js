const formService = require('../services/formService');
const productService = require('../services/productService');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const getDashboardStats = async (req, res, next) => {
  try {
    const data = await formService.getAdminData();
    const products = await productService.getAllProducts();
    return sendSuccess(res, { ...data, products }, 'Admin dashboard data loaded');
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const updateData = req.body;
    const updated = await productService.updateProduct(slug, updateData);
    if (!updated) {
      return sendError(res, 'Product not found', 404);
    }
    return sendSuccess(res, updated, 'Product updated successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboardStats,
  updateProduct
};
