let server = require('../config');

// for CORS
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");

  res.header('Cache-Control', 'max-age=604800');

  return next();
});

module.exports = server;

