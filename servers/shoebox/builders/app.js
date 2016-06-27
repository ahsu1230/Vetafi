var express = require('express');

var environment = process.env.NODE_ENV || 'local';
var app = express();
app.environment = environment;

function loadIntoApp (app, path) {
  var normalizedPath = require('path').join(__dirname, '../' + path);
  require('fs').readdirSync(normalizedPath).forEach(function (file) {
    require('../' + path + '/' + file)(app);
  });
  return app;
}
loadIntoApp(app, 'middlewares');
loadIntoApp(app, 'controllers');
loadIntoApp(app, 'commanders');

var port = 3999;
app.listen(process.env.PORT || port);
console.log("Listening on port " + port);
