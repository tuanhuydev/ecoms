import { User } from 'scripts/interfaces/User';

export const APP_URL = process.env.APP_ENV === 'local' ? 'http://localhost' : process.env.APP_URL;

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

export const STATUSES = {
  PENDING: { value: 'PENDING', color: '#F9A825' },
  ACTIVE: { value: 'ACTIVE', color: '#689F38' },
  SUSPENDED: { value: 'SUSPENDED', color: '#EF6C00' },
  BLOCKED: { value: 'BLOCKED', color: '#EF6C00' }
};
