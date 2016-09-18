import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'
import thunk from 'redux-thunk';
import reducer from './reducers';

export function () {
  const middlewares = [thunk];

  if(process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
  }
  return createStore(reducer, applyMiddleware(...middlewares))
}
