import {
  SET_TOTAL_CART_ITEM,
  SET_TOTAL_CART_ITEM_FAIL,
  ADD_CART_ITEM,
  ADD_CART_ITEM_FAIL
} from '../actions/types';


const initialState = {
  cart: null,
  total: null,
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOTAL_CART_ITEM:
      return {
        ...state,
        cart: action.cart,
        total: action.total
      };
    case SET_TOTAL_CART_ITEM_FAIL:
      return {
        ...state,
        error: action.data
      };
    case ADD_CART_ITEM:
      return {
        ...state,
        cart: { ...action.cart, ...state.cart },
        total: action.total + state.total
      };
    case ADD_CART_ITEM_FAIL:
      return {
        ...state,
        error: action.error
      };
    default: return state;
  }
};
