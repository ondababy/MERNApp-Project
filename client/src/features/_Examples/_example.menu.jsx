import { FaPlus, FaTable, FaUsers } from 'react-icons/fa';
import { dashUrl as mainUrl } from './_example.api';

export const _exampleMenus = [
  {
    label: 'Manage _Examples',
    type: 'dropdown',
    to: mainUrl,
    icon: <FaTable />,
    subLinks: [
      { to: `${mainUrl}/table`, label: '_Examples Table', icon: <FaTable /> },
      { to: `${mainUrl}/create`, label: 'Create _Examples', icon: <FaPlus /> },
    ],
  },
];

