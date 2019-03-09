import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'toastr/build/toastr.css';
import AppRoutes from './routers/AppRouter';
import store from './store/index';
import setAuthorizationToken from './utils/authorization';
import setCurrentUserToStore from './utils/setCurrentUserToStore';
import './styles/scss/App.scss';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

setAuthorizationToken();

setCurrentUserToStore(store);

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('app')
);

console.log('STRIPE KEY', process.env.STRIPE_PUBLISHABLE_KEY);
console.log('ENVIRONMENT IS', process.env.NODE_ENV);
