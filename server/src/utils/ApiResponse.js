/**
 * Returns a consistent success envelope.
 * @param {*} data - Response payload
 * @param {string} [message] - Optional success message
 * @param {number} [statusCode=200] - HTTP status code
 */
function ApiResponse(res, data, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
}

module.exports = ApiResponse;
