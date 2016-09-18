import { get } from 'axios';

export function fetchAnnouncements() {
  return get('/api/v1/announcement');
}
