import { Router } from 'express';
import announcement from './announcements';

export function init(wagner) {
  wagner.factory('apiRouter', () => {
    const router = Router();

    const announcementRouter = announcement(wagner);

    router.use(announcementRouter);

    return router;
  });
}
