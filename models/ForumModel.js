const mongoose = require('mongoose')
const forumSchema = new mongoose.Schema({
    content: String,
    content2: String,
    content3: String,
    images: {
        type: Array,
        required: true
    },
    likes: [],
    comments: [{type: mongoose.Types.ObjectId, ref: 'Comment'}],
    user: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    user2: {}
}, {timestamps: true})

module.exports = mongoose.model('Forum', forumSchema)
