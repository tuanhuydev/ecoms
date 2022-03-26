import { APP_URL } from '../configs/constants';
import { ForgotPassword, SignIn, SignUp, UpdatePassword, VerifyAccount } from '../services/AuthService';
import Cookie from 'js-cookie';
import qs from 'qs';

// Auto navigate to admin page if user already logged in
if (localStorage.getItem('user') && Cookie.get('accessToken')) {
  window.location.href = `${APP_URL}/admin`;
}

window.onload = function() {
  const authForm: HTMLFormElement = document.querySelector("form[id='auth__form']");

  if (!authForm) {
    window.location.href = APP_URL;
  }

  const renderErrorItems = (errors: any[], errorsElement: any) => {
    // Clear all child node before re-render new items
    errorsElement.innerHTML = '';

    Object.entries(errors).forEach(([key, errorTexts]: [key: string, errorTexts: any]) => {
      errorTexts.forEach((msg: string) => {
        const errorItem = document.createElement('li');
        errorItem.setAttribute('key', key);
        errorItem.innerText = msg;
        errorsElement.appendChild(errorItem);
      });
    });
  };

  const disableFormControl = (disabled: boolean = true) => {
    const formControls = authForm.querySelectorAll('button , input');
    formControls.forEach((formControl) => {
      if (disabled) {
        formControl.setAttribute('disabled', String(disabled));
      } else {
        formControl.removeAttribute('disabled');
      }
    });
  };

  const handleFailed = (err: any, isAxiosError: boolean = true) => {
    console.log(err);
    const errorsElement: HTMLUListElement = authForm.querySelector('ul#errorList');
    if (isAxiosError) {
      const { response = { data: {} }, request = { status: 500, statusText: 'Internal Error' } } = err;
      const { errors } = response?.data;
      // Bad request error
      if (errors && request?.status === 422) {
        renderErrorItems(errors, errorsElement);
      } else {
        errorsElement.innerHTML = request.statusText;
      }
    } else {
      renderErrorItems(err, errorsElement);
    }
  };

  const handleFinally = () => disableFormControl(false);

  const navigateSignIn = () => {
    window.location.href = `${APP_URL}/auth/sign-in`;
  };

  const handleSignIn = async () => {
    const emailInput: HTMLInputElement = authForm.querySelector("input[name='email']");
    const passwordInput: HTMLInputElement = authForm.querySelector("input[name='password']");

    const email: String = emailInput.value;
    const password: String = passwordInput.value;
    const auth = new SignIn(email, password);

    const handleSignInSuccess = () => {
      window.location.href = `${APP_URL}/admin`;
    };

    await auth.makeAuth(handleSignInSuccess, handleFailed, handleFinally);
    authForm.reset();
  };

  const handleSignUp = async () => {
    const firstName: string = (authForm.querySelector("input[name='firstName']") as HTMLInputElement)?.value;
    const lastName: string = (authForm.querySelector("input[name='lastName']") as HTMLInputElement)?.value;
    const email: string = (authForm.querySelector("input[name='email']") as HTMLInputElement)?.value;
    const password: string = (authForm.querySelector("input[name='password']") as HTMLInputElement)?.value;
    const confirmPassword: string = (
      authForm.querySelector("input[name='confirmPassword']") as HTMLInputElement
    )?.value;

    const auth = new SignUp(firstName, lastName, email, password, confirmPassword);

    const handleSignUpSuccess = (user: any) => {
      window.location.href = `${APP_URL}/auth/verify-account?securityId=${user?.id}`;
    };
    await auth.makeAuth(handleSignUpSuccess, handleFailed, handleFinally);
    authForm.reset();
  };

  const handleVerifyAccount = async () => {
    const verifyToken: string = (authForm.querySelector("input[name='verifyToken']") as HTMLInputElement)?.value;
    const queryParamsString = String(window.location.href).split('?')[1];
    const queryParams = qs.parse(queryParamsString);
    const securityId: string = String(queryParams?.securityId);

    const auth = new VerifyAccount(verifyToken, securityId);

    await auth.makeAuth(navigateSignIn, handleFailed, handleFinally);
    authForm.reset();
  };

  const handleForgotPassword = async() => {
    const email: string = (authForm.querySelector("input[name='email']") as HTMLInputElement)?.value;

    const auth = new ForgotPassword(email);

    await auth.makeAuth(navigateSignIn, handleFailed, handleFinally);
    authForm.reset();
  };

  const handleChangePassword = async() => {
    const password: string = (authForm.querySelector("input[name='password']") as HTMLInputElement)?.value;
    const confirmPassword: string = (
      authForm.querySelector("input[name='confirmPassword']") as HTMLInputElement
    )?.value;
    // TODO: Utilize function
    const queryParamsString = String(window.location.href).split('?')[1];
    const queryParams = qs.parse(queryParamsString);
    const token: string = String(queryParams?.token);
    // console.log(password, confirmPassword, token);
    const auth = new UpdatePassword(password, confirmPassword, token);

    await auth.makeAuth(navigateSignIn, handleFailed, handleFinally);
  };

  // Events listeners

  authForm.addEventListener('submit', async (event: any) => {
    event.preventDefault();
    disableFormControl();

    const formType = authForm.dataset.type;
    switch (formType) {
      case 'sign-in':
        handleSignIn();
        break;
      case 'sign-up':
        handleSignUp();
        break;
      case 'verify-account':
        handleVerifyAccount();
        break;
      case 'forgot-password':
        handleForgotPassword();
        break;
      case 'new-password':
        handleChangePassword();
        break;
      default:
        navigateSignIn();
    }
  });
};
