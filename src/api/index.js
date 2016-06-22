import { Router } from 'express';
import { getRouter as getAnnouncementRouter } from './announcement';
import { getRouter as getModuleRouter } from './module';
import multer from 'multer';

import config from '../config';

const parser = multer({ dest: config.uploadsFolder });
const router = Router();

const announcementRouter = getAnnouncementRouter(parser);
const moduleRouter = getModuleRouter(parser);

router.use(moduleRouter);
router.use(announcementRouter);

export default router;
