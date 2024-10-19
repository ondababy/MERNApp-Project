import React from 'react';
import { dashUrl as mainUrl } from './transaction.api';

const TransactionForm = React.lazy(() => import('./components/TransactionForm'));
const TransactionPage = React.lazy(() => import('./components/TransactionPage'));
const TransactionTable = React.lazy(() => import('./components/TransactionTable'));

export const transactionRoutes = [
  { path: `${mainUrl}/table`, element: <TransactionTable /> },
  { path: mainUrl, element: <TransactionPage /> },
  {
    path: `${mainUrl}/create`,
    element: (
      <TransactionForm
        action="create"
        title="Create Transaction"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/view`,
    element: (
      <TransactionForm
        action="view"
        title="View Transaction"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/edit`,
    element: (
      <TransactionForm
        action="edit"
        title="Edit Transaction"
      />
    ),
  },
];
