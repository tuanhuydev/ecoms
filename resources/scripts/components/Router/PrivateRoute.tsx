import { APP_URL } from '../../configs/constants';
import { DefaultObjectType } from 'scripts/interfaces/Meta';
import { SignIn } from '../../services/AuthService';
import { User } from 'scripts/interfaces/User';
import { useDispatch } from 'react-redux';
import { userActions } from '@store/slices/userSlice';

const PrivateRoute = ({ children }: {children: JSX.Element}) => {
  const dispatch = useDispatch();
  const auth = SignIn.getAuth();
  if (!auth) {
    window.location.href = `${APP_URL}/auth/sign-in`;
  }
  const currentUser: User = (auth as DefaultObjectType).user;
  dispatch(userActions.setCurrentUser(currentUser));
  return children;
};

export default PrivateRoute;
