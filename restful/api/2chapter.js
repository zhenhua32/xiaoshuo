let server = require('./1novel');
const Novel = require('../model/novel');
const Chapter = require('../model/chapter');
const errhelper = require('../help/err');
const helper = require('../help/help');

server.put('/chapter', function (req, res, next) {
    let params = {
        index: req.params.index,
        title: req.params.title,
        body: req.params.body,
        novel: req.params.novel
    }
    if (!helper.chapterExist(params, res)) return next();

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
    return next();
});
/**
 * ?novelid=&limit=&skip=
 */
server.get('/chapter/all', function (req, res, next) {
    let q = req.query;
    let limit = 50;
    let skip = 0;
    let id = '';
    if (!q.novelid) {
        errhelper.json400(new Error('novel id not exist'), res);
    } else {
        id = q.novelid;
    }
    if (q.limit) limit = Number(q.limit);
    if (q.skip) skip = Number(q.skip);

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

    return next();

})
/**
 * ?novelid=
 */
server.get('chapter/count', function (req, res, next) {
    let q = req.query;
    let id = q.novelid ? q.novelid : '';

    let query = id? Chapter.count({novel:id}): Chapter.count({});

    query.exec(function(err, count) {
        if(err) errhelper.json500(err, res);
        else {
            res.json({
                count: count
            })
        }
    })

    return next();
})

server.get('/chapter/find', function (req, res, next) {
    let q = req.query;
    let novelid = '';
    let index = 1;
    if (!q.novelid) {
        errhelper.json400(new Error('novelid not exist'), res);
    } else {
        novelid = q.novelid;
    }
    if (q.index) index = Number(q.index);

    Chapter.find({ novel: novelid, index: index })
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

    return next();
})

server.get('/chapter/id/:id', function (req, res, next) {
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
    return next();
});

server.post('/chapter/id/:id', function (req, res, next) {
    let p = req.params;
    if (!p.index || !p.body || !p.novel) return next();

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
    return next();
});


module.exports = server;

