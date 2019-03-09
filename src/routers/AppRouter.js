import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from '../constants/routes';
import HomePage from '../components/landing/HomePage';
import ItemDetailPage from '../components/products/ItemDetailPage';
import ViewProducts from '../components/products/ViewProducts';
import CartTable from '../components/shoppingcart/CartTable';
import PrivateRoute from '../utils/PrivateRoute';

const AppRoutes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path={routes.LANDING} component={HomePage} />
        <Route exact path={routes.ITEM_DETAILS} component={ItemDetailPage} />
        <Route path={routes.LIST_ITEMS} component={ViewProducts} />
        <PrivateRoute exact path={routes.SHOPPING_CART} component={CartTable} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRoutes;
