import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_COUNTRIES,
  GET_COUNTRIES_FAIL,
  GET_REGIONS,
  GET_REGIONS_FAIL,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_FAIL
} from '../actions/types';


const initialState = {
  update: null,
  region: null,
  countries: null,
  profile: null,
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.error
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        update: action.profile,
      };
    case UPDATE_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.error
      };
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.countries
      };
    case GET_COUNTRIES_FAIL:
      return {
        ...state,
        error: action.error
      };
    case GET_REGIONS:
      return {
        ...state,
        region: action.regions
      };
    case GET_REGIONS_FAIL:
      return {
        ...state,
        error: action.error
      };
    default: return state;
  }
};
