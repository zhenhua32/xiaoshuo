const mongoose = require('mongoose');

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

let Novel = mongoose.model('Novel', novelSchema, 'novel');

module.exports = Novel;

