import { DefaultObjectType } from '../interfaces/Meta';
import { ROUTE_PATHS } from './constants';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';

export const adminRoutes = {
  overview: {
    path: ROUTE_PATHS.OVERVIEW,
    icon: <DashboardIcon />
  },
  setting: {
    path: ROUTE_PATHS.SETTING,
    icon: <SettingsIcon />
  },
  tasks: {
    path: ROUTE_PATHS.TASKS,
    icon: <ListAltIcon />
  }
} as DefaultObjectType;
