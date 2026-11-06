const crypto = require('crypto');
const { sendError } = require('../utils/apiResponse');

const adminAuth = (req, res, next) => {
  const secretKey = process.env.ADMIN_API_KEY;

  // In production, an explicit ADMIN_API_KEY MUST be configured
  if (process.env.NODE_ENV === 'production' && !secretKey) {
    console.error('[CRITICAL SECURITY ERROR] ADMIN_API_KEY environment variable is not defined in production.');
    return sendError(res, 'Server security configuration error. Access denied.', 500);
  }

  const effectiveKey = secretKey || 'squizyy_admin_secret_key_2026';

  // Only accept authentication via secure headers (disallow query parameter token leakage)
  const providedKey = req.headers['x-admin-key'] || req.headers['authorization'];

  if (!providedKey) {
    return sendError(res, 'Unauthorized: Admin authentication token required in headers', 401);
  }

  const token = providedKey.startsWith('Bearer ') ? providedKey.slice(7).trim() : providedKey.trim();

  // Timing-safe constant-time comparison to protect against side-channel timing attacks
  const tokenBuf = Buffer.from(token);
  const keyBuf = Buffer.from(effectiveKey);

  if (tokenBuf.length !== keyBuf.length || !crypto.timingSafeEqual(tokenBuf, keyBuf)) {
    return sendError(res, 'Forbidden: Invalid admin credentials', 403);
  }

  next();
};

module.exports = {
  adminAuth
};
