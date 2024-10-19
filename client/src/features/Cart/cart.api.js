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
    getCarts: build.mutation({
      query: () => ({
        url: apiUrl,
        method: 'GET',
        headers,
      }),
    }),
    getCart: build.mutation({
      query: (slug) => ({
        url: `${apiUrl}/slug/${slug}`,
        method: 'GET',
        headers,
      }),
    }),
    deleteCart: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/delete/${id}`,
        method: 'DELETE',
        headers,
      }),
    }),
    createCart: build.mutation({
      query: (cart) => ({
        url: apiUrl,
        method: 'POST',
        body: cart,
        headers,
      }),
    }),
    updateCart: build.mutation({
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
