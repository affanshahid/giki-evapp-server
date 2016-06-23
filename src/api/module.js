import { Router } from 'express';
import { Module } from '../models';
import { pick } from 'lodash';

export function getRouter(parser) {
  const router = Router();

  router.get('/module', (req, res) => {
    Module.findAll().then(modules => {
      res.json({ modules });
    }, () => {
      res.status(500).send();
    });
  });

  const epochRegex = /^\d+$/;

  router.post('/module', parser.single('image'), (req, res) => {
    const props = pick(req.body, [
      'title',
      'description',
      'link',
      'category',
      'startTime',
      'endTime',
      'locTag'
    ]);

    if(epochRegex.test(props.startTime)) props.startTime = parseInt(props.startTime);
    if(epochRegex.test(props.endTime)) props.endTime = parseInt(props.endTime);

    if (req.file && req.file.fieldname === 'image') {
      props.fileId = req.file.filename;
    }
    Module.create(props).then(mod => {
      res.json({ success: true, module: mod });
    }, (err) => {
      res.status(400).json({ error: err, success: false });
    });
  });

  return router;
}
