import { apiSlice } from '@app/config';

const resource = 'orders';
const apiUrl = `/${resource}`;
export const dashUrl = `/dashboard/${resource}`;
const tags = [resource];
const headers = {
  resource,
  tags,
};

const orderApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.mutation({
      query: () => ({
        url: apiUrl,
        method: 'GET',
        headers,
      }),
    }),
    getOrders: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/`,
        method: 'GET',
        headers,
      }),
    }),
    getOrder: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/${id}`,
        method: 'GET',
        headers,
      }),
    }),
    /* Dont */
    deleteOrder: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/delete/${id}`,
        method: 'DELETE',
        headers,
      }),
    }),
    createOrder: build.mutation({
      query: (order) => ({
        url: apiUrl,
        method: 'POST',
        body: order,
        headers,
      }),
    }),
    updateOrder: build.mutation({
      query: ({ id, order }) => ({
        url: `${apiUrl}/edit/${id}`,
        method: 'PATCH',
        body: order,
        headers,
      }),
    }),
  }),
});

export { orderApi };

