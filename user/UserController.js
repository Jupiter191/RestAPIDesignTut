'use strict';

// 5. Here we create the routes our application will use to
//    access Users.
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended : true }));
router.use(bodyParser.json());

var User = require('./User');

module.exports = router;