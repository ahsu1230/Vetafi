var lodash = require('lodash');
var redis   = require('redis');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var passport = require('passport');
var User = require('./../models/user');
var UserService = require('./../services/userService');

module.exports = function (app) {
  app.post('/auth/signup', function(req, res) {
    console.log('[authSignUp] request received for ' + JSON.stringify(req.body));
    var user = {
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    };
    var callbacks = {
      onError: function(errorCode, errorMsg) {
        console.log('[authSignUp] ' + errorCode +
          ' Error creating user: ' + errorMsg);
        res.sendStatus(errorCode, errorMsg);
      },
      onSuccess: function(user) {
        console.log('[authSignUp] Successfully created user ' + user.externalId);
        res.sendStatus(200);
      }
    };
    UserService.createNewUser(user, callbacks);
  });

  app.post('/auth/login', passport.authenticate('local'), function(req, res) {
    console.log('[authLogIn] request received for ' + JSON.stringify(req.body));
    console.log('[authLogIn] request session: ' + JSON.stringify(req.session));
    console.log('[authLogIn] request user: ' + JSON.stringify(req.user));
    req.session.key = req.body.email;
    console.log('[authLogIn] session key saved for ' + req.body.email);
    res.end('done');
  });

  app.get('/auth/logout', function(req, res) {
    console.log('[authLogOut] log out for ' + JSON.stringify(req.session));
    req.session.destroy(function (err) {
        if(err){
            console.log(err);
            res.end('done');
        } else {
            res.redirect('/');
        }
    });
  });


  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/profile',
      failureRedirect : '/'
    })
  );

  app.post('/auth/facebook/disconnect', function(req, res) {
    console.log('[socialUserDisconnect] request received for ' + JSON.stringify(req.body));
    var extUserId = req.body.userId;
    console.log('[socialUserDisconnect] User ' + extUserId + ' disconnected from facebook.');
    res.sendStatus(200);
  });
};
