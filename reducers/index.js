import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import productReducer from './product.reducer';
import postReducer from './post.reducer';
import userReducer from './user.reducer';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer';

const reducers = combineReducers({
  auth: authReducer,
  product: productReducer,
  post: postReducer,
  user: userReducer,
  category: categoryReducer,
  order: orderReducer,
})

export default reducers
