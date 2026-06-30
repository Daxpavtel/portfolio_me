const { body } = require('express-validator');

const experienceRules = [
  body('role')
    .trim()
    .notEmpty().withMessage('Role is required')
    .isLength({ max: 100 }).withMessage('Role cannot exceed 100 characters'),
  body('company')
    .trim()
    .notEmpty().withMessage('Company is required')
    .isLength({ max: 100 }).withMessage('Company cannot exceed 100 characters'),
  body('location')
    .optional({ values: 'falsy' })
    .trim(),
  body('startDate')
    .notEmpty().withMessage('Start date is required')
    .isISO8601().withMessage('Invalid start date format'),
  body('endDate')
    .optional({ values: 'falsy' })
    .isISO8601().withMessage('Invalid end date format'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  body('responsibilities')
    .optional()
    .isArray().withMessage('Responsibilities must be an array'),
  body('responsibilities.*')
    .trim()
    .notEmpty().withMessage('Responsibility item cannot be empty'),
  body('type')
    .optional()
    .isIn(['work', 'education', 'internship']).withMessage('Invalid type'),
  body('order')
    .optional()
    .isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
];

module.exports = experienceRules;
