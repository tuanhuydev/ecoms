import { AxiosResponse } from 'axios';
import Request from '../services/Request';
import { URLS } from '../configs/constants';
import Cookie from 'js-cookie';

abstract class Auth {
  abstract makeAuth(onDone: Function, onError: Function): void;
  static getAuth() {
    const user = localStorage.getItem('user');
    const accessToken = Cookie.get('securityId');
    if (user && accessToken) {
      return { user, accessToken };
    }
    return false;
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

  async makeAuth(onDone: Function, onError: Function) {
    if (!this.validate()) {
      throw new Error();
    }
    await Request.make(
      `${URLS.api}/auth/login`,
      {
        method: 'POST',
        data: {
          email: this.email,
          password: this.password
        }
      },
      ({ data }: AxiosResponse) => {
        const { user, access_token: accessToken } = data;
        if (user && accessToken) {
          onDone({ user, accessToken });
        }
      },
      (error: Error) => {
        onError(error);
      }
    );
  }
}

export { Login };
