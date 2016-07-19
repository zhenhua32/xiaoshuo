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

server.get('/chapter/:id', function (req, res, next) {
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

server.post('/chapter/:id', function (req, res, next) {
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

