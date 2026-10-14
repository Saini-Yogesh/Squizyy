const { sendError } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  console.error('[Error]', err.stack || err.message || err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(el => el.message);
    return sendError(res, 'Validation Error', 400, errors);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return sendError(res, `Duplicate value for ${field}. Please use another value.`, 400);
  }

  // Default server error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return sendError(res, message, statusCode);
};

module.exports = errorHandler;
