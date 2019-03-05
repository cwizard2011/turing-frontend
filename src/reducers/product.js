import {
  GET_ALL_ITEMS,
  GET_ALL_ITEMS_FAIL,
  GET_ITEMS_BY_DEPARTMENT,
  GET_ITEMS_BY_DEPARTMENT_FAIL,
  GET_ITEMS_BY_DEPT_AND_CAT,
  GET_ITEMS_BY_DEPT_AND_CAT_FAIL,
  SEARCH_ITEMS,
  SEARCH_ITEMS_FAIL,
  GET_SINGLE_ITEM,
  GET_SINGLE_ITEM_FAIL,
} from '../actions/types';


const initialState = {
  items: null,
  item: null,
  paginationMeta: null,
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return {
        ...state,
        items: action.items,
        paginationMeta: action.paginationMeta
      };
    case GET_ALL_ITEMS_FAIL:
      return {
        ...state,
        error: action.error
      };
    case GET_SINGLE_ITEM:
      return {
        ...state,
        item: action.item
      };
    case GET_SINGLE_ITEM_FAIL:
      return {
        ...state,
        error: action.error
      };
    case GET_ITEMS_BY_DEPARTMENT:
      return {
        ...state,
        items: action.items,
        paginationMeta: action.paginationMeta
      };
    case GET_ITEMS_BY_DEPARTMENT_FAIL:
      return {
        ...state,
        error: action.error
      };
    case GET_ITEMS_BY_DEPT_AND_CAT:
      return {
        ...state,
        items: action.items,
        paginationMeta: action.paginationMeta
      };
    case GET_ITEMS_BY_DEPT_AND_CAT_FAIL:
      return {
        ...state,
        error: action.error
      };
    case SEARCH_ITEMS:
      return {
        ...state,
        items: action.items,
        paginationMeta: action.paginationMeta
      };
    case SEARCH_ITEMS_FAIL:
      return {
        ...state,
        error: action.error
      };
    default: return state;
  }
};
