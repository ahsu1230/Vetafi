/*
  This endpoint servers to check that the app web server is responding
  to requests as expected.
  Send a GET request to http://hostname:port/healthz
  and you should get a 200 (OK) status.
*/
module.exports = function (server) {
  server.get('/healthz', function (req, res) {
    console.log('health OK!');
    res.sendStatus(200);
  });
};
