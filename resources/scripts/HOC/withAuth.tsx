import React, { FC } from 'react';
import { URLS } from '../configs/constants';
import { Login } from '../services/Auth';

function withAuth(Component: FC): JSX.Element {
  if (!Login.getAuth()) {
    window.location.href = `${URLS.app}/auth/login`;
    return;
  }
  return <Component />;
}

export default withAuth;
