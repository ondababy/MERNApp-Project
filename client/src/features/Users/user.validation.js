import * as yup from 'yup';

const common = {
  username: yup.string().min(3, 'Name must be at least 3 characters long').required('*Required'),
  first_name: yup.string().required('*Required'),
  last_name: yup.string().required('*Required'),
  email: yup.string().email('Invalid email address').required('*Required'),
  contact: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Contact must be 10 digits')
    .required('*Required'),
  address: yup.string().required('*Required'),
  city: yup.string().required('*Required'),
  region: yup.string().required('*Required'),
  zip_code: yup.string().optional(),
};

const validatePass = {
  password: yup.string().min(6, 'Password must be at least 6 characters long').required('*Required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('*Required'),
};

export const createUser = yup.object().shape({
  ...common,
  ...validatePass,
});

export const updateUser = yup.object().shape(
  // make all fields optional except email, username
  Object.keys(common).reduce((acc, key) => {
    if (key === 'email' ) 
      acc[key] = common[key];
    else
      acc[key] = common[key].optional();
    return acc;
  }, {})
);
