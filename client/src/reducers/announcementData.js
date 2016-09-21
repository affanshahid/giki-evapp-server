import { List, fromJS } from 'immutable';
import { combineReducers } from '../utils/reducerUtils';

//state = list of announcements
function announcements(state = List(), action) {
  switch (action.type) {
    case 'FETCH_ANNOUNCEMENTS_SUCCESS':
      return fromJS(action.response.announcements);
    default:
      return state;
  }
}

function isFetching(state = false, action) {
  switch(action.type) {
    case 'FETCH_ANNOUNCEMENTS_FAILURE':
    case 'FETCH_ANNOUNCEMENTS_SUCCESS':
      return false;
    case 'FETCH_ANNOUNCEMENTS_REQUEST':
      return true;
    default:
      return state;
  }
}

function error(state = null, action) {
  switch (action.type) {
    case 'FETCH_ANNOUNCEMENTS_SUCCESS':
    case 'FETCH_ANNOUNCEMENTS_REQUEST':
      return null;
    case 'FETCH_ANNOUNCEMENTS_FAILURE':
      return action.message;
    default:
      return state;
  }
}

//state = annData
export default combineReducers({
  announcements,
  isFetching,
  error
});

export function getIsFetching(state) {
  return state.get('isFetching');
}

export function getAnnouncements(state) {
  return state.get('announcements');
}
