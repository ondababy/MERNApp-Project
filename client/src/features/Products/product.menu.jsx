import { FaPlus, FaTable, FaUsers } from 'react-icons/fa';
import { dashUrl as mainUrl } from './product.api';

export const productMenus = [
  {
    index: 1,
    label: 'Manage Products',
    type: 'dropdown',
    to: mainUrl,
    icon: <FaTable />,
    subLinks: [
      { to: `${mainUrl}/table`, label: 'Products Table', icon: <FaTable /> },
      { to: `${mainUrl}/create`, label: 'Create Products', icon: <FaPlus /> },
    ],
  },
];

