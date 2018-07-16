// import data from 'data.json'
import { find } from 'lodash'
import axios from 'axios'
import { LOAD_PRODUCTS_SUCCESS } from "constant";

export function getProductData(type) {
  return (dispatch) => {
    let url = `http://localhost:8880/api/products?type=${type}`;
    axios.get(url)
    .then(({ data }) => {
      if (data.success) {
        dispatch(loadProductsSuccess(data.data))
      } else {
        console.log("lỗi lấy product");
      }
    })
    .catch(err => console.log(err))

  }
}


export function loadProductsSuccess(payload) {
  return {
    type: LOAD_PRODUCTS_SUCCESS,
    payload: payload
  }
}