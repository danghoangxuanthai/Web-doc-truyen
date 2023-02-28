const mongoose = require('mongoose')
const favoriteSchema = new mongoose.Schema({
    bannerImage: {
       type: String,
   },
    id: {
        type: String,
       unique: true,
   },
    meanScore: {
    type: Number,
   },
    averageScore: {
    type:Number,
   },
    english: {
        type: String,
    },
    extraLarge: {
        type: String
    },
    user: [{type: mongoose.Types.ObjectId, ref: 'User'}]
}, {timestamps: true})

module.exports = mongoose.model('Favorite', favoriteSchema)
