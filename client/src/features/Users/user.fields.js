const common = [
  {
    label: 'Basic Info',
    variant: 'divider',
    outerStyle: 'w-full col-span-3 lg:col-span-6',
  },
  {
    label: 'First Name',
    name: 'first_name',
    type: 'text',
    outerStyle: 'w-full col-span-3 md:col-span-3 lg:col-span-2',
  },
  {
    label: 'Last Name',
    name: 'last_name',
    type: 'text',
    outerStyle: 'w-full col-span-3 md:col-span-3 lg:col-span-1',
  },
  {
    label: 'Username',
    name: 'username',
    type: 'text',
    outerStyle: 'w-full col-span-3 md:col-span-2 lg:col-span-1',
  },
  {
    label: 'Email Address',
    name: 'email',
    type: 'email',
    outerStyle: 'w-full col-span-3 md:col-span-4 lg:col-span-2 ',
  },
  {
    label: 'Contact',
    name: 'contact',
    type: 'text',
    outerStyle: 'w-full col-span-3 md:col-span-6 lg:col-span-1 alig',
  },
  {
    label: 'Birthdate',
    name: 'birthdate',
    variant: 'birthdate',
    outerStyle: 'w-full col-span-3 md:col-span-3 lg:col-span-2 ',
  },
  {
    label: 'Address Information',
    variant: 'divider',
    outerStyle: 'w-full col-span-3 lg:col-span-6',
  },
  {
    label: 'Adress',
    name: 'address',
    type: 'text',
    outerStyle: 'w-full col-span-3 md:col-span-6 lg:col-span-6 ',
  },
  {
    label: 'City',
    name: 'city',
    type: 'text',
    outerStyle: 'w-full col-span-3 md:col-span-2  ',
  },
  {
    label: 'Region',
    name: 'region',
    type: 'text',
    outerStyle: 'w-full col-span-3 md:col-span-2 ',
  },
  {
    label: 'Zip Code',
    name: 'zip_code',
    type: 'text',
    outerStyle: 'w-full col-span-3 md:col-span-2 ',
  },
  {
    label: '',
    variant: 'divider',
    outerStyle: 'w-full col-span-3 lg:col-span-6',
  },
  {
    label: 'Upload Avatar ',
    name: 'avatar',
    type: 'image',
    accept: 'image/*',
    // multiple: true,
    outerStyle: 'hidden w-full col-span-3 md:col-span-3 lg:col-span-6 ',
    id: 'avatar-upload',
  },
  // {
  //   label: '',
  //   variant: 'divider',
  //   outerStyle: 'w-full col-span-3 lg:col-span-6',
  // },
];

const getFields = () => [
  ...common,

  {
    label: 'Password',
    name: 'password',
    type: 'password',
    outerStyle: 'w-full col-span-3 md:col-span-6 lg:col-span-6 ',
  },
  {
    label: 'Confirm Password',
    name: 'confirm_password',
    type: 'password',
    outerStyle: 'w-full col-span-3 md:col-span-6 lg:col-span-6 ',
  },
];

const getAltFields = () => [...getFields()];
const getInfoFields = () => [
  {
    label: 'Customer Info',
    variant: 'divider',
    outerStyle: 'w-full col-span-3 lg:col-span-6',
  },
  {
    label: 'First Name',
    name: 'first_name',
    type: 'text',
    outerStyle: 'w-full col-span-3 lg:col-span-3',
  },
  {
    label: 'Last Name',
    name: 'last_name',
    type: 'text',
    outerStyle: 'w-full col-span-3 lg:col-span-3',
  },
  {
    label: 'Email Address',
    name: 'email',
    type: 'email',
    outerStyle: 'w-full col-span-3 lg:col-span-4',
  },
  {
    label: 'Contact',
    name: 'contact',
    type: 'text',
    outerStyle: 'w-full col-span-3 lg:col-span-2',
  },
  {
    label: 'Shipping Information',
    variant: 'divider',
    outerStyle: 'w-full col-span-3 lg:col-span-6',
  },
  {
    label: 'Adress',
    name: 'address',
    type: 'text',
    outerStyle: 'w-full col-span-3 lg:col-span-6',
  },
  {
    label: 'City',
    name: 'city',
    type: 'text',
    outerStyle: 'w-full col-span-1 lg:col-span-2',
  },
  {
    label: 'Region',
    name: 'region',
    type: 'text',
    outerStyle: 'w-full col-span-1 lg:col-span-2',
  },
  {
    label: 'Zip Code',
    name: 'zip_code',
    type: 'text',
    outerStyle: 'w-full col-span-1 lg:col-span-2',
  },
  {
    variant: 'divider',
    outerStyle: 'w-full col-span-3 lg:col-span-6',
  },
];

export { getAltFields, getFields, getInfoFields };

