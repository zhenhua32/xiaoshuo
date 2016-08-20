const Request = require('supertest');
const should = require('should');

const server = require('../api/2chapter');
const request = Request(server);

const db = require('../model/connect');
const Novel = require('../model/novel');
const chapterSchema = require('../model/chapterschema');

describe('chapter test', function () {
   // create 10 items in collection novel , for test
  beforeEach(function (done) {
    Novel.remove({}, function (err) {
      if (err) console.log(err);

      let nodes = [];
      for (let i = 0; i < 10; i++) {
        let param = {
          title: 'novel ' + i,
          author: 'tobe',
          link: 'http//tobe.com'
        };
        let node = new Novel(param);
        node.save(function (err, document) {
          if (err) console.log(err);
          if (i == 9) done();
        });
      }
    })
  });
  // clear Novel collection
  after(function () {
    Novel.remove({}, function (err) {
      if (err) console.log(err);
    });
  })

});
