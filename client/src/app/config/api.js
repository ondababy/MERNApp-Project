/* eslint-disable no-unused-vars */
// Hooks Naming Convention:
// mutation: use{Resource}Mutation
// query: use{Resource}Query
// subscription: use{Resource}Subscription
//
//
// ex: useLoginMutation, useLoginQuery, useLoginSubscription
import { logout, setCredentials } from '@features';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (![401, 403].includes(result.error?.status)) {
    return result;
  }

  const refreshResult = await baseQuery('/users/refresh', api, extraOptions);
  if (refreshResult?.data?.token) {
    const userInfo = api.getState().auth.userInfo;
    const token = refreshResult.data.token;

    api.dispatch(setCredentials({ userInfo, token }));

    return await baseQuery(args, api, extraOptions);
  } else {
    api.dispatch(logout());
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['User'],

  endpoints: (builder) => ({}),
});
