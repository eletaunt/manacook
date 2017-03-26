"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const user_1 = require("./user");
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.post('/', (req, res) => {
    user_1.default.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, function (err, user) {
        if (err) {
            return res.status(500).send("Error creating User");
        }
        else {
            res.status(200).send(user);
        }
    });
});
router.get('/', (req, res) => {
    user_1.default.find({}, function (err, users) {
        if (err) {
            return res.status(500).send("Error finding Users");
        }
        else {
            res.status(200).send(users);
        }
    });
});
exports.default = router;
