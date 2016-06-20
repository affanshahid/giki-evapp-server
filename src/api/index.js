import { Router } from 'express';
import announcement from './announcement';
import { json } from 'body-parser';

export function init(wagner) {
  wagner.factory('apiRouter', () => {
    const router = Router();

    const announcementRouter = announcement(wagner);

    router.use(json());
    router.use(announcementRouter);

    return router;
  });
}
