"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// Create schema
exports.UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
// Bind schema to model
const User = mongoose.model('User', exports.UserSchema);
exports.default = User;
