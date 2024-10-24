import { authRoutes } from '@features';
import { GuestLayout } from '@layouts';
import * as Screen from '@screens';

const defaultRoutes = [
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/',
        element: <Screen.Shop />,
      },
      {
        path: '/home',
        element: <Screen.Home />,
      },
      {
        path: '/shop',
        element: <Screen.Shop />,
      },
      {
        path: '/cart',
        element: <Screen.Cart />,
      },
      {
        path: '/checkout',
        element: <Screen.Checkout />,
      },
      {
        path: '/shop/:slug',
        element: <Screen.ProductDisplay />,
      },
      {
        path: '/about',
        element: <Screen.About />,
      },

      ...authRoutes,
    ],
  },
];

export default defaultRoutes;
