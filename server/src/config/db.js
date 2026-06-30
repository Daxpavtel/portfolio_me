const mongoose = require('mongoose');
const env = require('./env');

async function connectDB(retries = 5, delayMs = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(env.MONGODB_URI);
      console.log('MongoDB connected successfully');
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1}/${retries} failed: ${err.message}`);
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, delayMs));
      } else {
        console.error('All connection attempts exhausted. Exiting.');
        process.exit(1);
      }
    }
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

module.exports = connectDB;
