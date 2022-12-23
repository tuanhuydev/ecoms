import { SEVERITY, TASK_STATUS } from 'scripts/configs/enums';
import { store } from 'scripts/store/index';

export interface DefaultObjectType {
  [key: string]: any;
}

export interface RouteType {
  path: string;
  container: JSX.Element;
}

export interface DefaultClassType {
  [key: string]: string;
}

export interface Meta {
  openSidebar: boolean;
}

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  permission?: string;
  status?: string;
}

export interface Account {
  accountId: string;
  age: number;
  status: string;
  availability: string;
  userId: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  acceptance?: string;
  dueDate?: string;
  categoryId?: number;
  severity: SEVERITY;
  status: TASK_STATUS;
  createdBy?: User;
  createdAt?: string;
}

export interface Category {
  id: number;
  value: string;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
