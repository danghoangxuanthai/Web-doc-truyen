const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    tag: Object,
    reply: mongoose.Types.ObjectId,
    likes: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    comments: [{type: mongoose.Types.ObjectId, ref: 'Comment'}],
    user2: {type: mongoose.Types.ObjectId, ref: 'User'},
    user: {}
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)