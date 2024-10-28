import * as yup from 'yup';

export const brandValidation = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Brand name must be at least 3 characters long')
    .required('*Required'),
  
  description: yup
    .string()
    .required('*Required'),
  
  websiteUrl: yup
    .string()
    .url('Must be a valid URL')
    .required('*Required'),

  emailAddress: yup
    .string()
    .email('Must be a valid email address')
    .required('*Required'),
  
  // images: yup
  //   .array()
  //   .of(yup.object().shape({
  //   }))
  //   .optional(),
});
