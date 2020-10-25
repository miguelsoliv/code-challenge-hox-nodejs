import express, { Application } from 'express';
import 'express-async-errors';

import createConnection from './database';
import errorHandler from './errors/handler';
import routes from './routes';

class App {
  express: Application;

  constructor() {
    this.express = express();
    this.database();
    this.middlewares();
    this.routes();
  }

  private database = async (): Promise<void> => {
    await createConnection();
  };

  private middlewares = (): void => {
    this.express.use(express.json());
  };

  private routes = (): void => {
    this.express.use(routes);
    this.express.use(errorHandler);
  };
}

export default App;
