const getFields = () => [
  { label: 'Title', name: 'title', type: 'text' },
  { label: 'Rating', name: 'rating', type: 'number' },
  { label: 'Comment', name: 'comment', type: 'text' },
];

const getAltFields = () => [
  ...getFields(),
];

export { getAltFields, getFields };

