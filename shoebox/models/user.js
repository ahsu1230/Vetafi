'use strict';
var uuid = require('uuid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: String,                                // First name
  middlename: String,                               // Middle name
  lastname: String,                                 // Last name
  email: String,                                    // Email address
  password: String,                                 // Encrypted password
  externalId: String,                               // External Unique Id for user (UUID)
  createdAt: Date,       // Date of row creation
  updatedAt: Date,       // Date of last row modification
  state: Number,                                    // User.State
  stateUpdatedAt: Date,  // Date of last state modification
  admin: Boolean,                                   // Is user an admin?
  test: Boolean                                     // Is user a test account?
});

var State = {
  ACTIVE: 0,
  INACTIVE: 1
};

var User = mongoose.model('User', userSchema);
module.exports = User;
module.exports.State = State;

//
// Inserts
//
module.exports.quickCreate = function(user, callbacks) {
  var now = Date.now();
  return User.create({
    firstname: user.firstname,
    middlename: user.middlename || null,
    lastname: user.lastname,
    email: user.email,
    password: user.password,
    externalId: uuid.v4(),
    createdAt: now,
    updatedAt: now,
    state: User.State.ACTIVE,
    stateUpdatedAt: now,
    admin: user.admin,
    test: false
  });
};
