import express from 'express';
import api from './api';

import config from './config';
import Loaders from './loaders';
import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  await Loaders({ expressApp: app });

  app.use('/api', api);

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
