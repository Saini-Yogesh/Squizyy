const storeService = require('../services/storeService');
const { sendSuccess } = require('../utils/apiResponse');

const getStores = async (req, res, next) => {
  try {
    const { query } = req.query;
    const stores = await storeService.getStores(query);
    return sendSuccess(res, stores, 'Stores retrieved successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStores
};
