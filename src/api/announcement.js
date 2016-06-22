import { Router } from 'express';
import _ from 'lodash';

export default function (wagner) {
  const router = Router();

  wagner.invoke((Announcement) => {
    router.get('/announcement', (req, res) => {
      Announcement.findAll().then(announcements => {
        res.json({ announcements });
      }, () => {
        res.status(500).send();
      });
    });
  });

  wagner.invoke((Announcement, multer) => {
    router.post('/announcement', multer.single(), (req, res) => {
      const announcement = _.pick(req.body, 'title', 'description');
      Announcement.create(announcement).then(anc => {
        res.json({ success: true, announcement: anc });
      }, (err) => {
        res.status(400).json({ success: false, error: err });
      });
    });
  });

  return router;
}
