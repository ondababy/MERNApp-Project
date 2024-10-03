export const imageSchema = {
  type: 'object',
  properties: {
    folder: {
      type: 'string',
    },
    public_id: {
      type: 'string',
    },
    resource_type: {
      type: 'string',
    },
    secure_url: {
      type: 'string',
    },
    tags: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    allowed_formats: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};
