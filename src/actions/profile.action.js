import axios from 'axios';
import config from '../config';
import * as actionTypes from './types';

export const getUserProfile = () => dispatch => axios.get(
  `${config.apiUrl}/users`
)
  .then((res) => {
    dispatch({
      type: actionTypes.GET_USER_PROFILE,
      profile: res.data
    });
    return res;
  }).catch((error) => {
    dispatch({
      type: actionTypes.GET_USER_PROFILE_FAIL,
      status: error.response,
      data: error.response
    });
  });

export const updateUserProfile = update => (dispatch) => {
  const userInfo = {
    user: update
  };
  console.log(update);
  return axios.put(
    `${config.apiUrl}/users`, userInfo
  )
    .then((res) => {
      dispatch({
        type: actionTypes.UPDATE_USER_PROFILE,
        profile: res.data
      });
    }).catch((error) => {
      dispatch({
        type: actionTypes.UPDATE_USER_PROFILE_FAIL,
        status: error.response,
        data: error.response
      });
    });
};

export const getCountryList = () => dispatch => axios.get(
  `${config.apiUrl}/countries`
).then((res) => {
  dispatch({
    type: actionTypes.GET_COUNTRIES,
    countries: res.data
  });
  return res;
}).catch((error) => {
  dispatch({
    type: actionTypes.GET_COUNTRIES_FAIL,
    status: error.response,
    data: error.response
  });
});

export const getRegionList = () => dispatch => axios.get(
  `${config.apiUrl}/region`
).then((res) => {
  dispatch({
    type: actionTypes.GET_REGIONS,
    regions: res.data
  });
  return res;
}).catch((error) => {
  dispatch({
    type: actionTypes.GET_REGIONS_FAIL,
    status: error.response,
    data: error.response
  });
});
