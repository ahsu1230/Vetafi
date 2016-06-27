var express = require('express');

var environment = process.env.NODE_ENV || 'local';
var server = express();
server.environment = environment;

function loadIntoBuild (server, path) {
  var normalizedPath = require('path').join(__dirname, '../' + path);
  require('fs').readdirSync(normalizedPath).forEach(function (file) {
    require('../' + path + '/' + file)(server);
  });
  return server;
}
loadIntoBuild(server, 'middlewares');
loadIntoBuild(server, 'controllers');
loadIntoBuild(server, 'commanders');

var port = 3999;
server.listen(process.env.PORT || port);
console.log("Listening on port " + port);
