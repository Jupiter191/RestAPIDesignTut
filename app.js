'use strict';

// 1. This file will be used for configuring the app. All logic goes
//    in it's own directory separated by function. "module.exports"
//    makes this app visible to the rest of the program when
//    called with require();
var express = require('express');
var app = express();
var dbConnection = require('./db'); // 3.1 Handles the database connection

module.exports = app;