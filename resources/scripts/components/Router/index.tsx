import { EMPTY_STRING, ROUTE_PATHS } from '../../configs/constants';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import AdminLayout from '@components/layouts/AdminLayout';
import BaseLayout from '@components/layouts/Base';
import Overview from '@containers/Overview';
import PrivateRoute from './PrivateRoute';
import React, { FC } from 'react';
import Setting from '@containers/Setting';
import Tasks from '@containers/Tasks';

const routes: RouteObject[] = [
  {
    path: ROUTE_PATHS.ADMIN,
    element: (<BaseLayout />),
    children: [
      {
        path: EMPTY_STRING,
        element: (<PrivateRoute><AdminLayout /></PrivateRoute>),
        children: [
          { index: true, element: <Navigate to={ROUTE_PATHS.OVERVIEW} /> },
          { path: ROUTE_PATHS.OVERVIEW, element: <Overview /> },
          { path: ROUTE_PATHS.SETTING, element: <Setting /> },
          { path: ROUTE_PATHS.TASKS, element: <Tasks /> }
        ]
      }
    ]
  },
  { path: '*', element: (<h1>Not Found</h1>) }
];

const Router: FC = (): JSX.Element => useRoutes(routes);

export default Router;
