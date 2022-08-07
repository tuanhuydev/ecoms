import { Task } from '../interfaces/Task';
import { httpClientWithAuth } from '../configs/httpClient';

class TaskService {
  static path: string = '/tasks';

  static getTasks() {
    return httpClientWithAuth.get(TaskService.path);
  }

  static getTaskById(id: number) {
    return httpClientWithAuth.get(`${TaskService.path}/${id}`);
  }

  static createTask(task: Partial<Task>) {
    return httpClientWithAuth.post(TaskService.path, task);
  }

  static updateTask(data: any) {
    return httpClientWithAuth.patch(TaskService.path, data);
  }

  static deleteTask(id: number) {
    return httpClientWithAuth.delete(`${TaskService.path}/${id}`);
  }
}

export default TaskService;
