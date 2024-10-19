import { apiSlice } from '@app/config';

const resource = 'carts';
const apiUrl = `/${resource}`;
export const dashUrl = `/dashboard/${resource}`;
const tags = [resource];
const headers = {
  resource,
  tags,
};

const cartApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getItems: build.mutation({
      query: () => ({
        url: apiUrl,
        method: 'GET',
        headers,
      }),
    }),
    deleteItem: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/delete/${id}`,
        method: 'DELETE',
        headers,
      }),
    }),
    createItem: build.mutation({
      query: (cart) => ({
        url: apiUrl,
        method: 'POST',
        body: cart,
        headers,
      }),
    }),
    updateItem: build.mutation({
      query: ({ id, cart }) => ({
        url: `${apiUrl}/edit/${id}`,
        method: 'PATCH',
        body: cart,
        headers,
      }),
    }),
  }),
});

export { cartApi };
