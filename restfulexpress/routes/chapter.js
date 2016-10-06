const express = require('express');
const router = express.Router();

const Novel = require('../model/novel');
const ChapterSchema = require('../model/chapterschema');
const errhelper = require('../help/err');
const helper = require('../help/help');
const mongoose = require('mongoose');

router.put('/', function (req, res, next) {
  let params = {
    index: req.body.index,
    title: req.body.title,
    body: req.body.body,
    novel: req.body.novel // from novel._id
  }
  if (!helper.chapterExist(params, res)) return;

  let Chapter = mongoose.model('Chapter', ChapterSchema, params.novel);

  let chapter = new Chapter(params);
  chapter.save(function (err, document) {
    if (err) {
      errhelper.json500(err, res);
    }
    else res.json({
      msg: 'ok',
      id: document._id
    })
  })
});

/**
 * 根据小说id, 返回章节列表, 不包括章节的body部分
 * ?novelid=&limit=&skip=
 */
router.get('/all', function (req, res, next) {
  let q = req.query;
  let limit = 50;
  let skip = 0;
  let id = '';
  if (!q.novelid) {
    errhelper.json400(new Error('novel id not exist'), res);
    return;
  } else {
    id = q.novelid;
  }
  if (q.limit) limit = Number(q.limit);
  if (q.skip) skip = Number(q.skip);

  let Chapter = mongoose.model('Chapter', ChapterSchema, id);

  Chapter.find({ novel: id })
    .select('-body')
    .sort('index')
    .skip(skip)
    .limit(limit)
    .exec(function (err, documents) {
      if (err) errhelper.json500(err, res);
      else if (!documents) {
        errhelper.json404(new Error('not find'), res);
      } else {
        res.json(documents);
      }
    });

});
/**
 * 根据小说id, 统计章节数
 * ?novelid=
 */
router.get('/count', function (req, res, next) {
  let q = req.query;
  let id = '';
  if (!q.novelid) {
    errhelper.json400(new Error('novel id not exist'), res);
    return;
  } else {
    id = q.novelid;
  }

  let Chapter = mongoose.model('Chapter', ChapterSchema, id);

  let query = Chapter.count({ novel: id });

  query.exec(function (err, count) {
    if (err) errhelper.json500(err, res);
    else {
      res.json({
        count: count
      })
    }
  })

});
/**
 * 根据小说id和index顺序, 返回章节
 * ?novelid=&index=
 */
router.get('/find', function (req, res, next) {
  let q = req.query;
  let id = '';
  let index = 1;
  if (!q.novelid) {
    errhelper.json400(new Error('novelid not exist'), res);
    return;
  } else {
    id = q.novelid;
  }
  if (q.index) index = Number(q.index);

  let Chapter = mongoose.model('Chapter', ChapterSchema, id);

  Chapter.find({ novel: id, index: index })
    .limit(1)
    .exec(function (err, documents) {
      if (err) errhelper.json500(err, res);
      else if (!documents) {
        errhelper.json404(new Error('not find'), res);
      }
      else {
        res.json(documents[0]);
      }
    });

});
/**
 * 根据章节id和小说id, 返回章节
 * ?id=&novelid=
 */
router.get('/findbyid', function (req, res, next) {
  let q = req.query;
  let id = '';
  let novelid = '';
  if (!q.id) {
    errhelper.json400(new Error('id not exist'), res);
    return;
  } else if (!q.novelid) {
    errhelper.json400(new Error('novelid not exist'), res);
    return;
  } else {
    id = q.id;
    novelid = q.novelid;
  }

  let Chapter = mongoose.model('Chapter', ChapterSchema, novelid);

  Chapter.findById(id, function (err, document) {
    if (err) errhelper.json500(err, res);
    else if (!document) {
      errhelper.json404(new Error('not find'), res);
    }
    else {
      res.json(document);
    }
  });

  next();

});

router.get('/id/:id', function (req, res, next) {

  let Chapter = mongoose.model('Chapter', ChapterSchema, req.params.id);

  Chapter.findById(req.params.id, function (err, document) {
    if (err) errhelper.json500(err, res);
    else {
      if (!document) {
        errhelper.json404(new Error('no such chapter'), res);
      } else {
        res.json(document)
      }
    }
  });
  next();
});

router.post('/id/:id', function (req, res, next) {
  let p = req.params;
  if (!p.index || !p.body || !p.novel) next();

  let Chapter = mongoose.model('Chapter', ChapterSchema, p.id);

  Chapter.findById(p.id, function (err, document) {
    if (err) errhelper.json500(err, res);
    else {
      if (!document) {
        errhelper.json404(new Error('not such chapter'), res);
      } else {
        if (p.index) document.index = p.index;
        if (p.body) document.body = p.body;
        if (p.novel) document.novel = p.novel;
        document.save(function (err) {
          if (err) errhelper.json500(err, res);
          else res.json({
            msg: 'ok'
          })
        })
      }
    }
  });
  next();
});

module.exports = router;
