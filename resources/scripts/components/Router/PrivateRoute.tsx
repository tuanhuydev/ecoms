import { APP_URL } from '../../configs/constants';
import { DefaultObjectType } from 'scripts/interfaces/Meta';
import { SignIn } from '../../services/AuthService';
import { accountActions } from '@store/slices/accountSlice';
import { useDispatch } from 'react-redux';
import { userActions } from '@store/slices/userSlice';

const PrivateRoute = ({ children }: {children: JSX.Element}) => {
  const dispatch = useDispatch();
  const auth = SignIn.getAuth();
  if (!auth) {
    window.location.href = `${APP_URL}/auth/sign-in`;
  }
  const { user, ...restAccount } = (auth as DefaultObjectType).account;
  dispatch(userActions.setCurrentUser(user));
  dispatch(accountActions.setCurrentAccount(restAccount));
  return children;
};

export default PrivateRoute;
