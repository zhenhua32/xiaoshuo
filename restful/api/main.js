let server = require('../config');

// for CORS
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");

  return next();
});

server.get('/', function(req, res, next) {
    res.send('hello');
    next();
})

module.exports = server;

