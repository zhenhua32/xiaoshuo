const request = require('request');
const cheerio = require('cheerio');
const walk = require('../app/walk.js');
const _69shu = require('../app/69shu.js');
const fs = require('fs');
const async = require('async');

let array = JSON.parse(
  fs.readFileSync('./info/69_3.json', {
    encoding: 'utf8'
  })
).array;

function save(novel, callback) {
  async.eachOfLimit(novel.list, 1, function (list, key, cb) {
    _69shu.saveChapter(list.url, key + 1, novel.id)
      .then(function (result) {
        return cb();
      }, function (reason) {
        console.error(reason);
        return cb();
      })
  }, function (err) {
    if (err) {
      console.error(err);
      return callback();
    } else {
      console.log('finish novel');
      return callback();
    }
  });
}

async.eachLimit(array, 1, save, function (err) {
  if (err) console.error(err);
  else console.log('finish');
});
