import { API_URL } from '../configs/constants';
import { AxiosResponse } from 'axios';
import { DefaultObjectType } from '../interfaces/Meta';
import Cookie from 'js-cookie';
import httpClient from '../configs/httpClient';
import isEmpty from 'lodash/isEmpty';

abstract class Auth {
  static getAuth() {
    const user = localStorage.getItem('user');
    const accessToken = Cookie.get('securityId');
    if (user && accessToken) {
      return { user: JSON.parse(user), accessToken };
    }
    return false;
  }

  // eslint-disable-next-line no-unused-vars
  abstract makeAuth(onDone: Function, onError?: Function, onFinally?: Function): void;

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
  private email: String;
  private password: String;

  constructor(email: String, password: String) {
    super();
    this.email = email;
    this.password = password;
  }

  private validateFields() {
    const error: DefaultObjectType = {};
    if (!this.email.length) {
      error.email = ['The email field is required.'];
    }

    if (!this.password.length) {
      error.password = ['The password field is required.'];
    }

    if (this.password.length < 8) {
      error.password.push('The password must be at least 8 characters.');
    }

    if (!isEmpty(error)) {
      throw error;
    }
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
      if (onError) onError(err, !!err?.response);
    } finally {
      if (onFinally) onFinally();
    }
  }
}

class SignUp extends Auth {
  private firstName: String;
  private lastName: String;
  private email: String;
  private password: String;
  private confirmPassword: String;

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
    if (!this.firstName.length) {
      error.firstName = ['The firstName field is required.'];
    }
    if (!this.lastName.length) {
      error.lastName = ['The lastName field is required.'];
    }
    if (!this.email.length) {
      error.email = ['The email field is required.'];
    }

    if (!this.password.length) {
      error.password = ['The password field is required.'];
    }

    if (this.password.length <= 8) {
      error.password.push('The password must be at least 8 characters.');
    }

    if (this.password !== this.confirmPassword) {
      error.password.push('The password and confirm password must match.');
    }
    if (!isEmpty(error)) {
      throw error;
    }
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

  async makeAuth(onDone: Function, onError?: Function, onFinally?: Function) {
    try {
      await httpClient.post(`${API_URL}/auth/verify-account`, { token: this.token, id: this.id });
      if (onDone) onDone();
    } catch (err) {
      if (onError) onError(err, !!err?.response);
    } finally {
      if (onFinally) onFinally();
    }
  }
}

class ForgotPassword extends Auth {
  private email: String;

  constructor(email: String) {
    super();
    this.email = email;
  }

  private validateFields() {
    const error: DefaultObjectType = {};
    if (!this.email.length) {
      error.email = ['The email must be not empty.'];
    }

    if (!isEmpty(error)) {
      throw error;
    }
  }

  async makeAuth(onDone: Function, onError?: Function, onFinally?: Function) {
    try {
      this.validateFields();
      const { data }: AxiosResponse = await httpClient.post(
        `${API_URL}/auth/forgot-password`,
        { email: this.email }
      );
      if (data?.success) {
        if (onDone) onDone();
      }
    } catch (err) {
      if (onError) onError(err, !!err?.response);
    } finally {
      if (onFinally) onFinally();
    }
  }
}

class UpdatePassword extends Auth {
  private password: String;
  private confirmPassword: String;
  private token: String;

  constructor(password: String, confirmPassword: String, token: String) {
    super();
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.token = token;
  }

  validateFields() {
    const error: DefaultObjectType = {};
    if (!this.password.length) {
      error.password = ['The password must be not empty.'];
    }
    if (this.password !== this.confirmPassword) {
      error.password.push('The password must be match with confirm password.');
    }
    if (!isEmpty(error)) {
      throw error;
    }
  }

  async makeAuth(onDone: Function, onError?: Function, onFinally?: Function) {
    try {
      this.validateFields();
      const { data }: AxiosResponse = await httpClient.post(
        `${API_URL}/auth/update-password`,
        {
          password: this.password,
          confirm_password: this.confirmPassword,
          token: this.token
        }
      );
      if (data?.success) {
        if (onDone) onDone();
      }
    } catch (err) {
      if (onError) onError(err, !!err?.response);
    } finally {
      if (onFinally) onFinally();
    }
  }
}

export { SignIn, SignUp, VerifyAccount, ForgotPassword, UpdatePassword };
