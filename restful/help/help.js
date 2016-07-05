const errhelper = require('./err');
let helper = {
    novelExist: nE
};

function nE(params, res) {
    let exist = true;
    if (!params.title) {
        errhelper.json400(new Error(), res);
        exist = false;
    }
    if (!params.author) {
        errhelper.json400(new Error(), res);
        exist = false;
    }

    return exist;
}

module.exports = helper;