const e = require('./err');
let helper = {
    novelExist: nE,
    chapterExist: cE
};

function nE(params, res) {
    let exist = true;
    if (!params.title) {
        e.json400(new Error('title not exist'), res);
        exist = false;
    }
    if (!params.author) {
        e.json400(new Error('author not exist'), res);
        exist = false;
    }

    return exist;
}

function cE(params, res) {
    let exist = true;
        // 注意 index 要从1开始, 因为 !0 是true
    if(!params.index) {
        e.json400(new Error('index not exist'), res);
        exist = false;
    }
    if(!params.body) {
        e.json400(new Error('body not exist'), res);
        exist = false;
    }
    if(!params.novel) {
        e.json400(new Error('novel id not exist'), res);
        exist = false;
    }

    return exist;
}

module.exports = helper;