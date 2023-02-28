const Favorite = require('../models/favouriteModel')
const User =  require('../models/userModel')
const favoriteCtrl =  {
    createFav: async (req, res) => {
        try{
                // const val = await Favorite.create(req.body.variable)
                const val2 = await User.findOneAndUpdate({_id: req.body.variable.userFrom, userFrom: req.body.userFrom}, {
                    $push: {favoriteAnime: req.body.variable}
                }, {new: true})
            res.json({msg: 'Created fav', val2})
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    addFav: async (req, res) => {
        try{
            const {bannerImage, id, meanScore, averageScore, title: {english}, coverImage: {extraLarge}} = req.body;
            const val = await Favorite.create({bannerImage, id, meanScore, averageScore, english, extraLarge})
            res.json({msg: 'Added to fav', val})
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    removeFav: async (req, res) => {
      try{
          await Favorite.findOneAndDelete({id: req.params.id})
          const val = await User.findOneAndUpdate({_id: req.body.variable.userFrom, userFrom: req.body.userFrom},{
                    $pull: {favoriteAnime: req.body.variable}
              },  {new: true}
          )
          res.json({msg: 'Removed fav', val})
      }
      catch(err){
          res.status(500).json({msg: err.message})
      }
    },
    deleteFav: async (req, res) => {
        try{
            await User.findOneAndUpdate({_id: req.body.variable.userFrom}, {
                $pull: {favoriteAnime: req.body.variable}
            })
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    getUserFav: async (req, res) => {
        try{
            const posts = await Favorite.find({user: req.params.id}).sort('-createdAt')
            res.json({posts, result: posts.length})
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    updateAddFav: async (req, res) => {
        try{
            const updateFav = await User.findOneAndUpdate({_id: req.user._id}, {
                $push: {favoriteAnime: req.body}
            }, {new: true})
            if(!updateFav) return res.status(500).json({msg: 'This post doesnt exists'})
            res.json(updateFav)
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    removeAddFav: async (req, res) => {
        console.log(typeof req.body)
        try{
            const removeFav = await User.findOneAndUpdate({_id: req.user._id}, {
                $pull: {favoriteAnime: req.body}
            }, {new: true})
            if(!removeFav) return res.status(500).json({msg: 'This post doesnt exists'})
            res.json(removeFav)
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    }
}
module.exports = favoriteCtrl;
