"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let url = 'mongodb://localhost:27017/myproject';
mongoose.connect(url, (error) => {
    if (error) {
        console.log('Error occurred!');
        console.log(error.message);
        console.log(error);
    }
    else {
        console.log('successfully connected to MongoDb');
    }
});
