import { APP_URL } from '../../configs/constants';
import { Account } from 'scripts/interfaces/Model';
import { DefaultObjectType } from 'scripts/interfaces/Meta';
import { SignIn } from '../../services/AuthService';
import { useDispatch } from 'react-redux';
import { userActions } from '@store/slices/userSlice';

const PrivateRoute = ({ children }: {children: JSX.Element}) => {
  const dispatch = useDispatch();
  const auth = SignIn.getAuth();
  if (!auth) {
    window.location.href = `${APP_URL}/auth/sign-in`;
  }
  const currentAccount: Account = (auth as DefaultObjectType).account;
  dispatch(userActions.setCurrentUser(currentAccount));
  return children;
};

export default PrivateRoute;
