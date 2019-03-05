import axios from 'axios';
import config from '../config';
import * as actionTypes from './types';
import routes from '../constants/routes';

export const getItemDepartment = (items, paginationMeta) => ({
  type: actionTypes.GET_ALL_ITEMS,
  items,
  paginationMeta
});

export const getItemDepartmentError = error => ({
  type: actionTypes.GET_ALL_ITEMS_FAIL,
  error
});

export const getAllDepartments = department => ({
  type: actionTypes.GET_ALL_DEPARTMENTS,
  department
});

export const getAllDepartmentError = error => ({
  type: actionTypes.GET_ALL_DEPARTMENTS_FAILS,
  error
});

export const getDealOfDay = deal => ({
  type: actionTypes.GET_DEAL_OF_DAY,
  deal
});

export const getDealOfDayError = error => ({
  type: actionTypes.GET_DEAL_OF_DAY_FAIL,
  error
});

export const getItems = (params = null) => dispatch => axios.get(
  `${config.apiUrl}${routes.LIST_ITEMS}?${params}`
)
  .then((res) => {
    dispatch({
      type: actionTypes.GET_ALL_ITEMS,
      items: res.data.items,
      paginationMeta: res.data.paginationMeta
    });
    return res;
  }).catch((error) => {
    dispatch(getItemDepartmentError({
      status: error.response.status,
      data: error.response.data
    }));
  });

export const getSingeItem = itemId => dispatch => axios.get(
  `${config.apiUrl}/items/${itemId}`
)
  .then((res) => {
    dispatch({
      type: actionTypes.GET_SINGLE_ITEM,
      item: res.data.product
    });
  }).catch((error) => {
    dispatch({
      type: actionTypes.GET_SINGLE_ITEM_FAIL,
      data: error.response.data
    });
  });

export const getDepartments = () => dispatch => axios.get(
  `${config.apiUrl}${routes.LIST_DEPARTMENT}`
)
  .then((res) => {
    dispatch({
      type: actionTypes.GET_ALL_DEPARTMENTS,
      department: res.data.departments,
    });
  }).catch((error) => {
    dispatch(getAllDepartmentError({
      status: error.response.status,
      data: error.response.data
    }));
  });

export const getDeal = () => dispatch => axios.get(
  `${config.apiUrl}/featured`
)
  .then((res) => {
    dispatch({
      type: actionTypes.GET_DEAL_OF_DAY,
      deal: res.data.featuredItem,
    });
  }).catch((error) => {
    dispatch(getDealOfDayError({
      status: error.response.status,
      data: error.response.data
    }));
  });
