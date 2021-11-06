import React from 'react';
import { DefaultObjectType } from '../interfaces/Meta';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import Overview from '@containers/Overview';
import Setting from '@containers/Setting';

export const adminRoutes = {
  overview: {
    path: '/admin/overview',
    icon: <DashboardIcon />,
    container: <Overview />
  },
  setting: {
    path: '/admin/setting',
    icon: <SettingsIcon />,
    container: <Setting />
  }
} as DefaultObjectType;
