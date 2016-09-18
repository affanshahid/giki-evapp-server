import { Map, List, fromJS } from 'immutable';
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
      return action.message
    default:
      return state;
  }
}

//state = annData
export default function (state = Map(), action) {
  const updates = {
    announcements,
    isFetching,
    error
  };

  for (let key in updates) {
    state = state.update(
      key,
      oldData => updates[key](oldData, action)
    );
  }

  return state;
}

export function getIsFetching(state) {
  return state.get('isFetching');
}
