import update from 'immutability-helper'
import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from "constant";

// import Notification from 'components/Notification'

const initialState = {
  username: null,
  phone_number: null,
  permission: null,
  name: null,
  id: null,
  email: null,
  address: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return update(state, { $set: action.payload });
    case 'LOGOUT_SUCCESS':
      return update(state, { $set: {}})
    default:
      return state
  }
  return state;
}