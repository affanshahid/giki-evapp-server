import { Router } from 'express';
import _ from 'lodash';

export default function (wagner) {
  const router = Router();

  router.get('/announcement', wagner.invoke(Announcement => (req, res) => {
    Announcement.findAll().then(announcements => {
      res.json({ announcements });
    }, () => {
      res.status(500).send();
    });
  }));

  router.post('/announcement', wagner.invoke(Announcement => (req, res) => {
    const announcement = _.pick(req.body, 'title', 'description');

    Announcement.create(announcement).then(anc => {
      res.json({ success: true, announcement: anc });
    }, (err) => {
      res.status(400).json({ success: false, error: err });
    });
  }));

  return router;
}
