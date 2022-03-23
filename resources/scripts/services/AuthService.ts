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

class SignIn extends Auth {
  email: String;
  password: String;

  constructor(email: String, password: String) {
    super();
    this.email = email;
    this.password = password;
  }

  private validateFields() {
    const error: DefaultObjectType = {};
    if (this.password.length <= 8) {
      error.password = ['The password must be at least 8 characters.'];
    }
    throw error;
  }

  async makeAuth(onDone: Function, onError?: Function, onFinally?: Function) {
    try {
      this.validateFields();
      const { data }: AxiosResponse = await httpClient.post(
        `${API_URL}/auth/sign-in`,
        { email: this.email, password: this.password }
      );
      const { user, access_token: accessToken } = data;
      if (user && accessToken) SignIn.setAuth(user, accessToken);

      if (onDone) onDone();
    } catch (err) {
      if (onError) onError(err);
    } finally {
      if (onFinally) onFinally();
    }
  }
}

class SignUp extends Auth {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  confirmPassword: String;

  constructor(firstName: String, lastName: String, email: String, password: String, confirmPassword: String) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  private validateFields() {
    const error: DefaultObjectType = {};
    if (this.password.length <= 8) {
      error.password = ['The password must be at least 8 characters.'];
    }
    if (this.password !== this.confirmPassword) {
      error.password.push('The password and confirm password must match.');
    }
    throw error;
  }

  async makeAuth(onDone: Function, onError?: Function, onFinally?: Function) {
    try {
      this.validateFields();
      const formData: DefaultObjectType = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        confirm_password: this.confirmPassword
      };
      const { data: newUser }: AxiosResponse = await httpClient.post(`${API_URL}/auth/sign-up`, formData);
      if (onDone) {
        await onDone(newUser);
      }
    } catch (err) {
      if (onError) onError(err, !!err?.response);
    } finally {
      if (onFinally) onFinally();
    }
  }
}

class VerifyAccount extends Auth {
  private token: String;
  private id: String;

  constructor(token: String, id: string) {
    super();
    this.token = token;
    this.id = id;
  }

  private validateFields() {
    const error: DefaultObjectType = {};
    if (this.password.length <= 8) {
      error.password = ['The password must be at least 8 characters.'];
    }
    throw error;
  }

  async makeAuth(onDone: Function, onError?: Function, onFinally?: Function) {
    try {
      await httpClient.post(`${API_URL}/auth/verify-account`, { token: this.token, id: this.id });
      if (onDone) onDone();
    } catch (err) {
      if (onError) onError(err);
    } finally {
      if (onFinally) onFinally();
    }
  }
}

export { SignIn, SignUp, VerifyAccount };
