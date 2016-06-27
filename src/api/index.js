import { Router, static as staticMW } from 'express';
import { getRouter as getAnnouncementRouter } from './announcement';
import { getRouter as getModuleRouter } from './module';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';

import config from '../config';

const router = Router();
if (config.env === 'production') {
  config.cloudinaryOpts.cloudinary = cloudinary;
  const storage = cloudinaryStorage(config.cloudinaryOpts);
  config.multerOpts.storage = storage;
} else {
  router.use('/image/', staticMW('./data/images'));
}
const parser = multer(config.multerOpts);

const announcementRouter = getAnnouncementRouter(parser);
const moduleRouter = getModuleRouter(parser);

router.use(moduleRouter);
router.use(announcementRouter);

export default router;
