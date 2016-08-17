const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let options = {
    timestamps: true
};

let chapterSchema = new Schema({
    index: {
        type: Number
    },
    title: {
        type: String,
        trim: true
    },
    body: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        trim: true
    },
    novel: {
        type: Schema.Types.ObjectId,
        ref: 'Novel'
    }
}, options);

module.exports = chapterSchema;
