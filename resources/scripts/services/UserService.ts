import httpClient from '../configs/httpClient';

class UserService {
  static path: string = '/users';

  static getUsers() {
    return httpClient.get(UserService.path);
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
