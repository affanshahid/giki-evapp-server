import { getAnnouncementDataIsFetching } from '../reducers';
import * as api from '../api';

//returns thunk-action
export function fetchAnnouncements() {
  return (dispatch, getState) => {
    if (getAnnouncementDataIsFetching(getState())) {
      return Promise.resolve();
    }
    dispatch(requestAnnouncements());

    api.fetchAnnouncements().then(
      response => {
        dispatch(recieveAnnouncements(response.data));
      }).catch(
      err => {
        dispatch(failRequest(err.message || 'something went wrong'));
      });
  };
}

function requestAnnouncements() {
  return {
    type: 'FETCH_ANNOUNCEMENTS_REQUEST'
  };
}

function recieveAnnouncements(data) {
  return {
    type: 'FETCH_ANNOUNCEMENTS_SUCCESS',
    response: data
  };
}

function failRequest(message) {
  return {
    type: 'FETCH_ANNOUNCEMENTS_FAILURE',
    message
  };
}
