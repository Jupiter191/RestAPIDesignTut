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
    
    // 8.  NOTE: When creating Postman tests with a body, you must check
    //     "x-www-form-urlencoded" instead of "form-data", otherwise it
    //     will not work.
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
            response
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
            response
            .status(500)
            .send("There was a problem getting all users from the database");
        } else {
            response
            .status(200)
            .send(users);
        }
    });
});


// 9. Here we create a route to GET a specific user from our DB. The ":" syntax
//    is used to specify arguments.
router.get('/:id', function(request, response){

    // 9.1 This function finds a single user by their ID with the findById() function.
    //     As mentioned earlier, find() can take an empty object or an object
    //     with certain parameters that may match an entry in the DB. This could
    //     also be used to get the same result, like "User.find({ _id: request.params.id }"
    User.findById(request.params.id, function(err, user){

        if(err){
            response
            .status(500)
            .send("The server was unable to find the specified user");
        } else {
            response
            .status(200)
            .send(user);
        }
    });
});


// 10. This route deletes the specified user by ID.
router.delete('/:id', function(request, response){

    User.findByIdAndRemove(request.params.id, function(err, user){

        if(err){
            response
            .status(500)
            .send("The server was unable to delete the specified user");
        } else {
            response
            .status(200)
            .send("User '" + user.name + "' was deleted.");
        }

    });
});


// 11. This route updates the specified user by ID. This function also takes
//     a body parameter. The only HTTP methods that have a body are POST and PUT.
router.put('/:id', function(request, response){

    // 11.1 The findByIdAndUpdate() function takes three arguments. An ID, an object
    //      corresponding to the user whose value(s) will be updated, and a callback.
    //      The "{new: true}" argument specifies that you want the updated version of
    //      the object returned to the caller, not the original version.
    User.findByIdAndUpdate(request.params.id,
                           request.body,
                           {new: true},
                           function(err, user){

        if(err){
            response
            .status(500)
            .send("The server was unable to delete the specified user");
        } else {
            response
            .status(200)
            .send("User '" + user.name + "' was updated:\n" + user);
        }

    });
});


module.exports = router;