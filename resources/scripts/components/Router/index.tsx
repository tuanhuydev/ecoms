import React, { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { adminRoutes } from '../../configs/routes';
import { RouteType } from '../../interfaces/Meta';

const HOME_PATH = '/';

const Router: FC = ({ children }): JSX.Element => {
  const navigateNoMatch = () => {
    window.location.href = HOME_PATH;
    return <></>;
  };

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

  return (
    <BrowserRouter>
      {children}
      <Switch>{routeElements}</Switch>
    </BrowserRouter>
  );
};

export default Router;
