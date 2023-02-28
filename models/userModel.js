const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://codeforces.com/predownloaded/ed/50/ed50d0c4723b09010287a430cb35f7c83ceba911.jpg'
    },
    role: {
        type: String,
        default: 'user'
    },
    gender: {
        type: String,
        default: 'male'
    },
    mobile: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'user'
    },
    story: {
        type: String,
        default: '',
        maxlength: 200
    },
    website: {
        type: String,
        default: ''
    },
    banner: {
        type: String,
        default: 'https://images-ext-2.discordapp.net/external/U_hb-kJog6UbViu7M_xedfKvevvHuEnuPmGlzX2I8WQ/https/s4.anilist.co/file/anilistcdn/user/banner/b561364-FyKP9SQj97BJ.jpg?width=1692&height=952'
    },
    saved: [],
    followers: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    following: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    favoriteAnime: []
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)