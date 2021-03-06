import { combineReducers } from 'redux';
import auth from './auth';
import modal from './modal';
import cart from './cart';
import product from './product';
import department from './department';
import deal from './deal';
import profile from './profile';

const appReducer = combineReducers({
  auth,
  modal,
  cart,
  product,
  department,
  deal,
  profile
});

export const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state.cart.total = null;
  }

  return appReducer(state, action);
};

export default rootReducer;
