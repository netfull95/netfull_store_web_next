// import data from 'data.json'
import { find } from 'lodash'
import axios from 'axios'
import { LOAD_ORDERS_SUCCESS } from "constant";

export function getOrderData(type) {
  return (dispatch) => {
    let url = `http://localhost:8880/api/orders?type=${type}`;
    axios.get(url)
    .then(({ data }) => {
      if (data.success) {
        dispatch(loadOrdersSuccess(data.data))
      } else {
        console.log("lỗi lấy đơn hàng");
      }
    })
    .catch(err => console.log(err))

  }
}


function loadOrdersSuccess(payload) {
  return {
    type: LOAD_ORDERS_SUCCESS,
    payload: payload
  }
}