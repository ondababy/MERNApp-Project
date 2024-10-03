import { apiSlice } from '@app/config';

const resource = '_examples';
const apiUrl = `/${resource}`;
export const dashUrl = `/dashboard/${resource}`;
const tags = [resource];
const headers = {
  resource,
  tags,
};

const _exampleApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    get_Examples: build.mutation({
      query: () => ({
        url: apiUrl,
        method: 'GET',
        headers,
      }),
    }),
    get_Example: build.mutation({
      query: (slug) => ({
        url: `${apiUrl}/slug/${slug}`,
        method: 'GET',
        headers,
      }),
    }),
    delete_Example: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/delete/${id}`,
        method: 'DELETE',
        headers,
      }),
    }),
    create_Example: build.mutation({
      query: (_example) => ({
        url: apiUrl,
        method: 'POST',
        body: _example,
        headers,
      }),
    }),
    update_Example: build.mutation({
      query: ({ id, _example }) => ({
        url: `${apiUrl}/edit/${id}`,
        method: 'PATCH',
        body: _example,
        headers,
      }),
    }),
  }),
});

export { _exampleApi };
