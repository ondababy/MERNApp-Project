import React from 'react';
import { dashUrl as mainUrl } from './order.api';

const OrderFormPage = React.lazy(() => import('./components/OrderFormPage'));
const OrderPage = React.lazy(() => import('./components/OrderPage'));
const OrderTable = React.lazy(() => import('./components/OrderTable'));

export const orderRoutes = [
  { path: `${mainUrl}/table`, element: <OrderTable /> },
  { path: mainUrl, element: <OrderPage /> },
  {
    path: `${mainUrl}/create`,
    element: (
      <OrderFormPage
        action="create"
        title="Create Order"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/view`,
    element: (
      <OrderFormPage
        action="view"
        title="View Order"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/edit`,
    element: (
      <OrderFormPage
        action="edit"
        title="Edit Order"
      />
    ),
  },
];
