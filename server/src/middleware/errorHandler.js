const { sendError } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  // Always log server-side for observability and monitoring
  console.error('[API Error]', err.stack || err.message || err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(el => el.message);
    return sendError(res, 'Validation Error: Please check your input fields', 400, errors);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return sendError(res, `Duplicate entry for ${field}. Please use another value.`, 400);
  }

  // CORS policy block
  if (err.message && err.message.includes('CORS request blocked')) {
    return sendError(res, 'Access Denied: Request origin not allowed', 403);
  }

  // Default server error handling
  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);

  // In production, sanitize internal 500 error messages to prevent sensitive stack or schema leakage
  let message = err.message || 'Internal Server Error';
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'An unexpected server error occurred. Please try again later.';
  }

  return sendError(res, message, statusCode);
};

module.exports = errorHandler;
