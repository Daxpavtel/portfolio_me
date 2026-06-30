const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
      trim: true,
    },
    longDescription: {
      type: String,
      maxlength: [2000, 'Long description cannot exceed 2000 characters'],
      trim: true,
    },
    techStack: {
      type: [String],
      required: [true, 'Tech stack is required'],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'At least one technology is required',
      },
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: {
        values: ['web', 'mobile', 'backend', 'fullstack', 'other'],
        message: '{VALUE} is not a valid category',
      },
      default: 'web',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
