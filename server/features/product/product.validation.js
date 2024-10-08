import { unique } from '#utils';
import { check } from 'express-validator';
import ProductModel from './product.model.js';

const commonRules = () => {
  return [
    check('name')
      .notEmpty()
      .withMessage('Name is required!')
      .matches(/^[a-zA-Z0-9 ]+$/)
      .withMessage('Name must be alphanumeric!'),
  ];
};

const productCreateRules = () => {
  // METHOD CHAINING
  return [
    ...commonRules(),
    check('name')
      .custom((value) => unique(ProductModel, 'name', value))
      .withMessage('Name must be unique!'),
  ];
};

const productUpdateRules = () => {
  return [
    ...commonRules(),
    check('name')
      .custom((value, { req }) =>
        unique(ProductModel, 'name', value, req?.params?.id, { slug: { $ne: req?.params?.slug } })
      )
      .withMessage('Name must be unique!'),
  ];
};
export { productCreateRules, productUpdateRules };

// // USING SCHEMA: BUT i don't like it
// return checkSchema({
//   name: {
//     notEmpty: { errorMessage: 'Name is required!' },
//   },
// });
