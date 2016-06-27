import { Router } from 'express';
import { News } from '../models';
import { pick } from 'lodash';

import config from '../config';

export function getRouter(parser) {
  const router = Router();

  router.get('/news', (req, res) => {
    News.findAll().then(newsList => {
      res.json({ newsList });
    }, () => {
      res.status(500).send();
    });
  });

  router.post('/news', parser.single('image'), (req, res) => {
    const props = pick(req.body, 'title', 'description', 'link');

    if (req.file && req.file.fieldname === 'image') {
      props.fileUrl = getFileUrl(req.file);
    }

    News.create(props).then(news => {
      res.json({ success: true, news });
    }, (err) => {
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
