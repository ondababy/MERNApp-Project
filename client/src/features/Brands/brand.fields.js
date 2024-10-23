const getFields = () => [
  {
    label: 'Brand Name',
    name: 'name',
    type: 'text',
    outerStyle: 'w-full col-span-3 row-span-2 md:col-span-1',
    placeholder: 'Enter brand name',
  },
  {
    label: 'Description',
    name: 'description',
    variant: 'textarea',
    outerStyle: 'w-full col-span-3 row-span-2',
    placeholder: 'Enter brand description',
  },
  {
    label: 'Website URL',
    name: 'websiteUrl',
    type: 'text',
    outerStyle: 'w-full col-span-3 row-span-2 md:col-span-1',
    placeholder: 'Enter website URL',
  },
  {
    label: 'Email Address',
    name: 'emailAddress', 
    type: 'email',
    outerStyle: 'w-full col-span-3 row-span-2 md:col-span-1',
    placeholder: 'Enter email address',
  },
  {
    label: 'Brand Logo',
    name: 'image',
    type: 'image',
    accept: 'image/*',
    multiple: true,
    outerStyle: 'w-full col-span-3 row-span-2',
  },
];

const getAltFields = () => [
  { label: 'Brand Name', name: 'name', type: 'text', placeholder: 'Enter brand name' },
];

export { getAltFields, getFields };
