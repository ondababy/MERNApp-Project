import React from 'react';
import { dashUrl as mainUrl } from './order.api';

const OrderPage = React.lazy(() => import('./components/OrderPage'));
const OrderTable = React.lazy(() => import('./components/OrderTable'));
const OrderView = React.lazy(() => import('./components/OrderView'))

export const orderRoutes = [
  { path: `${mainUrl}/table`, element: <OrderTable /> },
  { path: mainUrl, element: <OrderPage /> },
  { path: `${mainUrl}/:id/edit/`, element: <OrderView /> },

];
