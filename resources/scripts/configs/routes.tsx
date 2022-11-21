import { DefaultObjectType } from '@utils/interfaces';
import { PERMISSIONS, ROUTE_PATHS } from './constants';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import React from 'react';

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
