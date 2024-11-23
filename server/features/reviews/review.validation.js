import { check } from 'express-validator';
import customBadWords from './customBadWords.js';
import { Filter } from 'bad-words';

const filter = new Filter();
filter.addWords(...customBadWords);

// Common rules used across different validations
const commonRules = {
  ratings: () =>
    check('ratings')
      .isInt({ min: 1, max: 5 })
      .withMessage('Ratings must be an integer between 1 and 5'),
  description: () =>
    check('description')
      .notEmpty()
      .withMessage('Description is required!')
      .isLength({ min: 5 })
      .withMessage('Description must be at least 5 characters long')
      .custom((value) => !filter.isProfane(value))
      .withMessage('Description contains prohibited words'),
  suggestion: () =>
    check('suggestion')
      .optional()
      .custom((value) => !filter.isProfane(value))
      .withMessage('Suggestion contains prohibited words')
};

// Validation rules for creating a new review
const reviewCreateRules = () => [
  commonRules.ratings(),
  commonRules.description(),
  commonRules.suggestion(),
  check('isAnonymous')
    .optional()
    .isBoolean()
    .withMessage('isAnonymous must be a boolean value'),
  check('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array')
    .custom((value) => value.every((img) => typeof img === 'object'))
    .withMessage('Each image must be a valid object')
];

// Validation rules for updating an existing review
const reviewUpdateRules = () => [
  check('ratings')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Ratings must be an integer between 1 and 5'),
  commonRules.description().optional(),
  commonRules.suggestion().optional(),
  check('isAnonymous')
    .optional()
    .isBoolean()
    .withMessage('isAnonymous must be a boolean value'),
  check('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array')
    .custom((value) => value.every((img) => typeof img === 'object'))
    .withMessage('Each image must be a valid object')
];

export { reviewCreateRules, reviewUpdateRules };
