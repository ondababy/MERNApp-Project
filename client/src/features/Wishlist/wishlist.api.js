import { apiSlice } from '@app/config';

const resource = 'wishlists';
const apiUrl = `/${resource}`;
export const dashUrl = `/dashboard/${resource}`;
const tags = [resource];
const headers = {
  resource,
  tags,
};

const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getWishlists: build.mutation({
      query: () => ({
        url: apiUrl,
        method: 'GET',
        headers,
      }),
    }),
    getWishlist: build.mutation({
      query: (slug) => ({
        url: `${apiUrl}/slug/${slug}`,
        method: 'GET',
        headers,
      }),
    }),
    deleteWishlist: build.mutation({
      query: (id) => ({
        url: `${apiUrl}/delete/${id}`,
        method: 'DELETE',
        headers,
      }),
    }),
    createWishlist: build.mutation({
      query: (wishlist) => ({
        url: apiUrl,
        method: 'POST',
        body: wishlist,
        headers,
      }),
    }),
    updateWishlist: build.mutation({
      query: ({ id, wishlist }) => ({
        url: `${apiUrl}/edit/${id}`,
        method: 'PATCH',
        body: wishlist,
        headers,
      }),
    }),
  }),
});

export { wishlistApi };
