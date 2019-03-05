import axios from 'axios';
import config from '../config';
import * as actionTypes from './types';
import routes from '../constants/routes';

export const getCartSuccess = cart => ({
  type: actionTypes.SET_TOTAL_CART_ITEM,
  cart
});

export const cartError = error => ({
  type: actionTypes.SET_CURRENT_USER_FAIL,
  error
});

export const getCartItem = () => dispatch => axios.get(
  `${config.apiUrl}${routes.SHOPPING_CART}`
)
  .then((res) => {
    dispatch({
      type: actionTypes.SET_TOTAL_CART_ITEM,
      cart: res.data.items,
      total: res.data.totalItems
    });
  }).catch((error) => {
    dispatch(cartError({
      status: error.response.status,
      data: error.response.data
    }));
  });

export const addItemToCart = itemDetails => (dispatch) => {
  const item = { cart: itemDetails };
  return axios.post(
    `${config.apiUrl}${routes.SHOPPING_CART}`,
    item
  )
    .then((res) => {
      dispatch({
        type: actionTypes.ADD_CART_ITEM,
        cart: res.data.items,
        total: res.data.totalItems
      });
    }).catch((error) => {
      dispatch({
        type: actionTypes.ADD_CART_ITEM_FAIL,
        error: error.response.data
      });
    });
};
