import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const middleware = process.env.NODE_ENV
 === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk);

/**
 *
 * @description - Redux store configuration
 *
 *
 * @returns {Object} - Object containing data in redux store
 */
const store = createStore(
  rootReducer,
  middleware
);

export default store;
