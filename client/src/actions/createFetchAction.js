import { getIsFetching } from '../reducers';
export default function (dataType, listName, apiCall) {
  function request() {
    return {
      type: 'FETCH_API_REQUEST',
      listName
    };
  }

  function recieve(data) {
    return {
      type: 'FETCH_API_SUCCESS',
      response: data,
      listName
    };
  }

  function fail(message) {
    return {
      type: 'FETCH_API_FAILURE',
      message,
      listName
    };
  }

  return function () {
    return (dispatch, getState) => {
      if (getIsFetching(getState(), dataType)) {
        return Promise.resolve();
      }
      dispatch(request());

      apiCall().then(
        response => {
          dispatch(recieve(response.data));
        }).catch(
        err => {
          dispatch(fail(err.message || 'something went wrong'));
        });
    };
  };
}
