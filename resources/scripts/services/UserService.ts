import { User } from 'scripts/interfaces/Model';
import { httpClientWithAuth } from '../configs/httpClient';

class UserService {
  path: string = '/users';

  public getUsers = () => {
    return httpClientWithAuth.get(this.path);
  }

  public updateUser = (data: Partial<User>) => {
    const { userId, ...restData } = data;
    const url = `${this.path}/${userId}`;
    return httpClientWithAuth.patch(url, restData);
  }

  public saveUser(data: Partial<User>) {
    return httpClientWithAuth.post(this.path, data);
  }
}

export default UserService;
