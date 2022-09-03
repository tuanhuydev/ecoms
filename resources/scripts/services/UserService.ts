import { User } from 'scripts/interfaces/Model';
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
}

export default UserService;
