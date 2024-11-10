import { logout, setCredentials } from '@features';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { startLoading, stopLoading } from '../slices/loading.slice';


const API = '/api/v1';
const baseQuery = fetchBaseQuery({
  baseUrl: API,
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
  api.dispatch(startLoading());
  // delay to show spinner
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    let result = await baseQuery(args, api, extraOptions);

    if (result === undefined) {
      console.error('API request result is undefined');
      return { error: { status: 'FETCH_ERROR', data: 'API request result is undefined' } };
    }

    if (![401, 403].includes(result?.error?.status)) {
      return result || 'Forbidden';
    }
    const refreshResult = await baseQuery('/users/refresh', api, extraOptions);
    if (refreshResult?.data?.token) {
      const userInfo = api.getState().auth.userInfo;
      const token = refreshResult.data.token;
      api.dispatch(setCredentials({ userInfo, token, role: userInfo?.role }));
      return await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      return { error: { status: 'UNAUTHORIZED', data: 'Refresh token failed' } };
    }
  } catch (error) {
    console.error('Error in baseQueryWithReAuth:', error);
  } finally {
    api.dispatch(stopLoading());
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});

