import { FaPlus, FaTable, FaUsers } from 'react-icons/fa';
import { dashUrl as mainUrl } from './wishlist.api';

export const wishlistMenus = [
  {
    label: 'Manage Wishlists',
    type: 'dropdown',
    to: mainUrl,
    icon: <FaTable />,
    subLinks: [
      { to: `${mainUrl}/table`, label: 'Wishlists Table', icon: <FaTable /> },
      { to: `${mainUrl}/create`, label: 'Create Wishlists', icon: <FaPlus /> },
    ],
  },
];

