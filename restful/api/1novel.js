let server = require('./0before');
const Novel = require('../model/novel');
const errhelper = require('../help/err');
const helper = require('../help/help');

server.put('/novel', function (req, res, next) {
  let params = {
    title: req.params.title,
    author: req.params.author,
    link: req.params.link
  }
  if (!helper.novelExist(params, res)) return next();

  let novel = new Novel(params);
  novel.save(function (err, document) {
    if (err) errhelper.json500(err, res);
    else res.json({
      msg: 'ok',
      id: document._id
    })
  });
  return next();
});
/**
 * ?limit=&skip=
 */
server.get('/novel/all', function (req, res, next) {
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

  return next();
});

/**
 * 根据小说id, 返回小说信息
 */
server.get('/novel/id/:id', function (req, res, next) {
  if (!helper.testId(req.params, res)) return next();

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
  return next();
});

/**
 * 301永远重定向, 重定向到 /novel/id/:id
 */
server.get('/novel/id/:id/', function (req, res, next) {
  res.redirect(301, '/nove/id/:id', next);
})

/**
 * 拆分之后虽然烦了点, 但或许细分更简单些, 也更明确
 * 估计要复制粘帖好多, 所以我把内容拆到model定义文件中了
 * 造了几个静态方法, 虽然我看不出有什么需要重复使用的地方
 * 主要是错误处理太烦了, 把核心代码都淹没了
 * 不过我这边也真逗, 有了个:id, 还不如直接写到data中呢
 */
server.post('/novel/id/:id/title', function (req, res, next) {
  let p = req.params;
  if (!p.title) {
    errhelper.json400(new Error('title not exist'), res);
    return next();
  }
  if (!helper.testId(p, res)) return next();

  Novel.updateTitle(p, res);

  return next();
});

server.post('/novel/id/:id/author', function (req, res, next) {
  let p = req.params;
  if (!p.author) {
    errhelper.json400(new Error('author not exist'), res);
    return next();
  }
  if (!helper.testId(p, res)) return next();

  Novel.updateAuthor(p, res);

  return next();
});
/**
 * put 代表增加, 表示push, 添加 chapter 的 id
 */
server.put('/novel/id/:id/body', function (req, res, next) {
  let p = req.params;
  if (!p.bodyid) {
    errhelper.json400(new Error('bodyid not exist'), res);
    return next();
  }
  if (!helper.testId(p, res)) return next();

  Novel.pushBody(p, res);

  return next();
});



module.exports = server;

