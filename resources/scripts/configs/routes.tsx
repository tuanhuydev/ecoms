import React from 'react';
import { DefaultObjectType } from '../interfaces/Meta';
import Overview from '@containers/Overview';
import Setting from '@containers/Setting';

export const adminRoutes = {
  overview: {
    path: '/admin/overview',
    container: <Overview />
  },
  setting: {
    path: '/admin/setting',
    container: <Setting />
  }
} as DefaultObjectType;
