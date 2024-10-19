import { FaPlus, FaTable, FaUsers } from 'react-icons/fa';
import { dashUrl as mainUrl } from './transaction.api';

export const transactionMenus = [
  {
    label: 'Manage Transactions',
    type: 'dropdown',
    to: mainUrl,
    icon: <FaTable />,
    subLinks: [
      { to: `${mainUrl}/table`, label: 'Transactions Table', icon: <FaTable /> },
      { to: `${mainUrl}/create`, label: 'Create Transactions', icon: <FaPlus /> },
      { to: `${mainUrl}/list`, label: 'Transactions List', icon: <FaUsers /> },
    ],
  },
];

