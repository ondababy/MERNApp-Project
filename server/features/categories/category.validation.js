import { unique } from '#utils';
import { check } from 'express-validator';
import CategoryModel from './category.model.js';

const commonRules = {
  name: () =>
    check('name')
      .notEmpty()
      .withMessage('Name is required!')
      .matches(/^[a-zA-Z0-9 ]+$/)
      .withMessage('Name must be alphanumeric!'),
};

const categoryCreateRules = () => {
  return [
    ...Object.entries(commonRules).map(([field, rule]) => {
      switch (field) {
        case 'name':
          return rule()
            .custom((value) => unique(CategoryModel, 'name', value))
            .withMessage('Name must be unique!');

        default:
          return rule();
      }
    }),
  ];
};

const categoryUpdateRules = () => {
  return [
    ...Object.entries(commonRules).map(([field, rule]) => {
      switch (field) {
        case 'name':
          return rule()
            .custom((value, { req }) =>
              unique(CategoryModel, 'name', value, req?.params?.id, { slug: { $ne: req?.params?.slug } })
            )
            .withMessage('Name must be unique!');

        default:
          return rule().optional();
      }
    }),
  ];
};
export { categoryCreateRules, categoryUpdateRules };
