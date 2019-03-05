import {
  GET_DEAL_OF_DAY,
  GET_DEAL_OF_DAY_FAIL
} from '../actions/types';


const initialState = {
  deal: null,
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DEAL_OF_DAY:
      return {
        ...state,
        deal: action.deal
      };
    case GET_DEAL_OF_DAY_FAIL:
      return {
        ...state,
        error: action.error
      };
    default: return state;
  }
};
