import { Router } from 'express';
import announcement from './announcement';
import multer from 'multer';

import config from '../config';

const parser = multer({ dest: config.uploadsFolder });
const router = Router();

const announcementRouter = announcement(parser);

router.use(announcementRouter);

export default router;
