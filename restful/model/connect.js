const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:28210/xs';

const options = {
  server: { poolSize: 10, socketOptions: { keepAlive: 1 } }
}

mongoose.connect(url, options);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;

