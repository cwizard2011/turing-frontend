import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'toastr/build/toastr.css';
import AppRoutes from './routers/AppRouter';
import store from './store/index';
import setAuthorizationToken from './utils/authorization';
import setCurrentUserToStore from './utils/setCurrentUserToStore';
import './styles/scss/App.scss';

setAuthorizationToken();

setCurrentUserToStore(store);

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('app')
);
