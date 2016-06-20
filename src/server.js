import express from 'express';


export function startServer(wagner) {

  wagner.invoke((config, sequelize, apiRouter) => {
    const app = express();
    const PORT = config.port;

    app.use('/api/v1', apiRouter);

    sequelize.sync({ force: true }).then(() => {
      app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`);
      });
    });
  });

}
