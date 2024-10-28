import { FaPlus, FaTable } from 'react-icons/fa';

export const userMenus = [
  {
    label: 'Manage Users',
    type: 'dropdown',
    to: '/dashboard/users',
    icon: <FaTable />,
    subLinks: [
      { to: '/dashboard/users/table', label: 'Users Table', icon: <FaTable /> },
      { to: '/dashboard/users/create', label: 'Creat Users', icon: <FaPlus /> },
    ],
  },
];

