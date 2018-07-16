import update from 'immutability-helper'
import { LOAD_POSTS_SUCCESS } from "constant";

const initialState = {
  data: []
}

export default (state = initialState, action) => {;
  switch (action.type) {
    case LOAD_POSTS_SUCCESS:
      return update(state, { data: { $set: action.payload } });
    default:
      return state
  }
  return state;
}