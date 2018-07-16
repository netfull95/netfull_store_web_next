// import data from 'data.json'
import { find } from 'lodash'
import axios from 'axios'
import { LOAD_CATEGORIES_SUCCESS } from "constant";

export function getCategoryData(type) {
  return (dispatch) => {
    let url = `http://localhost:8880/api/categories?type=${type}`;
    axios.get(url)
    .then(({ data }) => {
      if (data.success) {
        dispatch(loadCategoriesSuccess(data.data))
      } else {
        console.log("lỗi lấy bài viết");
      }
    })
    .catch(err => console.log(err))

  }
}


function loadCategoriesSuccess(payload) {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    payload: payload
  }
}