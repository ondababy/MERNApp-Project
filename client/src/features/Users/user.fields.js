const common = [
  {
    label: 'Username',
    name: 'username',
    type: 'text',
  },
  {
    label: 'Email Address',
    name: 'email',
    type: 'email',
  },
  {
    label: 'First Name',
    name: 'first_name',
    type: 'text',
  },
  {
    label: 'Last Name',
    name: 'last_name',
    type: 'text',
  },
  {
    label: 'Contact',
    name: 'contact',
    type: 'text',
  },
  {
    label: 'Adress',
    name: 'address',
    type: 'text',
  },
  {
    label: 'City',
    name: 'city',
    type: 'text',
  },
  {
    label: 'Region',
    name: 'region',
    type: 'text',
  },
  {
    label: 'Zip Code',
    name: 'zip_code',
    type: 'text',
  },
  {
    label: 'Avatar',
    name: 'avatar',
    type: 'image',
    accept: 'image/*',
    multiple: true,
  },
];

const getFields = () => [
  ...common,

  { label: 'Password', name: 'password', type: 'password' },
  { label: 'Confirm Password', name: 'confirm_password', type: 'password' },
];

const getAltFields = () => [...common];
const getInfoFields = () => [];

export { getAltFields, getFields, getInfoFields };

