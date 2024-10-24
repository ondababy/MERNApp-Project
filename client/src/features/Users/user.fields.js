const getFields = () => [
  { label: 'Username', name: 'username', type: 'text' },
  { label: 'Email Address', name: 'email', type: 'email' },
  { label: 'Password', name: 'password', type: 'password' },
  { label: 'Confirm Password', name: 'confirm_password', type: 'password' },
  // More getFields can be added here
];

const getAltFields = () => [
  { label: 'Username', name: 'username', type: 'text' },
  { label: 'Email Address', name: 'email', type: 'email' },
];
const getInfoFields = () => [
  { label: 'Username', name: 'username', type: 'text' },
  { label: 'Email Address', name: 'email', type: 'email' },
];

export { getAltFields, getFields };

