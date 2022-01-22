import React, { FC } from 'react';
import { APP_URL } from '../configs/constants';
import { Login } from '../services/Auth';

const withAuth = (Component: FC): JSX.Element => {
  const auth = Login.getAuth();
  if (!auth) {
    window.location.href = `${APP_URL}/auth/login`;
    return;
  }
  return <Component />;
};

export default withAuth;
