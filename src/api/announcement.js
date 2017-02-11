import { Router } from 'express';
import { Announcement, sequelize } from '../models';
import { pick } from 'lodash';

export function getRouter(multer) {
  const router = Router();

  router.get('/announcement', (req, res) => {
    Announcement.findAll().then(announcements => {
      res.json({ announcements });
    }, () => {
      res.status(500).send();
    });
  });

  router.post('/announcement', multer.single(), (req, res) => {
    const props = pick(req.body, 'title', 'description');
    Announcement.create(props).then(anc => {
      res.json({ success: true, announcement: anc });
    }, (err) => {
      res.status(400).json({ success: false, error: err });
    });
  });

  router.put('/announcement/:id', multer.single(), (req, res) => {
    const props = pick(req.body, 'title', 'description');
    const id = req.params.id;

    sequelize.transaction(transaction => {
      return Announcement.findById(id, {transaction}).then(announcement => {
        Object.assign(announcement, props);
        return announcement.save({transaction})
      })
    }).then(announcement => {
      res.json({ success: true, announcement });
    }).catch(err => {
      res.status(400).json({ success: false, error: err });
    });
  });

  router.delete('/announcement/:id', (req, res) => {
    const id = req.params.id;
    Announcement.destroy({where: { id }}).then(numDestroyed => {
      res.status(204).send();
    }).catch(err => {
      res.status(400).json({ success: false, error: err });
    });
  });



  return router;
}
