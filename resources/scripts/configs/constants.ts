import * as dotenv from 'dotenv';
import { Account, User } from 'scripts/utils/interfaces';
import { SEVERITY, TASK_STATUS, USER_AVAILABILITY, USER_STATUS } from './enums';
dotenv.config();

export const IS_DEV_ENV = process.env.APP_ENV === 'local';

export const APP_URL = IS_DEV_ENV ? 'http://localhost' : process.env.APP_URL;

console.log({ IS_DEV_ENV, APP_URL });

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
export const EMPTY_ACCOUNT: Account = {
  accountId: '',
  age: 0,
  status: '',
  availability: '',
  userId: ''
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
  ADMIN: 'ADMIN',
  MAINTAINER: 'MAINTAINER'
};

export const STATUSES = {
  PENDING: { value: 'PENDING', color: '#F9A825' },
  ACTIVE: { value: 'ACTIVE', color: '#689F38' },
  SUSPENDED: { value: 'SUSPENDED', color: '#EF6C00' },
  BLOCKED: { value: 'BLOCKED', color: '#EF6C00' }
};

export const TASK_STATUS_OPTIONS = [
  { label: 'Backlog', value: TASK_STATUS.BACKLOG },
  { label: 'Progress', value: TASK_STATUS.PROGRESS },
  { label: 'Done', value: TASK_STATUS.DONE }
];

export const TASK_SEVERITY_OPTIONS = [
  { label: 'Medium', value: SEVERITY.MEDIUM },
  { label: 'Low', value: SEVERITY.LOW },
  { label: 'High', value: SEVERITY.HIGH },
  { label: 'Critical', value: SEVERITY.CRITICAL }
];

export const USER_STATUS_OPTIONS = [
  { label: 'Active', value: USER_STATUS.ACTIVE },
  { label: 'Pending', value: USER_STATUS.PENDING },
  { label: 'Suspended', value: USER_STATUS.SUSPENDED },
  { label: 'Blocked', value: USER_STATUS.BLOCKED }
];

export const USER_PERMISSION_OPTIONS = [
  { label: 'Guest', value: PERMISSIONS.GUEST },
  { label: 'Admin', value: PERMISSIONS.ADMIN },
  { label: 'Maintainer', value: PERMISSIONS.MAINTAINER }
];

export const USER_AVAILABILITY_OPTIONS = [
  { label: 'Available', value: USER_AVAILABILITY.AVAILABLE },
  { label: 'Away', value: USER_AVAILABILITY.AWAY },
  { label: 'Busy', value: USER_AVAILABILITY.BUSY },
  { label: 'Offline', value: USER_AVAILABILITY.OFFLINE }
];

// export const TASK_CATEGORY_OPTIONS = [
//   { label: 'Unassigned', value: TASK_CATEGORY.UNASSIGNED },
//   { label: 'Issue', value: TASK_CATEGORY.ISSUE },
//   { label: 'Fix', value: TASK_CATEGORY.FIX }
// ];
