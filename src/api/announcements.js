import { Router } from 'express';

export default function (wagner) {
  const router = Router();

  router.get('/announcement', wagner.invoke(Announcement => (req, res) => {
    Announcement.findAll().then(announcements => {
      res.json({announcements});
    }, () => {
      res.status(500).send();
    });
  }));

  return router;
}
