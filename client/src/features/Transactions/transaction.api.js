import { apiSlice } from '@app/config';

const resource = 'transactions';
const apiUrl = `/${resource}`;
export const dashUrl = `/dashboard/${resource}`;
const tags = [resource];
const headers = {
  resource,
  tags,
};

const transactionApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.mutation({
      query: () => ({
        url: apiUrl,
        method: 'GET',
        headers,
      }),
    }),
    getTransaction: build.mutation({
      query: (slug) => ({
        url: `${apiUrl}/slug/${slug}`,
        method: 'GET',
        headers,
      }),
    }),
    deleteTransaction: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/delete/${id}`,
        method: 'DELETE',
        headers,
      }),
    }),
    createTransaction: build.mutation({
      query: (transaction) => ({
        url: apiUrl,
        method: 'POST',
        body: transaction,
        headers,
      }),
    }),
    updateTransaction: build.mutation({
      query: ({ id, transaction }) => ({
        url: `${apiUrl}/edit/${id}`,
        method: 'PATCH',
        body: transaction,
        headers,
      }),
    }),
  }),
});

export { transactionApi };
