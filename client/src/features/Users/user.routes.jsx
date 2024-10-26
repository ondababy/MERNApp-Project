import React from 'react';
import { UserPage, UserTable } from '.';

const UserFormPage = React.lazy(() => import('./components/UserFormPage'));

export const userRoutes = [
  { path: '/dashboard/users', element: <UserPage /> },
  { path: '/dashboard/users/table', element: <UserTable /> },
  {
    path: '/dashboard/users/:id/edit',
    element: (
      <UserFormPage
        action="edit"
        title="Edit User"
      />
    ),
  },
  {
    path: '/dashboard/users/:id/view',
    element: (
      <UserFormPage
        action="view"
        title="View User"
      />
    ),
  },
  {
    path: '/dashboard/users/create',
    element: (
      <UserFormPage
        action="create"
        title="Create User"
      />
    ),
  },
];
