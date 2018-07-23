'use strict';

// 3. This file will hold the database connection for our MongoDB database.
var mongoose = require('mongoose'); 
mongoose.connect('mongodb://<username>:<password>@<host:port>/<database>');
