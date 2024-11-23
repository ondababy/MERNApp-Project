const getFields = () => [
  { label: 'Name', name: 'name', type: 'text' },
  {
    label: 'Image',
    name: 'image',
    type: 'image',
    accept: 'image/*',
    multiple: true,
    outerStyle: 'w-full col-span-3 row-span-2',
  },
  // More getFields can be added here
];

const getAltFields = () => [
  { label: 'Name', name: 'name', type: 'text' },
  {
    label: 'Image',
    name: 'image',
    type: 'image',
    accept: 'image/*',
    multiple: true,
    outerStyle: 'w-full col-span-3 row-span-2',
  },
  // alternate getFields can be added here
];

export { getAltFields, getFields };

