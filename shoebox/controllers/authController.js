var lodash = require('lodash');
var redis   = require('redis');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var passport = require('passport');
var User = require('./../models/user');
var UserService = require('./../services/userService');

module.exports = function (app) {
  app.get('/signup', function(req, res) {
    console.log('[signup] request received for ' + JSON.stringify(req.body));
    console.log('[signup] session for ' + JSON.stringify(req.session));
    if (req.session.key) {
      res.redirect('/');
    } else {
      res.sendFile('signup.html', {root: './webapp/build/templates'});
    }
  });

  app.get('/login', function(req, res) {
    console.log('[login] request received for ' + JSON.stringify(req.body));
    console.log('[login] session for ' + JSON.stringify(req.session));
    if (req.session.key) {
      res.redirect('/');
    } else {
      res.sendFile('login.html', {root: './webapp/build/templates'});
    }
  });

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
    if (req.user) {
      req.session.key = req.body.email;
      var extUser = User.externalize(req.user);
      res.status(200).send({user: extUser, redirect: '/'});
    } else {
      res.status(403);
    }
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

};
