let server = require('./0before');
const Novel = rquire('../model/novel');
const errhelper = require('../help/err');
const helper = require('../help/help');

server.put('./novel', function (req, res, next) {
    let params = {
        title: req.params.title,
        author: req.params.auhor
    }
    if (!helper.novelExist(params, res)) return next();

    let novel = new Novel(params);
    novel.save(function (err, document) {
        if (err) errhelper.json500(err, res);
        else res.json({
            msg: 'ok'
        })
    })

});

server.


module.exports = server;

