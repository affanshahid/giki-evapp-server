import { get } from 'axios';

export function fetchAnnouncements() {
  return get('/api/v1/announcement');
}

export function fetchNewsList() {
  let prom = get('/api/v1/news');
  if (process.env.NODE_ENV === 'development') {
    prom = prom.then(response => {
      response.data.newsList = convertFileUrls(response.data.newsList);
      return response;
    });
  }
  return prom;
}

function convertFileUrls(newsList) {
  return newsList.map((item) => {
    item.fileUrl = mapFileUrl(item.fileUrl);
    return item;
  });
}

function mapFileUrl(fileUrl) {
  return `api/v1/image/${fileUrl}`;
}
