var lodash = require('lodash');
var UserService = require('./../services/userService');

/*
  This endpoint servers creates a new user.
  Return 200 (OK) if user successfully created
  Return 400 (BAD_REQUEST) if user already exists or request is invalid
*/
module.exports = function (app) {

  app.get('/user', function (req, res) {
    console.log('[getUser] request received ');
    res.sendStatus(200);
  });

  app.get('/user/modify', function (req, res) {
    console.log('[userModify] request received for ' + JSON.stringify(req.body));
    res.sendStatus(200);
  });
};
