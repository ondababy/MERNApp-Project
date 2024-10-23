import * as yup from 'yup';

export const courierValidation = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Courier name must be at least 3 characters long')
    .required('*Required'),

  contactPerson: yup
    .string()
    .required('*Required'),

  contactNumber: yup
    .string()
    .length(11, 'Contact number must be exactly 11 digits')
    .required('*Required'),

  emailAddress: yup
    .string()
    .email('Must be a valid email address')
    .required('*Required'),

  serviceArea: yup
    .string()
    .min(3, 'Service area must be at least 3 characters long')
    .required('*Required'),

  // images: yup
  //   .array()
  //   .of(yup.object().shape({
  //   }))
  //   .optional(), 
});
