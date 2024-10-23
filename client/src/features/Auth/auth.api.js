import { apiSlice } from '@app/config';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    profile: build.mutation({
      query: (body) => ({
        url: '/users/profile',
        method: 'GET',
        body,
      }),
    }),
    login: build.mutation({
      query: (body) => ({
        url: '/users/authenticate',
        method: 'POST',
        body,
      }),
    }),
    register: build.mutation({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
  }),
});
