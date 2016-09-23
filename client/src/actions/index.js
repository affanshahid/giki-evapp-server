import * as api from '../api';
import createFetchAction from './createFetchAction';

export const fetchAnnouncements = createFetchAction(
  'announcementData',
  'announcements',
  api.fetchAnnouncements
);

export const fetchNewsList = createFetchAction(
  'newsData',
  'newsList',
  api.fetchNewsList
);

export const fetchModules = createFetchAction(
  'moduleData',
  'modules',
  api.fetchModules
);
