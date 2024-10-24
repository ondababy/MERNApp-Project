import { DefaultLayout } from '@layouts';
import * as Screen from '@screens';

const defaultRoutes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/checkout',
        element: <Screen.Checkout />,
      },
    ],
  },
];

export default defaultRoutes;
