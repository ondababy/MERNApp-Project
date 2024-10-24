import React from 'react';
import { UserList, UserPage, UserTable } from '.';

const UserForm = React.lazy(() => import('./components/UserForm'));

export const userRoutes = [
  { path: '/dashboard/users', element: <UserPage /> },
  { path: '/dashboard/users/table', element: <UserTable /> },
  {
    path: '/dashboard/users/:id/edit',
    element: (
      <UserForm
        action="edit"
        title="Edit User"
      />
    ),
  },
  {
    path: '/dashboard/users/:id/view',
    element: (
      <UserForm
        action="view"
        title="View User"
      />
    ),
  },
  {
    path: '/dashboard/users/create',
    element: (
      <UserForm
        action="create"
        title="Create User"
      />
    ),
  },
];
