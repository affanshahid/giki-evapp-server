import { Router } from 'express';
import announcement from './announcement';
import multer from 'multer';

const parser = multer({ dest: './data/images' });
const router = Router();

const announcementRouter = announcement(parser);

router.use(announcementRouter);

export default router;
