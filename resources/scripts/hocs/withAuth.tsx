import React, { FC } from 'react';
import { URLS } from '../configs/constants';
import { Login } from '../services/Auth';

const withAuth = (Component: FC): JSX.Element => {
  const auth = Login.getAuth();
  if (!auth) {
    window.location.href = `${URLS.app}/auth/login`;
    return;
  }
  return <Component />;
};

export default withAuth;
