import { User } from 'scripts/interfaces/User';

/* eslint-disable no-unused-vars */
export const IS_DEV = process.env.APP_ENV === 'local';

export const APP_URL = IS_DEV ? 'http://localhost:8000' : process.env.APP_URL;

export const API_URL = `${APP_URL}/api`;

export const EMPTY_STRING = '';
export const EMPTY_OBJECT = {};
export const EMPTY_ARRAY: any[] = [];

export const EMPTY_USER: User = {
  userId: '',
  firstName: '',
  lastName: '',
  email: ''
};

export const ROUTE_PATHS = {
  ADMIN: '/admin',
  OVERVIEW: '/admin/overview',
  SETTING: '/admin/setting',
  TASKS: '/admin/tasks',
  USERS: '/admin/users'
};

export const PERMISSIONS = {
  GUEST: 'GUEST',
  ADMIN: 'ADMIN'
};
