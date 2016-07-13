let server = require('./0before');
const Novel = require('../model/novel');
const errhelper = require('../help/err');
const helper = require('../help/help');

server.put('/novel', function (req, res, next) {
    let params = {
        title: req.params.title,
        author: req.params.author
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

server.get('/novel/:id', function (req, res, next) {
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
 * 拆分之后虽然烦了点, 但或许细分更简单些, 也更明确
 * 估计要复制粘帖好多
 */
server.post('/novel/:id/title', function (req, res, next) {
    let p = req.params;
    if (!p.title) return next();

    Novel.findById(p.id, function (err, document) {
        if (err) errhelper.json500(err, res);
        else {
            if (!document) {
                errhelper.json404(new Error('not such novel'), res);
            } else {
                document.title = p.title;
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

