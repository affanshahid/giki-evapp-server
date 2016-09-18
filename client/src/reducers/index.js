import announcementData, * as fromAnnoucementData from './announcementData';
import { Map } from 'immutable';
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

export default function (state = Map(), action) {
  state = state.update(
    "announcementData",
    oldData => announcementData(oldData, action)
  );
  return state;
}

export function getAnnouncementDataIsFetching(state) {
  return fromAnnoucementData.getIsFetching(state.announcementData);
}
