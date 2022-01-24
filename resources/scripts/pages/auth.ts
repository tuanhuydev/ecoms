import { Login } from '../services/Auth';
import { APP_URL } from '../configs/constants';
import Cookie from 'js-cookie';
import { AxiosError } from 'axios';

// Auto navigate to admin page if user already logged in
if (localStorage.getItem('user') && Cookie.get('accessToken')) {
  window.location.href = `${APP_URL}/admin`;
}

window.onload = () => {
  const authForm: HTMLFormElement = document.querySelector("form[class='auth__form']");
  const emailInput: HTMLInputElement = document.querySelector("input[name='email']");
  const passwordInput: HTMLInputElement = document.querySelector("input[name='password']");
  const submitButton: HTMLButtonElement = document.querySelector("button[type='submit']");
  const actionsElement: HTMLDivElement = authForm.querySelector("div[class='actions']");
  const statusElement: HTMLDivElement = authForm.querySelector("div[class='actions__status']");

  // Form element not found
  if (!authForm) {
    window.location.href = APP_URL;
  }

  const toggleFormInput = () => {
    emailInput.toggleAttribute('disabled');
    passwordInput.toggleAttribute('disabled');
    submitButton.toggleAttribute('disabled');
  };

  const handleSuccess = () => {
    window.location.href = `${APP_URL}/admin`;
  };

  const highlightErrorField = (element: HTMLInputElement, errorKey: string, message: string = 'Invalid Field') => {
    const errorElement = document.querySelector(`label[class='control__error'][for='${errorKey}']`);
    element.classList.toggle('error');
    errorElement.innerHTML = message;
  };

  const handleFailed = (axiosError: AxiosError) => {
    const { response = { data: {} }, request = { status: 500, statusText: 'Interal Error' } } = axiosError;
    const { errors } = response?.data;

    // Bad request error
    if (errors && request?.status === 422) {
      Object.keys(errors).forEach((errorKey: string) => {
        const errorElement: HTMLInputElement = document.querySelector(`input[name='${errorKey}']`);
        if (errorElement) highlightErrorField(errorElement, errorKey, errors[errorKey]);
      });
    } else {
      // Other errors
      authForm.reset();

      actionsElement.classList.toggle('error');
      statusElement.innerHTML = request.statusText;
    }
  };

  // Events listeners

  authForm.addEventListener('submit', async (event: any) => {
    event.preventDefault();
    toggleFormInput();
    const email: String = emailInput.value;
    const password: String = passwordInput.value;
    const auth = new Login(email, password);

    await auth.makeAuth(handleSuccess, handleFailed);
    toggleFormInput();
  });

  // On focus clear all error state
  authForm.querySelectorAll('.control__input').forEach((input: HTMLInputElement) =>
    input.addEventListener('focus', () => {
      input.classList.remove('error');
      actionsElement.classList.remove('error');
      statusElement.innerHTML = '';
      authForm.querySelectorAll('.control__error').forEach((label: HTMLLabelElement) => {
        label.innerHTML = '';
      });
    })
  );
};
