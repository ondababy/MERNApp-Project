import { UserOnboarding } from '@features';
import { DefaultLayout } from '@layouts';
import * as Screen from '@screens';

const defaultRoutes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/onboarding',
        element: <UserOnboarding />,
      },
      {
        path: '/checkout',
        element: <Screen.Checkout />,
      },
      {
        path: '/orders',
        element: <Screen.OrdersDisplay />,
      },
      {
        path: '/profile',
        element: <Screen.Profile />,
      },
    ],
  },
];

export default defaultRoutes;
