var lodash = require('lodash');
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
  User.create({
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
  }, function(err, user) {
    if (callbacks || !lodash.isEmpty(err)) {
      if (err) {
        callbacks.onError(err);
      } else {
        callbacks.onSuccess(user);
      }
    }
  });
};

//
// Getters
//
module.exports.getAll = function() {
  return User.find({}, function(error, users) {
    return {
      error : error,
      users: users
    };
  });
};

module.exports.getById = function(userId) {
  var query = { _id : userId };
  User.findOne(query, function(error, users) {
    return {
      error : error,
      users: users
    };
  });
};

module.exports.getByExternalId = function(externalUserId) {
  var query = { externalId : externalUserId };
  User.findOne(query, function(error, users) {
    return {
      error : error,
      users: users
    };
  });
};

//
// Setters
//
function updateWith(obj) {
  return lodash.assign(obj, { updatedAt: Date.now() });
}

module.exports.setName = function(userId, firstName, middleName, lastName) {
  var query = { _id: userId };
  var update = updateWith({
    firstname : firstName,
    middlename: middleName,
    lastname : lastName
  });
  User.update(query, update);
}
module.exports.setEmail = function(userId, email) {
  var query = { _id: userId };
  var update = updateWith({ email: email });
  User.update(query, update);
}
module.exports.setPassword = function(userId, password) {
  var query = { _id: userId };
  var update = updateWith({ password: password });
  User.update(query, update);
}
module.exports.setState = function(userId, state) {
  var query = { _id: userId };
  var update = updateWith({
    state: state,
    stateModifiedAt: Date.now()
  });
  User.update(query, update);
}
module.exports.setAdmin = function(userId, admin) {
  var query = { _id: userId };
  var update = updateWith({ admin: admin });
  User.update(query, update);
}
module.exports.setTest = function(userId, test) {
  var query = { _id: userId };
  var update = updateWith({ test: test });
  User.update(query, update);
}

//
// Deletes
//
module.exports.deleteRowById = function(userId) {
  var query = { _id: userId };
  User.remove(query);
};
