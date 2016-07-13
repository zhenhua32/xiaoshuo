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

novelSchema.statics.updateTitle = function (id, title,res, callback) {
    this.findById(id, function (err, document) {
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
        if(typeof callback == 'function') callback(document);
    })
}

let Novel = mongoose.model('Novel', novelSchema, 'novel');

module.exports = Novel;

