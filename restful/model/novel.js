const mongoose = require('mongoose');
const errhelper = require('../help/err');
const helper = require('../help/help');

let Schema = mongoose.Schema;
let options = {
    timestamps: true
};

let novelSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: String,
        trim: true,
        default: 'nobody'
    },
    type: [{
        type: String,
        trim: true
    }],
    body: [{
        type: Schema.Types.ObjectId,
        ref: 'Chapter'
    }]

}, options);

/**
 * params.id && params.title
 */
novelSchema.statics.updateTitle = function (params, res, callback) {
    this.findById(params.id, function (err, document) {
        if (err) errhelper.json500(err, res);
        else {
            if (!document) {
                errhelper.json404(new Error('not such novel'), res);
            } else {
                document.title = params.title;
                document.save(function (err) {
                    if (err) errhelper.json500(err, res);
                    else res.json({
                        msg: 'ok'
                    })
                })
            }
        }
        if (typeof callback == 'function') callback(document);
    })
}
/** 
 * params.id && params.author
 */
novelSchema.statics.updateAuthor = function (params, res, callback) {
    this.findById(params.id, function (err, document) {
        if (err) errhelper.json500(err, res);
        else {
            if (!document) {
                errhelper.json404(new Error('not such novel'), res);
            } else {
                document.author = params.author;
                document.save(function (err) {
                    if (err) errhelper.json500(err, res);
                    else res.json({
                        msg: 'ok'
                    })
                })
            }
        }
        if (typeof callback == 'function') callback(document);
    })
}
/** 
 * params.id && params.bodyid
 */
novelSchema.statics.pushBody = function (params, res, callback) {
    this.findById(params.id, function (err, document) {
        if (err) errhelper.json500(err, res);
        else {
            if (!document) {
                errhelper.json404(new Error('not such novel'), res);
            } else {
                document.body.push(params.bodyid);
                document.save(function (err) {
                    if (err) errhelper.json500(err, res);
                    else res.json({
                        msg: 'ok'
                    })
                })
            }
        }
        if (typeof callback == 'function') callback(document);
    })
}

let Novel = mongoose.model('Novel', novelSchema, 'novel');

module.exports = Novel;

