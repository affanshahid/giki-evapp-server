import { Router } from 'express';
import { Module } from '../models';

export function getRouter(parser) {
  const router = Router();

  router.get('/module', (req, res) => {
    Module.findAll().then(modules => {
      res.json({ modules });
    }, () => {
      res.status(500).send();
    });
  });

  return router;
}
