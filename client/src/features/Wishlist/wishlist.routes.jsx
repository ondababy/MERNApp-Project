import React from 'react';
import { dashUrl as mainUrl } from './wishlist.api';

const WishlistForm = React.lazy(() => import('./components/WishlistForm'));
const WishlistPage = React.lazy(() => import('./components/WishlistPage'));
const WishlistTable = React.lazy(() => import('./components/WishlistTable'));

export const wishlistRoutes = [
  { path: `${mainUrl}/table`, element: <WishlistTable /> },
  { path: mainUrl, element: <WishlistPage /> },
  {
    path: `${mainUrl}/create`,
    element: (
      <WishlistForm
        action="create"
        title="Create Wishlist"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/view`,
    element: (
      <WishlistForm
        action="view"
        title="View Wishlist"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/edit`,
    element: (
      <WishlistForm
        action="edit"
        title="Edit Wishlist"
      />
    ),
  },
];
