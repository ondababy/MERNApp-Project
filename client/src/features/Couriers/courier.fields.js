const getFields = () => [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Enter courier name',
  },
  {
    label: 'Contact Person',
    name: 'contactPerson',
    type: 'text',
    placeholder: 'Enter contact person',
  },
  {
    label: 'Contact Number',
    name: 'contactNumber',
    type: 'text',
    placeholder: 'Enter contact number',
  },
  {
    label: 'Email Address',
    name: 'emailAddress',
    type: 'email',
    placeholder: 'Enter email address',
  },
  {
    label: 'Service Area',
    name: 'serviceArea',
    type: 'text',
    placeholder: 'Enter service area',
  },
  {
    label: 'Image',
    name: 'image',
    type: 'image',
    accept: 'image/*',
    multiple: true,
    placeholder: 'Upload images',
  },
];

const getAltFields = () => [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Enter courier name',
  },
];

export { getAltFields, getFields };
