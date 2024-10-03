import * as yup from 'yup';

export const userValidation = yup.object().shape({
  name: yup.string().min(3, 'Name must be at least 3 characters long').required('*Required'),
  email: yup.string().email('Invalid email address').required('*Required'),
  password: yup.string().min(6, 'Password must be at least 6 characters long').required('*Required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('*Required'),
});
