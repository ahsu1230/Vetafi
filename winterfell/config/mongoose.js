var mongoose = require('mongoose');

module.exports = function(environment) {
  var address = '0.0.0.0:27017'; // default
  if (environment == 'production') {
      address = 'something-else-in-production';
  }
  mongoose.connect('mongodb://' + address + '/vets');

  var db = mongoose.connection;
  db.on('error', function (err) {
      console.log('Error connecting to database ', err);
  });
  db.on('open', function () {
      console.log('Database connection opened at ' + address);
  });
  db.on('disconnected', function (err) {
      console.log('Database disconnected.');
  });
};
