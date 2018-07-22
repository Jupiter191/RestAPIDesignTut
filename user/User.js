'use strict';

// 4. This file contains the schema for the user DB object we need.
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

mongoose.model('User', UserSchema); // 4.1 Here, we bind the schema to
                                    //     a model called 'User'.

module.exports = mongoose.model('User'); // 4.2 Get the specific model