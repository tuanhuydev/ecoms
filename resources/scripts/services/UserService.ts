import { User } from 'scripts/interfaces/User';
import { httpClientWithAuth } from '../configs/httpClient';

class UserService {
  static path: string = '/users';

  static getUsers() {
    return httpClientWithAuth.get(UserService.path);
  }

  static updateUser(data: Partial<User>) {
    return httpClientWithAuth.patch(UserService.path, data);
  }

  static saveUser(data: Partial<User>) {
    return httpClientWithAuth.post(UserService.path, data);
  }

  // static getTaskById(id: string) {
  //   return httpClient.get(`${TaskService.path}/${id}`);
  // }

  // static createTask(task: Partial<Task>) {
  //   return httpClient.post(TaskService.path, task);
  // }

  // static updateTask(data: any) {
  //   return httpClient.patch(TaskService.path, data);
  // }

  // static deleteTask(id: string) {
  //   return httpClient.delete(`${TaskService.path}/${id}`);
  // }
}

export default UserService;
