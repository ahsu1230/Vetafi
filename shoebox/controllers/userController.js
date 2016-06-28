var lodash = require('lodash');
var UserService = require('./../services/userService');

/*
  This endpoint servers creates a new user.
  Return 200 (OK) if user successfully created
  Return 400 (BAD_REQUEST) if user already exists or request is invalid
*/
module.exports = function (app) {
  app.post('/user/create', function (req, res) {
    console.log('[createUser] request received for ' + JSON.stringify(req.body));
    var user = {
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    };
    var callbacks = {
      onError: function(errorCode, errorMsg) {
        console.log('[createUser] ' + errorCode +
          ' Error creating user: ' + errorMsg);
        res.sendStatus(errorCode, errorMsg);
      },
      onSuccess: function(user) {
        console.log('[createUser] Successfully created user ' + user.externalId);
        res.sendStatus(200);
      }
    };
    UserService.createNewUser(user, callbacks);
  });
};
