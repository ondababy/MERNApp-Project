const getFields = () => [
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
    label: 'Email', 
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
     label: 'Address', 
     name: 'address', 
     type: 'text',
     outerStyle: 'w-full col-span-3 lg:col-span-6',
    },
    { 
      label: 'City', 
      name: 'city', 
      type: 'text',
      outerStyle: 'w-full col-span-1 md:col-span-1 lg:col-span-2',
     },
     { 
       label: 'Region', 
       name: 'region', 
       type: 'text',
       outerStyle: 'w-full col-span-1 md:col-span-1 lg:col-span-2',
      },
      { 
        label: 'Zip Code', 
        name: 'zip_code', 
        type: 'text',
        outerStyle: 'w-full col-span-1 md:col-span-1 lg:col-span-2',
       },
  // More getFields can be added here
];

const getAltFields = () => [
  { label: 'Name', 
    name: 'name', 
    type: 'text',
    outerStyle: ""
   },
  // alternate getFields can be added here
];

export { getAltFields, getFields };

