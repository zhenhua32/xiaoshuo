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
 * 估计要复制粘帖好多, 所以我把内容拆到model定义文件中了
 * 造了几个静态方法, 虽然我看不出有什么需要重复使用的地方
 * 主要是错误处理太烦了, 把核心代码都淹没了
 * 不过我这边也真逗, 有了个:id, 还不如直接写到data中呢
 */
server.post('/novel/:id/title', function (req, res, next) {
    let p = req.params;
    if (!p.title) return next();

    Novel.updateTitle(p, res);

    return next();
});

server.post('/novel/:id/author', function(req, res, next) {
    let p = req.params;
    if(!p.author) return next();

    Novel.updateAuthor(p, res);

    return next();
});
/**
 * put 代表增加, 表示push, 添加 chapter 的 id
 */
server.put('/novel/:id/body', function(req, res, next) {
    let p = req.params;
    if(!p.bodyid) return next();

    Novel.pushBody(p, res);

    return  next();
});



module.exports = server;

