import axios from 'axios';
import toastr from 'toastr';
import jwt from 'jsonwebtoken';
import Cookie from 'cookies-js';
import config from '../config';
import routes from '../constants/routes';
import { hideSignupModal } from './modal.action';
import {
  SET_CURRENT_USER,
  SIGN_UP_ERRORS,
  DELETE_ERROR_MESSAGE
} from './types';

/**
   * Action to Register a user and return a JWT token
   * @param {*} user - Response object
   * @returns {user} setCurrentUser - to store
   */
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const signUpError = error => ({
  type: SIGN_UP_ERRORS,
  error
});

export const deleteErrorMessageSuccess = () => ({
  type: DELETE_ERROR_MESSAGE,
});

/**
   * Register a user and return a JWT token
   * @param {*} userData - Response object
   * @param {*} history - Next function
   * @param {*} done - Next function
   * @returns {token} token - JWT token
   */

export const deleteErrorMessage = () => (dispatch) => {
  dispatch(deleteErrorMessageSuccess());
};

/**
   * Register a user and return a JWT token
   * @param {*} userData - Response object
   * @param {*} history - Next function
   * @param {*} done - Next function
   * @returns {token} token - JWT token
   */
export const userSignUpRequest = userData => (dispatch) => {
  const user = { user: userData };
  return axios.post(`${config.apiUrl}${routes.SIGN_UP}`, user).then(
    (res) => {
      const { token } = res.data.user;
      const { message } = res.data;
      Cookie.set('jwtToken', token);
      dispatch(setCurrentUser(jwt.decode(token)));
      dispatch(hideSignupModal());
      toastr.success(message);
      return true;
    }
  ).catch((error) => {
    dispatch(signUpError(error.response.data));
  });
};
