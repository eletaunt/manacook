import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import UserController from './controllers/UsersController';

// creates and configures Express web serverclass
class App {
  // ref to Express instance
  public express: express.Application;
  private url: string = 'mongodb://localhost:27017/myproject';

  // run configuration methods on Express instance
  constructor() {
    this.setupMongoose();
    this.express = express();
    this.middleware();
    this.routes();
  }

  private setupMongoose(): void {
    mongoose.connect(this.url, (error) => {
      if (error) {
        console.log('Error occurred!');
        console.log(error.message);
        console.log(error);
      } else {
        console.log('successfully connected to MongoDb');
      }
    });
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
    this.express.use('/users', UserController);
  }
}

export default new App().express;
