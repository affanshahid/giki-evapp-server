import express from 'express';
import config from './config';
import { sequelize } from './models';
import api from './api';

export function startServer() {
  const app = express();
  const PORT = config.port;

  app.use('/api/v1', api);
  app.use(express.static('./client/dist'));
  sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  });
}
