import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

// creates and configures Express web serverclass
class App {
  // ref to Express instance
  public express: express.Application;

  // run configuration methods on Express instance
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // configure Express middleware
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // configure API endpoints
  private routes(): void {
    // will change when more endpoints added
    let router = express.Router();

    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });

    this.express.use('/', router);
  }
}

export default new App().express;
