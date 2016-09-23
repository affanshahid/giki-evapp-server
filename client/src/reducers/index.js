import { combineReducers } from '../utils/reducerUtils';
import createData, * as fromCreateData  from './createData';

/*
state plan - all lists and objects are immutable Lists and Maps
{
  newsData: {
    newsList: [{}...]
  },
  moduleData: {
    modules: [{}...]
  },
  announcementData: {
    announcements: [{}...]
  }
}

*/

export default combineReducers({
  announcementData: createData('announcements'),
  newsData: createData('newsList'),
  moduleData: createData('modules')
});

export function getIsFetching(state, dataType) {
  return fromCreateData.getIsFetching(state.get(dataType));
}

export function getList(state, dataType) {
  return fromCreateData.getList(state.get(dataType));
}
