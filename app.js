'use strict';

// 1. This file will be used for configuring the app. All logic goes
//    in it's own directory separated by function. "module.exports"
//    makes this app visible to the rest of the program when
//    called with require();
var express = require('express');
var app = express();
var dbConnection = require('./db'); // 3.1 Handles the database connection

// 7. These two lines give the app access to the UserController (and the User
//    schema, through UserController.js), then add UserController as middleware
//    for the '/users' route.
//    Now, the '/' in UserController maps to '/users/'.
var UserController = require('./user/UserController');
app.use('/users', UserController);

module.exports = app;