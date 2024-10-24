import { Errors } from '@common/components';
import { createBrowserRouter } from 'react-router-dom';
import defaultRoutes from './00-guest';
import privateRoutes from './20-private';

const router = createBrowserRouter([
  ...defaultRoutes,
  ...privateRoutes,
  {
    path: '*',
    element: <Errors.NotFound />,
  },
]);

export default router;
