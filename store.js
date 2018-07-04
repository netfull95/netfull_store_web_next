import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import withRedux from 'next-redux-wrapper';

import reducers from './reducers';

const composeEnhancers = (typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initStore = (initialState = {}) => createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunkMiddleware)));

export const connect = (mapStateToProps, actions) => {
  return (component) => withRedux(initStore, mapStateToProps, actions)(component);
}
