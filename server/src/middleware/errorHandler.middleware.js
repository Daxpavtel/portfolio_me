const env = require('../config/env');

/**
 * Centralized error handler.
 * Formats all errors into a consistent JSON envelope.
 */
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || null;

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern)[0];
    message = `Duplicate value for ${field}`;
  }

  if (statusCode === 500 && env.NODE_ENV === 'production') {
    message = 'Internal Server Error';
  }

  if (env.NODE_ENV === 'development' && statusCode === 500) {
    console.error('ERROR:', err);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
}

module.exports = errorHandler;
