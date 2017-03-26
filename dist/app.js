"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UsersController_1 = require("./controllers/UsersController");
// creates and configures Express web serverclass
class App {
    // run configuration methods on Express instance
    constructor() {
        this.url = 'mongodb://localhost:27017/myproject';
        this.setupMongoose();
        this.express = express();
        this.middleware();
        this.routes();
    }
    setupMongoose() {
        mongoose.connect(this.url, (error) => {
            if (error) {
                console.log('Error occurred!');
                console.log(error.message);
                console.log(error);
            }
            else {
                console.log('successfully connected to MongoDb');
            }
        });
    }
    // configure Express middleware
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // configure API endpoints
    routes() {
        // will change when more endpoints added
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
        this.express.use('/users', UsersController_1.default);
    }
}
exports.default = new App().express;
