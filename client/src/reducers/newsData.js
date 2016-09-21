import { List, fromJS } from 'immutable';
import { combineReducers } from '../utils/reducerUtils';

//state = list of announcements
function newsList(state = List(), action) {
  switch (action.type) {
    case 'FETCH_NEWSLIST_SUCCESS':
      return fromJS(action.response.newsList);
    default:
      return state;
  }
}

function isFetching(state = false, action) {
  switch(action.type) {
    case 'FETCH_NEWSLIST_FAILURE':
    case 'FETCH_NEWSLIST_SUCCESS':
      return false;
    case 'FETCH_NEWSLIST_REQUEST':
      return true;
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case 'FETCH_NEWSLIST_SUCCESS':
    case 'FETCH_NEWSLIST_REQUEST':
      return null;
    case 'FETCH_NEWSLIST_FAILURE':
      return action.message;
    default:
      return state;
  }
}

//state = annData
export default combineReducers({
  newsList,
  isFetching,
  error
});

export function getIsFetching(state) {
  return state.get('isFetching');
}

export function getNewsList(state) {
  return state.get('newsList');
}
