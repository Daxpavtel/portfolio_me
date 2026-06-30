const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const env = require('./config/env');
const routes = require('./routes/index');
const notFound = require('./middleware/notFound.middleware');
const errorHandler = require('./middleware/errorHandler.middleware');

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: env.NODE_ENV === 'development' ? ["'self'", 'http://localhost:*', 'http://127.0.0.1:*'] : ["'self'"],
    },
  },
}));

app.use(cors({
  origin: env.NODE_ENV === 'production' ? env.CLIENT_URL : '*',
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

if (env.NODE_ENV === 'development') {
  app.use(express.static(path.resolve(__dirname, '../../client')));
}

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
