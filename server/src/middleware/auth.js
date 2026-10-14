const { sendError } = require('../utils/apiResponse');

const adminAuth = (req, res, next) => {
  const secretKey = process.env.ADMIN_API_KEY || 'drizzy_admin_secret_key_2026';
  const providedKey = req.headers['x-admin-key'] || req.query.adminKey || req.headers['authorization'];

  if (!providedKey) {
    return sendError(res, 'Unauthorized: Admin authentication token required', 401);
  }

  const token = providedKey.startsWith('Bearer ') ? providedKey.slice(7) : providedKey;

  if (token !== secretKey) {
    return sendError(res, 'Forbidden: Invalid admin credentials', 403);
  }

  next();
};

module.exports = {
  adminAuth
};
