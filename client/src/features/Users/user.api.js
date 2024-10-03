import { apiSlice } from '@app/config';

const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.mutation({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
    getUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    createUser: build.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
    updateUser: build.mutation({
      query: ({ id, user }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: user,
      }),
    }),
  }),
});

export { userApi };
