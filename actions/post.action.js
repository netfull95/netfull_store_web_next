// import data from 'data.json'
import { find } from 'lodash'
import axios from 'axios'
import { LOAD_POSTS_SUCCESS } from "constant";

export function getPostData(type) {
  return (dispatch) => {
    let url = `http://localhost:8880/api/posts?type=${type}`;
    axios.get(url)
    .then(({ data }) => {
      if (data.success) {
        dispatch(loadPostsSuccess(data.data))
      } else {
        console.log("lỗi lấy bài viết");
      }
    })
    .catch(err => console.log(err))

  }
}


function loadPostsSuccess(payload) {
  return {
    type: LOAD_POSTS_SUCCESS,
    payload: payload
  }
}