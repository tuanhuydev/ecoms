/* eslint-disable no-unused-vars */
export const IS_DEV = process.env.APP_ENV === 'local';

export const APP_URL = IS_DEV ? 'http://localhost:8000' : process.env.APP_URL;

export const API_URL = `${APP_URL}/api`;

export const EMPTY_STRING = '';

export const ROUTE_PATHS = {
  ADMIN: '/admin',
  OVERVIEW: '/admin/overview',
  SETTING: '/admin/setting',
  TASKS: '/admin/tasks'
};

export enum TASK_STATUS {
  BACKLOG = 'BACKLOG',
  PROGRESS = 'PROGRESS',
  DONE = 'DONE'
}
