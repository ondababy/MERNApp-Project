import { FaPlus, FaTable, FaUsers } from 'react-icons/fa';
import { dashUrl as mainUrl } from './courier.api';

export const courierMenus = [
  {
    index: 7,
    label: 'Manage Couriers',
    type: 'dropdown',
    to: mainUrl,
    icon: <FaTable />,
    subLinks: [
      { to: `${mainUrl}/table`, label: 'Couriers Table', icon: <FaTable /> },
      { to: `${mainUrl}/create`, label: 'Create Couriers', icon: <FaPlus /> },
    ],
  },
];

