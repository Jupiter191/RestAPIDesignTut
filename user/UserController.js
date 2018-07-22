'use strict';

// 5. Here we create the routes our application will use to
//    access Users.
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// 5.1 bodyParser.urlencoded() returns middleware that only accepts UTF-8
//     encoded bodies and only looks at requests that match the type option
//     if one is specified.
//     "extended : true" specifies that the values of the body object can be
//     of any type instead of just strings or arrays.
router.use(bodyParser.urlencoded({ extended : true }));

// 5.2 bodyParser.json() returns a function that is passed to the router.
//     the use() function in express specifies middleware. Since no path is
//     specified, this middleware applies to all routes.
router.use(bodyParser.json());

var User = require('./User');


// 6. The router has a post method that takes a path and a function.
//    The function will be ran on the specified route. It takes a request
//    and response object.
router.post('/', function(request, response){

    // 6.1 The create function of the User model is used to insert values
    //     into the MongoDB database. It is given the parameters we specified
    //     in our schema earlier.
    User.create({
        name     : request.body.name,
        email    : request.body.email,
        password : request.body.password

    }, function(err, user){
        
        // 6.2 The second parameter of the create function is another function
        //     that takes an error and a success value (the user that was added
        //     in this case). We handle these errors with the appropriate status
        //     codes and messages from the server.
        if(err){
            return response
            .status(500)
            .send("There was a problem adding the user information to the database");
        } else {
            response
            .status(200)
            .send(user);
        }
    });
});


// 6.3 As with the code above, this code specifies a function to be used when a user
//     tries to GET the specified route. It should return all users in the database.
router.get('/', function(request, response){

    User.find({}, function(err, users){

        // 6.4 The find() function takes two arguments. An object which defines the
        //     requirements an entry in the database must meet (since it is empty here
        //     all users will be returned).
        //     The second is a function that takes the error and success values and
        //     responds accordingly as before.
        if(err){
            return response
            .status(500)
            .send("There was a problem getting all users from the database");
        } else {
            response
            .status(200)
            .send(users);
        }
    });
});

module.exports = router;