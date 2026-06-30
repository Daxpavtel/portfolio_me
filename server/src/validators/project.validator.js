const { body } = require('express-validator');

const projectRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('longDescription')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 2000 }).withMessage('Long description cannot exceed 2000 characters'),
  body('techStack')
    .isArray({ min: 1 }).withMessage('At least one technology is required'),
  body('techStack.*')
    .trim()
    .notEmpty().withMessage('Technology name cannot be empty'),
  body('imageUrl')
    .trim()
    .notEmpty().withMessage('Image URL is required'),
  body('githubUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isURL().withMessage('Invalid GitHub URL'),
  body('liveUrl')
    .optional({ values: 'falsy' })
    .trim()
    .isURL().withMessage('Invalid live URL'),
  body('featured')
    .optional()
    .isBoolean().withMessage('Featured must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
  body('category')
    .optional()
    .isIn(['web', 'mobile', 'backend', 'fullstack', 'other']).withMessage('Invalid category'),
];

module.exports = projectRules;
