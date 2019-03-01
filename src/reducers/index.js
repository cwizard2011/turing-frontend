import { combineReducers } from 'redux';
import auth from './auth';
import modal from './modal';

const appReducer = combineReducers({
  auth,
  modal
});

export default appReducer;
