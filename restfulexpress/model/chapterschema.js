const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let options = {
    timestamps: true
};

/**
 * 没有进行model化, 留到具体的设计里, 这样每个小说名都有一个集合
 * let Chapter = mongoose.model('Chapter', ChapterSchema, 小说名字);
 */

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
