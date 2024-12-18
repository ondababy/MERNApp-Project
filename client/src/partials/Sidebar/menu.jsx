import * as features from '@features';
import { FaHome } from 'react-icons/fa';

const makeMenu = () => [
  {
    index: 0,
    label: 'Home',
    type: 'link',
    to: '/dashboard',
    icon: <FaHome />,
  },
  // NEW ROUTE HERE ->
  ...features.reviewMenus,
  ...features.categoryMenus,
  ...features.orderMenus,
  // ...features._exampleMenus,
  ...features.brandMenus,
  ...features.productMenus,
  ...features.courierMenus,
  ...features.supplierMenus,
  ...features.userMenus,
].sort((a, b) => `${a.index}`.localeCompare(`${b.index}`));

export default makeMenu;

