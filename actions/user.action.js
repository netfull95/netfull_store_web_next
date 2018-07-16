// import data from 'data.json'
import { find } from 'lodash'
import axios from 'axios'
import { LOAD_USERS_SUCCESS } from "constant";

export function getUserData(type) {
  return (dispatch) => {
    let url = `http://localhost:8880/api/users?type=${type}`;
    axios.get(url)
    .then(({ data }) => {
      if (data.success) {
        dispatch(loadUsersSuccess(data.data))
      } else {
        console.log("lỗi lấy thông tin tài khoản");
      }
    })
    .catch(err => console.log(err))

  }
}


function loadUsersSuccess(payload) {
  return {
    type: LOAD_USERS_SUCCESS,
    payload: payload
  }
}