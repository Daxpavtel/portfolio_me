const env = require('../config/env');

const isDev = env.NODE_ENV === 'development';

const logger = {
  info: (...args) => isDev && console.log('[INFO]', ...args),
  warn: (...args) => console.warn('[WARN]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
};

module.exports = logger;
