import express, { Application } from 'express';
import cors from 'cors';

import { env } from './env';
import router from './router';

class App {
  public server: Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(cors({ origin: env.APP_ORIGIN }));
    this.server.use(express.json());
  }

  private router() {
    this.server.use(router);
  }
}

export default new App().server;
