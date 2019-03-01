import isEmpty from 'is-empty';
import {
  SET_CURRENT_USER,
  SIGN_UP_ERRORS,
  DELETE_ERROR_MESSAGE,
  SET_CURRENT_USER_FAIL
} from '../actions/types';


const initialState = {
  isAuthenticated: false,
  user: {},
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };

    case SET_CURRENT_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        error: action.error
      };

    case SIGN_UP_ERRORS:
      return {
        ...state,
        isAuthenticated: false,
        error: action.error
      };

    case DELETE_ERROR_MESSAGE:
      return {
        error: {}
      };

    case 'LOGOUT_USER':
      return {
        ...state,
        ...initialState
      };
    default: return state;
  }
};
