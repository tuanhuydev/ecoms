import { SEVERITY, TASK_STATUS } from 'scripts/configs/enums';
import { User } from './Model';

export interface Task {
  id: number;
  title: string;
  description?: string;
  acceptance?: string;
  dueDate?: string;
  severity: SEVERITY;
  status: TASK_STATUS;
  createdBy?: User;
  createdAt?: string;
}
