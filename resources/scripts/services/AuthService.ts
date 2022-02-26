import { API_URL } from '../configs/constants';
import { AxiosResponse } from 'axios';
import { DefaultObjectType } from '../interfaces/Meta';
import Cookie from 'js-cookie';
import httpClient from '../configs/httpClient';

abstract class Auth {
  static getAuth() {
    const user = localStorage.getItem('user');
    const accessToken = Cookie.get('securityId');
    if (user && accessToken) {
      return { user: JSON.parse(user), accessToken };
    }
    return false;
  }

  static clearAuth() {
    localStorage.removeItem('user');
    Cookie.remove('securityId');
  }

  static setAuth(user: DefaultObjectType, accessToken: string) {
    localStorage.setItem('user', JSON.stringify(user));
    Cookie.set('securityId', accessToken, { expires: 7, sameSite: 'strict' });
  }
}

class Login extends Auth {
  email: String;
  password: String;

  constructor(email: String, password: String) {
    super();
    this.email = email;
    this.password = password;
  }

  async makeAuth(onDone: Function, onError?: Function) {
    try {
      const { data }: AxiosResponse = await httpClient.post(
        `${API_URL}/auth/login`,
        { email: this.email, password: this.password }
      );
      const { user, access_token: accessToken } = data;
      if (user && accessToken) Login.setAuth(user, accessToken);

      if (onDone) onDone();
    } catch (err) {
      if (onError) onError(err);
    }
  }
}

export { Login };
