const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
    content: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Comment', commentSchema)