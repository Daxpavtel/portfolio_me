const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

/**
 * Middleware that checks express-validator results.
 * If validation errors exist, throws ApiError(422) with the error array.
 */
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
    }));
    return next(new ApiError(422, 'Validation failed', formatted));
  }
  next();
}

module.exports = validate;
