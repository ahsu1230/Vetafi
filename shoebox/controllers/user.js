/*
  This endpoint servers creates a new user.
  Return 200 (OK) if user successfully created
  Return 400 (BAD_REQUEST) if user already exists or request is invalid
*/
var User = require('./../models/user');

module.exports = function (app) {
  app.post('/user/create', function (req, res) {
    console.log('[createUser] request received for ' + JSON.stringify(req.body));
    console.log('[createUser] creating user...');
    var user = {
      firstname: req.body.firstname,
      middlename: req.body.middlename || null,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      admin: false,
      userState: User.State.ACTIVE
    };

    var callbacks = {
      onError: function(error) {
        console.log('[createUser] Error creating user... ' + error);
      },
      onSuccess: function(user) {
        console.log('[createUser] Done. User created ' + user.externalId);
      }
    }
    User.quickCreate(user, callbacks);

    res.sendStatus(200);
  });
};
