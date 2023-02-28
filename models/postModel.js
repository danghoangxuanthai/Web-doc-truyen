const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    content: String,
    images: {
        type: Array,
        required: true
    },
    likes: [],
    comments: [{type: mongoose.Types.ObjectId, ref: 'Comment'}],
    user: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    user2: {},
    types: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)
