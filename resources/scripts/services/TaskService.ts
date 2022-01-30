import { API_URL } from '../configs/constants';
import { Task } from '../interfaces/Task';
import httpClient from '../configs/httpClient';

class TaskService {
  static path: string = `${API_URL}/tasks`;

  static getTasks() {
    return httpClient.get(TaskService.path);
  }

  static getTaskById(id: string) {
    return httpClient.get(`${TaskService.path}/${id}`);
  }

  static createTask(task: Partial<Task>) {
    return httpClient.post(TaskService.path, task);
  }

  static updateTask(data: any) {
    return httpClient.patch(TaskService.path, data);
  }

  static deleteTask(id: string) {
    return httpClient.delete(`${TaskService.path}/${id}`);
  }
}

export default TaskService;
