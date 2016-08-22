const Request = require('supertest');
const should = require('should');

const server = require('../api/1novel');
const request = Request(server);

const db = require('../model/connect');
const Novel = require('../model/novel');

/**
 * before run test, you should run mongod first,
 * not mock database, need a real database
 */

describe('novel test', function () {
  // create 10 items in Novel
  // clear for everytime
  beforeEach(function (done) {
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
    })
  });

  describe('/novel', function () {
    it('put should success', function (done) {
      request
        .put('/novel')
        .send({
          title: 'novel title',
          author: 'tobe',
          link: 'http://tobe.com'
        })
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        })
    });

    it('put should fail without title', function (done) {
      request
        .put('/novel')
        .send({
          // title: 'novel title',
          author: 'tobe',
          link: 'http://tobe.com'
        })
        .expect(400)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        })
    });

    it('put should fail without author', function (done) {
      request
        .put('/novel')
        .send({
          title: 'novel title',
          // author: 'tobe',
          link: 'http://tobe.com'
        })
        .expect(400)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        })
    });

    it('put should fail without link', function (done) {
      request
        .put('/novel')
        .send({
          title: 'novel title',
          author: 'tobe',
          // link: 'http://tobe.com'
        })
        .expect(400)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        })
    });

    it('put should fail with nothing', function (done) {
      request
        .put('/novel')
        .send({})
        .expect(400)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        })
    });

  });


  describe('/novel/all', function () {
    it('get should success without query', function (done) {
      request
        .get('/novel/all')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          (res.body.length).should.equal(10);
          done();
        })
    });

    it('get should success with limit', function (done) {
      request
        .get('/novel/all?limit=3')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          (res.body.length).should.equal(3);
          done();
        })
    });

    it('get should success with skip', function (done) {
      request
        .get('/novel/all?skip=8')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          (res.body.length).should.equal(2);
          done();
        })
    });

    it('get should success with limit skip', function (done) {
      request
        .get('/novel/all?limit=2&skip=4')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          (res.body.length).should.equal(2);
          done();
        })
    });

  });

  describe('/novel/id/:id', function () {
    it('get should success', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .get('/novel/id/' + id)
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);
            done();
          })
      })
    });

    it('get should fail with fake id', function (done) {
      request
        .get('/novel/id/' + 'error')
        .expect(400)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        })
    });

    it('get should fail with fake id', function (done) {
      // fake id with [a-z0-9]{24}
      request
        .get('/novel/id/' + '57b3cd0515974ab91a388fdb')
        .expect(404)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        })
    });

  });

  describe('/novel/id/:id/', function () {
    it('get should success', function (done) {
      Novel.find(function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .get('/novel/id/' + id)
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);
            done();
          })
      })
    });

  });

  describe('/novel/id/:id/title', function () {
    it('post should success', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .post('/novel/id/' + id + '/title')
          .send({
            title: 'new title'
          })
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);
            done();
          })
      })
    });

    it('post should fail without title', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .post('/novel/id/' + id + '/title')
          .send({})
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);
            done();
          })
      })
    });


  });

  describe('/movel/id/:id/author', function () {
    it('post should success', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .post('/novel/id/' + id + '/author')
          .send({
            author: 'new author'
          })
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);
            done();
          })
      })
    });

    it('post should fail without author', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .post('/novel/id/' + id + '/author')
          .send({})
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);
            done();
          })
      })
    });

  });

  describe('/novel/id/:id/body', function () {
    it('put should success', function (done) {
      Novel.find({}, function (err, documents) {
        should.not.exist(err);
        let id = documents[0]._id;

        request
          .put('/novel/id/' + id + '/body')
          .send({
            bodyid: id // only test, should be chapter id, not novel id
          })
          .expect(200)
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
          .put('/novel/id/' + id + '/body')
          .send({})
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);
            done();
          })
      })
    });

  });

});

