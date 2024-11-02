const getFields = () => [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Enter supplier name',
  },
  {
    label: 'Contact Person',
    name: 'contactPerson',
    type: 'text',
    placeholder: 'Enter contact person',
  },
  {
    label: 'Email Address',
    name: 'emailAddress',
    type: 'email',
    placeholder: 'Enter email address',
  },
  {
    label: 'Contact Number',
    name: 'contactNumber',
    type: 'text',
    placeholder: 'Enter contact number',
  },
  {
    label: 'Description',
    name: 'description',
    variant: 'textarea',
    placeholder: 'Enter supplier description',
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
    placeholder: 'Enter supplier name',
  },
];

export { getAltFields, getFields };
