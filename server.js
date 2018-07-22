'use strict';

// 2. Here we require the app. This is the actual app object
//    we created in app.js. We then choose a port for the app
//    to listen on and run the server with app.listen()

var app = require('./app'); // Proper path is required here
var port = process.env.port || 5600;

var server = app.listen(port, function(){
    console.log('////////////////////////////');
    console.log('//   Restful API Design   //');
    console.log('//      with NodeJS       //');
    console.log('////////////////////////////');

    console.log(':: Server listening on port ' + port);
});