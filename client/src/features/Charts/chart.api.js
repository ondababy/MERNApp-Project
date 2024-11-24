import { apiSlice } from '@app/config';

const resource = 'charts';
const apiUrl = `/${resource}`;
const tags = [resource];
const headers = {
  resource,
  tags,
};

const chartApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    monthlyRevenue: build.mutation({
      query: () => ({
        url: `${apiUrl}/monthly-revenue`,
        method: 'GET',
        headers,
      }),
    }),
    dailyRevenue: build.mutation({
      query: (dateRange) => ({
        url: `${apiUrl}/daily-revenue`,
        method: 'POST',
        body: dateRange,
        headers,
        
      }),
    }),
  }),
});

export { chartApi };

