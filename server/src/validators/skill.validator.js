const { body } = require('express-validator');

const skillRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isIn(['frontend', 'backend', 'database', 'devops', 'tools', 'soft-skills'])
    .withMessage('Invalid category'),
  body('proficiency')
    .notEmpty().withMessage('Proficiency is required')
    .isInt({ min: 1, max: 100 }).withMessage('Proficiency must be between 1 and 100'),
  body('icon')
    .optional({ values: 'falsy' })
    .trim(),
  body('order')
    .optional()
    .isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
];

module.exports = skillRules;
