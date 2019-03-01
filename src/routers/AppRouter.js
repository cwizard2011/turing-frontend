import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from '../constants/routes';
import HomePage from '../components/landing/HomePage';

const AppRoutes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path={routes.LANDING} component={HomePage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRoutes;
