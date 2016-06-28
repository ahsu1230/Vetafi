var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    return app;
};
