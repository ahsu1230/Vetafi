var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  admin: Boolean
});

// module.exports = mongoose.model('User', userSchema);
module.exports = function(msg) {
  console.log('user.js test ok' + msg);
};
