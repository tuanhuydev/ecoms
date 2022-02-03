import { APP_URL } from '../../configs/constants';
import { Login } from '../../services/AuthService';

const PrivateRoute = ({ children }: {children: JSX.Element}) => {
  const auth = Login.getAuth();
  if (!auth) {
    window.location.href = `${APP_URL}/auth/login`;
  }
  return children;
};

export default PrivateRoute;
