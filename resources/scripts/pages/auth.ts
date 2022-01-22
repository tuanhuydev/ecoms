import { Login } from '../services/Auth';
import { APP_URL } from '../configs/constants';
import Cookie from 'js-cookie';

// TODO: Handle smoother transition betweeen auth page to admin page
if (localStorage.getItem('user') && Cookie.get('accessToken')) {
  window.location.href = `${APP_URL}/admin`;
}

window.onload = () => {
  const emailElement: HTMLInputElement = document.querySelector("input[name='email']");
  const passwordElement: HTMLInputElement = document.querySelector("input[name='password']");
  const loginBtn: HTMLButtonElement = document.querySelector("button[name='login']");

  const loadingForm = (loading: Boolean = true) => {
    emailElement.toggleAttribute('disabled');
    passwordElement.toggleAttribute('disabled');
    loginBtn.textContent = loading ? 'Submitting...' : 'Login';
  };

  const handleLoginSuccess = (data: { user: any; accessToken: string }) => {
    const { user, accessToken } = data;
    if (user && accessToken) {
      localStorage.setItem('user', JSON.stringify(user));
      Cookie.set('securityId', accessToken, { expires: 7, sameSite: 'strict' });
      window.location.href = `${APP_URL}/admin`;
    }
    loadingForm(false);
  };

  const handleLoginFailed = (error: Error) => {
    // TODO: Handle Error here
    return error;
  };

  const handleLogin = async (event: Event) => {
    loadingForm();
    const email: String = emailElement.value;
    const password: String = passwordElement.value;

    const auth = new Login(email, password);
    await auth.makeAuth(handleLoginSuccess, handleLoginFailed);
  };

  // Events listener
  loginBtn?.addEventListener('click', handleLogin);
};
