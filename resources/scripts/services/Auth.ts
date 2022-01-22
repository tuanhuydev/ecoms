import { AxiosResponse } from 'axios';
import { API_URL } from '../configs/constants';
import Cookie from 'js-cookie';
import httpClient from '../configs/httpClient';
import { isEmpty } from 'lodash';

abstract class Auth {
  static getAuth() {
    const user = localStorage.getItem('user');
    const accessToken = Cookie.get('securityId');
    if (user && accessToken) {
      return { user, accessToken };
    }
    return false;
  }

  static clearAuth() {
    localStorage.removeItem('user');
    Cookie.remove('securityId');
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

  private validate(): boolean {
    // TODO: Validate here
    return true;
  }

  async makeAuth(onDone: Function, onError?: Function) {
    try {
      if (!this.validate()) {
        throw new Error('Validate failed');
      }
      const { data }: AxiosResponse = await httpClient.post(
        `${API_URL}/auth/login`,
        { email: this.email, password: this.password }
      );
      const { user, access_token: accessToken } = data;
      if (user && accessToken) {
        onDone({ user, accessToken });
      }
    } catch (err) {
      isEmpty(onError) && onError();
    }
  }
}

export { Login };
