/**
 * Wraps an async Express route handler so thrown errors are forwarded to the error handler middleware.
 * @param {Function} fn - Async controller function
 * @returns {Function} Express middleware
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
