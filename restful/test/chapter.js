const Request = require('supertest');
const should = require('should');

const server = require('../api/2chapter');
const request = Request(server);

const db = require('../model/connect');
const Novel = require('../model/novel');
const ChapterSchema = require('../model/chapterschema');
const mongoose = require('mongoose');

describe('chapter test', function () {
  // create 10 items in Novel
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
  // create 10 items in first Novel's Chapter
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

  describe('/chapter/count', function () {
    it('get should success', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .get('/chapter/count?novelid=' + id)
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);
            (res.body.count).should.equal(10);
            done();
          })
      })
    });

    it('get should fail without novelid', function (done) {
      request
        .get('/chapter/count')
        .expect(400)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        })
    });

  });

  describe('/chapter/find', function () {
    it('get should success', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .get('/chapter/find?novelid=' + id)
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);
            (res.body.index).should.equal(1);
            done();
          })
      })
    });

    it('get should success with index', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .get('/chapter/find?novelid=' + id + '&index=4')
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);
            (res.body.index).should.equal(4);
            done();
          })
      })
    });

    it('get should fail without novelid', function (done) {
      request
        .get('/chapter/find')
        .expect(400)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        })
    });

  });

  describe('/chapter/findbyid', function () {
    it('get should success', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;
        id = String(id);
        let Chapter = mongoose.model('Chapter', ChapterSchema, id);

        Chapter.find({}, function (err, documents) {
          should.not.exist(err);
          let cid = documents[0]._id;
          cid = String(cid);

          request
            .get('/chapter/findbyid?id=' + cid+'&novelid='+id)
            .expect(200)
            .end(function (err, res) {
              should.not.exist(err);
              (res.body._id).should.equal(cid);
              (res.body.novel).should.equal(id);
              done();
            })
        })
      })
    });

    it('get should fail without novelid', function(done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;
        id = String(id);
        let Chapter = mongoose.model('Chapter', ChapterSchema, id);

        Chapter.find({}, function (err, documents) {
          should.not.exist(err);
          let cid = documents[0]._id;
          cid = String(cid);

          request
            .get('/chapter/findbyid?id=' + cid)
            .expect(400)
            .end(function (err, res) {
              should.not.exist(err);
              done();
            })
        })
      })
    });

    it('get should fail without id', function(done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;
        id = String(id);
        let Chapter = mongoose.model('Chapter', ChapterSchema, id);

        Chapter.find({}, function (err, documents) {
          should.not.exist(err);
          let cid = documents[0]._id;
          cid = String(cid);

          request
            .get('/chapter/findbyid?novelid='+id)
            .expect(400)
            .end(function (err, res) {
              should.not.exist(err);
              done();
            })
        })
      })
    })

  });

  describe('/chapter/id/:id', function() {
    it('get should success', function(done) {
      this.skip();
    })
  })

});
