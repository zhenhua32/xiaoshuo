const server = require('./api/z');
const db = require('./model/connect');

server.listen(8008, function () {
  console.log(`${server.name} is listening at ${server.url}`);
  if (db) {
    console.log('db is ok')
  } else {
    console.log('db is bad');
  }
});

