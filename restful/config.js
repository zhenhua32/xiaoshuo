const restify = require('restify');

let server = restify.createServer({
  name: 'img-server',
  version: '1.0.0',
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser({
  maxBodySize: 0,
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



module.exports = server;





