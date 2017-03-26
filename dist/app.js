"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
// creates and configures Express web serverclass
class App {
    // run configuration methods on Express instance
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
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
                message: 'Hello world!'
            });
        });
        this.express.use('/', router);
    }
}
exports.default = new App().express;
