import {
  SHOW_SIGNUP_MODAL,
  HIDE_SIGNUP_MODAL,
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  SHOW_CART_MODAL,
  HIDE_CART_MODAL
} from './types';

export const showSignupModal = () => dispatch => dispatch({
  type: SHOW_SIGNUP_MODAL
});

export const hideSignupModal = () => dispatch => dispatch({
  type: HIDE_SIGNUP_MODAL
});

export const showLoginModal = () => dispatch => dispatch({
  type: SHOW_LOGIN_MODAL
});

export const hideLoginModal = () => dispatch => dispatch({
  type: HIDE_LOGIN_MODAL
});

export const showCartModal = () => dispatch => dispatch({
  type: SHOW_CART_MODAL
});

export const hideCartModal = () => dispatch => dispatch({
  type: HIDE_CART_MODAL
});
