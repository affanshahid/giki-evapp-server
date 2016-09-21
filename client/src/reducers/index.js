import announcementData, * as fromAnnoucementData from './announcementData';
import newsData, * as fromNewsData from './newsData';
import { combineReducers } from '../utils/reducerUtils';

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
  announcementData,
  newsData
});

export function getAnnouncementDataIsFetching(state) {
  return fromAnnoucementData.getIsFetching(state.get('announcementData'));
}

export function getAnnouncements(state) {
  return fromAnnoucementData.getAnnouncements(state.get('announcementData'));
}

export function getNewsDataIsFetching(state) {
  return fromNewsData.getIsFetching(state.get('newsData'));
}

export function getNewsList(state) {
  return fromNewsData.getNewsList(state.get('newsData'));
}
