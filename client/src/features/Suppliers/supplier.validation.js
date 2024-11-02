import * as yup from 'yup';

export const supplierValidation = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Supplier name must be at least 3 characters long')
    .required('*Required'),

  contactPerson: yup
    .string()
    .required('*Required'),

  emailAddress: yup
    .string()
    .email('Must be a valid email address')
    .required('*Required'),

  contactNumber: yup
    .string()
    .length(11, 'Contact Number must contain exactly 11 digits')
    .required('*Required'),

  description: yup
    .string()
    .optional(), 

  // images: yup
  //   .array()
  //   .of(yup.object().shape({
  //   }))
  //   .optional(), 
});
