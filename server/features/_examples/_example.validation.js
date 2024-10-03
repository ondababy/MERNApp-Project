import { unique } from '#utils';
import { check } from 'express-validator';
import _ExampleModel from './_example.model.js';

const commonRules = () => {
  return [
    check('name')
      .notEmpty()
      .withMessage('Name is required!')
      .matches(/^[a-zA-Z0-9 ]+$/)
      .withMessage('Name must be alphanumeric!'),
  ];
};

const _exampleCreateRules = () => {
  // METHOD CHAINING
  return [
    ...commonRules(),
    check('name')
      .custom((value) => unique(_ExampleModel, 'name', value))
      .withMessage('Name must be unique!'),
  ];
};

const _exampleUpdateRules = () => {
  return [
    ...commonRules(),
    check('name')
      .custom((value, { req }) =>
        unique(_ExampleModel, 'name', value, req?.params?.id, { slug: { $ne: req?.params?.slug } })
      )
      .withMessage('Name must be unique!'),
  ];
};
export { _exampleCreateRules, _exampleUpdateRules };

// // USING SCHEMA: BUT i don't like it
// return checkSchema({
//   name: {
//     notEmpty: { errorMessage: 'Name is required!' },
//   },
// });
