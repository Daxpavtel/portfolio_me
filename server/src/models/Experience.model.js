const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, 'Role is required'],
      maxlength: [100, 'Role cannot exceed 100 characters'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
      maxlength: [100, 'Company cannot exceed 100 characters'],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      default: null,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      trim: true,
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      enum: {
        values: ['work', 'education', 'internship'],
        message: '{VALUE} is not a valid type',
      },
      default: 'work',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);
