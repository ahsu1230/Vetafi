var _ = require('lodash');

function AuthService (app) {
    this.app = app;
};

module.exports = AuthService;
module.exports.isPasswordCorrect = function (expectedPwd, candidatePwd, callback) {
  console.log('[AuthService] compare passwords: ' + expectedPwd + ' vs. ' + candidatePwd);
  if (_.isEqual(expectedPwd, candidatePwd)) {
    callback(null, true);
  } else {
    callback('Passwords do not match');
  }
};
