import { Errors } from '@common/components';
import { createBrowserRouter } from 'react-router-dom';
import guestRoutes from './00-guest';
import defaultRoutes from './10-default';
import privateRoutes from './20-private';

const router = createBrowserRouter([
  ...guestRoutes,
  ...defaultRoutes,
  ...privateRoutes,
  {
    path: '*',
    element: <Errors.NotFound />,
  },
]);

export default router;
