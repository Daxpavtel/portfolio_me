const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const env = require('../config/env');

/**
 * JWT authentication middleware.
 * Verifies the Authorization: Bearer <token> header.
 * On success, attaches the decoded admin payload to req.admin.
 */
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authentication required'));
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.admin = { id: decoded.id, username: decoded.username };
    next();
  } catch (err) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
}

module.exports = authMiddleware;
