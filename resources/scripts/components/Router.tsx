import { DefaultObjectType } from 'scripts/utils/interfaces';
import { EMPTY_STRING, PERMISSIONS, ROUTE_PATHS } from 'scripts/configs/constants';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import AdminLayout from 'scripts/components/layouts/AdminLayout';
import BaseLayout from 'scripts/components/layouts/Base';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Overview from 'scripts/pages/admin/Overview';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PrivateRoute from 'scripts/components/base/PrivateRoute';
import React, { FC } from 'react';
import Tasks from 'scripts/pages/admin/Tasks';
import Users from 'scripts/pages/admin/Users';

export const adminRoutes = {
  overview: {
    path: ROUTE_PATHS.OVERVIEW,
    icon: <DashboardOutlinedIcon />,
    permissions: Object.values(PERMISSIONS)
  },
  tasks: {
    path: ROUTE_PATHS.TASKS,
    icon: <ListAltIcon />,
    permissions: Object.values(PERMISSIONS)
  },
  users: {
    path: ROUTE_PATHS.USERS,
    icon: <PeopleOutlineIcon />,
    permissions: [PERMISSIONS.ADMIN]
  }
} as DefaultObjectType;

const routes: RouteObject[] = [
  {
    path: ROUTE_PATHS.ADMIN,
    element: <BaseLayout />,
    children: [
      {
        path: EMPTY_STRING,
        element: (
          <PrivateRoute>
            <AdminLayout routes={adminRoutes} />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <Navigate to={ROUTE_PATHS.OVERVIEW} /> },
          { path: ROUTE_PATHS.OVERVIEW, element: <Overview /> },
          { path: ROUTE_PATHS.USERS, element: <Users /> },
          { path: ROUTE_PATHS.TASKS, element: <Tasks /> },
          { path: `${ROUTE_PATHS.TASKS}/:id`, element: <Tasks /> }
        ]
      }
    ]
  },
  { path: '*', element: <h1>Not Found</h1> }
];

const Router: FC = (): JSX.Element => useRoutes(routes);

export default Router;
