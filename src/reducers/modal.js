import {
  SHOW_SIGNUP_MODAL,
  HIDE_SIGNUP_MODAL,
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
} from '../actions/types';

const initialState = {
  current: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SIGNUP_MODAL: return {
      ...state,
      current: 'signup'
    };

    case HIDE_SIGNUP_MODAL: return {
      ...state,
      current: null
    };

    case SHOW_LOGIN_MODAL: return {
      ...state,
      current: 'login'
    };

    case HIDE_LOGIN_MODAL: return {
      ...state,
      current: null
    };

    default: return state;
  }
};
