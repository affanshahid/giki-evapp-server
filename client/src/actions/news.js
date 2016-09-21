import { getNewsDataIsFetching } from '../reducers';
import * as api from '../api';

export function fetchNewsList() {
  return (dispatch, getState) => {
    if (getNewsDataIsFetching(getState())) {
      return Promise.resolve();
    }

    dispatch(requestNewsList());
    return api.fetchNewsList().then(response => {
      dispatch(recieveNewsList(response.data));
    }).catch(err => {
      dispatch(failRequest(err.message || 'something went wrong'));
    });
  };
}

function requestNewsList() {
  return {
    type: 'FETCH_NEWSLIST_REQUEST'
  };
}

function recieveNewsList(data) {
  return {
    type: 'FETCH_NEWSLIST_SUCCESS',
    response: data
  };
}

function failRequest(message) {
  return {
    type: 'FETCH_NEWSLIST_FAILURE',
    message
  };
}
