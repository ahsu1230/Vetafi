/* A controller */
module.exports = function (app) {
  app.get('/healthz', function (req, res) {
    console.log('health OK!');
  });
};
