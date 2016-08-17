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
  // create 10 items in collection novel , for test
  beforeEach(function () {
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
        node.save(function (err, documnet) {
          if (err) console.log(err);
          if (i == 10) {
            Novel.count(function (err, count) {
              if (err) console.log(err);
            })
          }
        });
      }
    })
  });
  // clear database
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
    })

  });

  describe('/novel/id/:id', function () {
    it('get should success', function (done) {
      request
        .get('/novel/all')
        .end(function (err, res) {
          should.not.exist(err);
          let id = res.body[0]._id;

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
      request
        .get('/novel/id/' + 'err')
        .expect(302)
        .end(function (err, res) {
          should.not.exist(err);
          done();
        })
    })

  })

});

