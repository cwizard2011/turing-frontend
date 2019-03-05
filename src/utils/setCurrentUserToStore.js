import Cookie from 'cookies-js';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from '../actions/loginAction.action';
import logoutAction from '../actions/logoutAction.action';


const setCurrentUserToStore = (store) => {
  const token = Cookie.get('jwtToken');
  if (token) {
    const decodedToken = jwt.decode(token);
    try {
      const isExpired = (decodedToken.exp < (Date.now() / 1000));
      if (!isExpired) {
        store.dispatch(setCurrentUser(decodedToken));
      } else {
        store.dispatch(logoutAction());
      }
    } catch (err) {
      store.dispatch(logoutAction());
    }
  }
};

export default setCurrentUserToStore;
