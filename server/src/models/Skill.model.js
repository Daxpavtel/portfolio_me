const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      unique: true,
      maxlength: [50, 'Skill name cannot exceed 50 characters'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['frontend', 'backend', 'database', 'devops', 'tools', 'soft-skills'],
        message: '{VALUE} is not a valid category',
      },
    },
    proficiency: {
      type: Number,
      required: [true, 'Proficiency is required'],
      min: [1, 'Proficiency must be at least 1'],
      max: [100, 'Proficiency cannot exceed 100'],
    },
    icon: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
