import { APP_URL } from '../../configs/constants';
import { DefaultObjectType } from 'scripts/interfaces/Meta';
import { SignIn } from '../../services/AuthService';
import { useDispatch } from 'react-redux';
import { userActions } from '@store/slices/userSlice';

const PrivateRoute = ({ children }: {children: JSX.Element}) => {
  const dispatch = useDispatch();
  const auth = SignIn.getAuth();
  if (!auth) {
    window.location.href = `${APP_URL}/auth/login`;
  }
  dispatch(userActions.setCurrentUser((auth as DefaultObjectType).user));
  return children;
};

export default PrivateRoute;
