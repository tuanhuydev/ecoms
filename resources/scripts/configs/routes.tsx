import { DefaultObjectType } from '../interfaces/Meta';
import { ROUTE_PATHS } from './constants';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import React from 'react';

export const adminRoutes = {
  overview: {
    path: ROUTE_PATHS.OVERVIEW,
    icon: <DashboardOutlinedIcon />
  },
  tasks: {
    path: ROUTE_PATHS.TASKS,
    icon: <ListAltIcon />
  },
  users: {
    path: ROUTE_PATHS.USERS,
    icon: <PeopleOutlineIcon />
  }
} as DefaultObjectType;
