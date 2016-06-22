import { Router } from 'express';
import announcement from './announcement';
import multer from 'multer';

export function init(wagner) {
  wagner.factory('multer', () => {
    return multer({ dest: './data/images' });
  });

  wagner.factory('apiRouter', () => {
    const router = Router();

    const announcementRouter = announcement(wagner);

    router.use(announcementRouter);

    return router;
  });
}
