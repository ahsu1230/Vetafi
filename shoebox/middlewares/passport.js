var _ = require('underscore');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var AuthService = require('../services/authService');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user.get('id'));
    });

    passport.deserializeUser(function (id, done) {
        app.models.User.findById(id, done);
    });

    function localStrategyHandler (req, email, password, done) {
      console.log('evaluating email ' + email);
      console.log('evaluating password ' + password);
        var normalizedEmail = _.isString(email) ? email.toLowerCase() : email;

        User.findOne({ email: normalizedEmail }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(new Error('User not found'));
            }

            console.log('User found ' + JSON.stringify(user));
            AuthService.isPasswordCorrect(user.get('password'), password, function (err) {
                if (err) {
                    return done(err);
                }
                return done(null, user);
            });
        });
    }

    passport.use('local', new LocalStrategy(
      { usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
      }, localStrategyHandler)
    );
};
