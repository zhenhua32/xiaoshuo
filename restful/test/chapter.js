const Request = require('supertest');
const should = require('should');

const server = require('../api/2chapter');
const request = Request(server);

const db = require('../model/connect');
const Novel = require('../model/novel');
const ChapterSchema = require('../model/chapterschema');
const mongoose = require('mongoose');

describe('chapter test', function () {
  // create 10 items in collection Novel
  before(function (done) {
    Novel.remove({}, function (err) {
      if (err) console.log(err);

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
  });
  // clear first Novel and its Chapter
  // create 10 items in 
  beforeEach(function (done) {
    Novel.find({}, function (err, documents) {
      if (err) console.log(err);
      let id = documents[0]._id;
      id = String(id);
      let Chapter = mongoose.model('Chapter', ChapterSchema, id);

      Chapter.remove({}, function (err) {
        if (err) console.log(err);

        for (let i = 0; i < 10; i++) {
          let param = {
            index: i,
            title: 'title ' + i,
            body: 'hello world ' + i,
            novel: id
          }
          let chapter = new Chapter(param);
          chapter.save(function (err, document) {
            if (err) console.log(err);
            if (i == 9) done();
          })
        }
      })
    })
  });

  describe('/chapter', function () {
    it('put should success', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .put('/chapter')
          .send({
            index: 1,
            title: 'this is test',
            body: 'hello world',
            novel: id
          })
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);
            (res.body.msg).should.equal('ok');
            done();
          })
      })
    });

    it('put should fail without index', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .put('/chapter')
          .send({
            // index: 1,
            title: 'this is test',
            body: 'hello world',
            novel: id
          })
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);
            done();
          })
      })
    });

    it('put should fail without title', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .put('/chapter')
          .send({
            index: 1,
            // title: 'this is test',
            body: 'hello world',
            novel: id
          })
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);
            done();
          })
      })
    });

    it('put should fail without body', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .put('/chapter')
          .send({
            index: 1,
            title: 'this is test',
            // body: 'hello world',
            novel: id
          })
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);
            done();
          })
      })
    });

    it('put should fail without novel', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .put('/chapter')
          .send({
            index: 1,
            title: 'this is test',
            body: 'hello world',
            // novel: id
          })
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);
            done();
          })
      })
    });

  });

  describe('/chapter/all', function (done) {
    it('get should success', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .get('/chapter/all?novelid=' + id)
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);
            (res.body.length).should.equal(10);
            done();
          })
      })
    });

    it('get should success with limit', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .get('/chapter/all?novelid=' + id + '&limit=5')
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);
            (res.body.length).should.equal(5);
            done();
          })
      })
    });

    it('get should success with skip', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .get('/chapter/all?novelid=' + id + '&skip=4')
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);
            (res.body.length).should.equal(6);
            done();
          })
      })
    });

    it('get should fail without novelid', function (done) {
      request
        .get('/chapter/all')
        .expect(400)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        })
    });

  });

});
