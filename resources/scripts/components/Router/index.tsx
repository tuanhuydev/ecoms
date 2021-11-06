import React, { FC } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { APP_URL } from '../../configs/constants';
import { adminRoutes } from '../../configs/routes';
import { RouteType } from '../../interfaces/Meta';

const navigateNoMatch = () => {
  window.location.href = APP_URL;
  return <></>;
};

export const makeRouteElements = () => {
  const routeElements: Array<JSX.Element> = Object.keys(adminRoutes).map((key: string) => {
    const route: RouteType = adminRoutes[key];
    return (
      <Route path={route.path} key={key} exact>
        {route.container}
      </Route>
    );
  });

  // route /admin auto redirect to overview
  routeElements.push(
    <Route path="/admin" key={'admin-redirect-to-overview'}>
      <Redirect to="/admin/overview" />
    </Route>
  );
  // Redirect home when no match route
  routeElements.push(<Route path="*" key={'no-match-route'} render={navigateNoMatch}></Route>);
  return routeElements;
};

const Router: FC = ({ children }): JSX.Element => <BrowserRouter>{children}</BrowserRouter>;

export default Router;
