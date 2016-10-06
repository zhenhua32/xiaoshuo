const express = require('express');
const router = express.Router();

const Novel = require('../model/novel');
const errhelper = require('../help/err');
const helper = require('../help/help');

/**
 * /novel/
 * 修改 req.params 为 req.body 来获取键值对
 * 使用 req.params 获取类似 :id 的参数
 * 删除 return next();
 * 不要过早调用 next(), 尤其是 res.json() 未完成的时候
 */

// use req.body for express, req.params for restify
router.put('/', function (req, res, next) {
  let params = {
    title: req.body.title,
    author: req.body.author,
    link: req.body.link
  }
  if (!helper.novelExist(params, res)) {
    return;
  }

  let novel = new Novel(params);
  novel.save(function (err, document) {
    if (err) errhelper.json500(err, res);
    else res.json({
      msg: 'ok',
      id: document._id
    })
  });

});
/**
 * ?limit=&skip=
 */
router.get('/all', function (req, res, next) {
  let q = req.query;
  let limit = 50;
  let skip = 0;
  if (q.limit) limit = Number(q.limit);
  if (q.skip) skip = Number(q.skip);

  Novel.find({})
    .sort('createdAt')
    .skip(skip)
    .limit(limit)
    .exec(function (err, documents) {
      if (err) errhelper.json500(err, res);
      else {
        res.json(documents);
      }
    });

});

/**
 * 根据小说id, 返回小说信息
 */
router.get('/id/:id', function (req, res, next) {
  if (!helper.testId(req.params, res)) return;

  Novel.findById(req.params.id, function (err, document) {
    if (err) errhelper.json500(err, res);
    else {
      if (!document) {
        errhelper.json404(new Error('not such novel'), res);
      } else {
        res.json(document);
      }
    }
  });
});

router.get('/id/:id/', function (req, res, next) {
  res.redirect(301, '/id/:id');
})

router.post('/id/:id/title', function (req, res, next) {
  let p = {
    id: req.params.id,
    title: req.body.title
  };
  if (!p.title) {
    errhelper.json400(new Error('title not exist'), res);
    return;
  }
  if (!helper.testId(p, res)) return;

  Novel.updateTitle(p, res);
});

router.post('/id/:id/author', function (req, res, next) {
  let p = {
    id: req.params.id,
    author: req.body.author
  };
  if (!p.author) {
    errhelper.json400(new Error('author not exist'), res);
    return;
  }
  if (!helper.testId(p, res)) return;

  Novel.updateAuthor(p, res);
});
/**
 * 给小说增加章节
 * put 代表增加, 表示push, 添加 chapter 的 id
 */
router.put('/id/:id/body', function (req, res, next) {
  let p = {
    id: req.params.id,
    bodyid: req.body.bodyid
  };
  if (!p.bodyid) {
    errhelper.json400(new Error('bodyid not exist'), res);
    return;
  }
  if (!helper.testId(p, res)) return;

  Novel.pushBody(p, res);
});

module.exports = router;
