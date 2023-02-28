const express = require('express')
const router = express.Router()
const Favorite = require('../models/favouriteModel')
const auth  = require('../middleware/auth')
const favoriteCtrl = require('../controllers/favoriteCtrl')
router
    // .post('/favorite/:favoriteId',auth,  favoriteCtrl.createFav)
    // .post('/removeFavorite/:favoriteId',auth,  favoriteCtrl.removeFav)
    // .post('/fav/:id', auth, favoriteCtrl.addFav)
    // .delete('/favorite/:favoriteId', auth, favoriteCtrl.deleteFav)
    .get('/user_fav/:id', auth, favoriteCtrl.getUserFav)
    .patch('/updatefav/:id', auth, favoriteCtrl.updateAddFav)
    .patch('/remove/:id', auth, favoriteCtrl.removeAddFav)

module.exports = router;