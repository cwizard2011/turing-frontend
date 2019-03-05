import {
  GET_ALL_DEPARTMENTS,
  GET_ALL_DEPARTMENTS_FAILS
} from '../actions/types';


const initialState = {
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DEPARTMENTS:
      return {
        ...state,
        department: action.department
      };
    case GET_ALL_DEPARTMENTS_FAILS:
      return {
        ...state,
        error: action.error
      };
    default: return state;
  }
};
