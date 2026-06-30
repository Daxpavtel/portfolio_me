const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      maxlength: [150, 'Subject cannot exceed 150 characters'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    ipAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
