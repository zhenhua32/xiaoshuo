let server = require('./0before');
const Novel = require('../model/novel');
const errhelper = require('../help/err');
const helper = require('../help/help');

server.put('/novel', function (req, res, next) {
    console.log(req.params);
    console.log(req.query)
    console.log(req.body)
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



module.exports = server;

