const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let options = {
    timestamps: true
};

let chapterSchema = new Schema({
    index: {
        type: Number
    },
    body: {
        type: String,
        trim: true
    },
    form: {
        type: Schema.Types.ObjectId
    }
}, options)


let Chapter = mongoose.model('Chapter', chapterSchema, 'chapter');

module.exports = Chapter;
