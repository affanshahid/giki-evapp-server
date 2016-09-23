import { combineReducers } from '../utils/reducerUtils';
import { List, fromJS } from 'immutable';

export default function (listName) {

  function isFetching(state = false, action) {
    if (action.listName !== listName) {
      return state;
    }
    switch(action.type) {
      case 'FETCH_API_REQUEST':
        return true;
      case 'FETCH_API_FAILURE':
      case 'FETCH_API_SUCCESS':
        return false;
      default:
        return state;
    }
  }

  function list(state = List(), action) {
    if (action.listName !== listName) {
      return state;
    }
    switch(action.type) {
      case 'FETCH_API_SUCCESS':
        return fromJS(action.response[action.listName]);
      default:
        return state;
    }
  }

  function error(state = null, action) {
    if (action.listName !== listName) {
      return state;
    }
    switch(action.type) {
      case 'FETCH_API_SUCCESS':
      case 'FETCH_API_REQUEST':
        return null;
      case 'FETCH_API_FAILURE':
        return action.message;
      default:
        return state;
    }
  }

  return combineReducers({
    isFetching,
    error,
    list
  });
}

export function getIsFetching(state) {
  return state.get('isFetching');
}

export function getList(state) {
  return state.get('list');
}
