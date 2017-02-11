import { Router } from 'express';
import { Module, sequelize } from '../models';
import { pick } from 'lodash';

import config from '../config';

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

    if (epochRegex.test(props.startTime)) props.startTime = parseInt(props.startTime);
    if (epochRegex.test(props.endTime)) props.endTime = parseInt(props.endTime);

    if (req.file && req.file.fieldname === 'image') {
      props.fileUrl = getFileUrl(req.file);
    }
    Module.create(props).then(mod => {
      res.json({ success: true, module: mod });
    }, (err) => {
      res.status(400).json({ error: err, success: false });
    });
  });

  router.put('/module/:id', parser.single('image'), (req, res) => {
    const props = pick(req.body, [
      'title',
      'description',
      'link',
      'category',
      'startTime',
      'endTime',
      'locTag'
    ]);

    if (epochRegex.test(props.startTime)) props.startTime = parseInt(props.startTime);
    if (epochRegex.test(props.endTime)) props.endTime = parseInt(props.endTime);
    const id = req.params.id;

    if (req.file && req.file.fieldname === 'image') {
      props.fileUrl = getFileUrl(req.file);
    }

    sequelize.transaction(transaction => {
      return Module.findById(id, {transaction}).then(module => {
        Object.assign(module, props);
        return module.save({transaction})
      })
    }).then(module => {
      res.json({ success: true, module });
    }).catch(err => {
      res.status(400).json({ success: false, error: err });
    });
  });

  router.delete('/module/:id', (req, res) => {
    const id = req.params.id;
    Module.destroy({where: { id }}).then(numDestroyed => {
      res.status(204).send();
    }).catch(err => {
      res.status(400).json({ success: false, error: err });
    });
  });


  return router;
}

/*
 * In production mode the 'fileUrl' can be directly used to fetch files,
 * In development and testing the Image end-point must be prepended manually
 */
function getFileUrl(file) {
  let fileUrl;
  if (config.env === 'production') {
    fileUrl = file.url;
  } else {
    fileUrl = file.filename;
  }
  return fileUrl;
}
