const restify = require('restify');
const bunyan = require('bunyan');

let server = restify.createServer({
  name: 'xs-server',
  version: '1.0.0',
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser({
  maxBodySize: 10*1024*1024,  // bytes = 10m
  mapParams: true,
  mapFiles: true,
  overrideParams: true,
  keepExtensions: true,
  multiples: true,
  hash: 'sha1'
}));
server.use(restify.gzipResponse());
server.use(restify.throttle({
  burst: 100,
  rate: 50,
  ip: true,
  overrides: {
    '192.168.1.1': {
      rate: 0,        // unlimited
      burst: 0
    },
    "127.0.0.1": {
      rate: 0,
      burst: 0
    },
    "localhost": {
      rate: 0,
      burst: 0
    }
  }
}));

server.on('after', restify.auditLogger({
  log: bunyan.createLogger({
    name: 'audit',
    level: 'error',
    stream: process.stdout
  })
}));

module.exports = server;





