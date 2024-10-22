import { check } from 'express-validator';

const commonrules = {
  email: () => check('email').isEmail().withMessage('Email is invalid'),
  username: () =>
    check('username')
      .notEmpty()
      .withMessage('Username is required')
      .matches(/^[a-zA-Z0-9 ]+$/)
      .withMessage('Username must be alphanumeric'),
  password: () =>
    check('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters')
      .custom(matchPassword),
  first_name: () =>
    check('first_name')
      .notEmpty()
      .withMessage('First name is required')
      .matches(/^[a-zA-Z ]+$/)
      .withMessage('First name must be alphabetic'),
  last_name: () =>
    check('last_name')
      .notEmpty()
      .withMessage('Last name is required')
      .matches(/^[a-zA-Z ]+$/)
      .withMessage('Last name must be alphabetic'),
  contact: () =>
    check('contact')
      .notEmpty()
      .withMessage('Contact is required')
      .matches(/^[0-9]{10}$/)
      .withMessage('Contact must be 10 digits'),
  address: () => check('address').notEmpty().withMessage('Address is required'),
  birthdate: () => check('birthdate').isISO8601().withMessage('Birthdate is invalid').optional(),
  city: () => check('city').notEmpty().withMessage('City is required'),
  region: () => check('region').notEmpty().withMessage('Region is required'),
  zip_code: () => check('zip_code').withMessage('Zip code is invalid'),
  role: () => check('role').optional().isIn(ROLES).withMessage('Role is invalid'),
};

const matchPassword = (value, { req }) => {
  if (value !== req.body.confirm_password) throw new Error('Password does not match!');
  return value;
};

const userCreateRules = () => {
  return [...Object.values(commonrules).map((rule) => rule())];
};

const userUpdateRules = () => {
  return [
    ...Object.values(commonrules).map((rule) => rule().optional()),
    check('id').notEmpty().withMessage('ID is required'),
  ];
};
export { userCreateRules, userUpdateRules };
