import { authRoutes } from '@features';
import { DefaultLayout } from '@layouts';
import { About, Home, ShopScreen } from '@screens';

const defaultRoutes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/shop',
        element: <ShopScreen />,
      },
      {
        path: '/about',
        element: <About />,
      },

      ...authRoutes,
    ],
  },
];

export default defaultRoutes;
