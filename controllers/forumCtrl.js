const Post = require('../models/postModel')
const Comment = require('../models/commentModel')
const User = require('../models/userModel')
const Favorite = require('../models/favouriteModel')
const Forum = require('../models/ForumModel')
const forumCtrl = {
    createPost: async (req, res) => {
        try{
            const {content, images, content2, content3} = req.body;
            const post = await Forum.create({content, content2, content3 ,images,  user: req.user._id, user2: req.user})
            res.json({
                newPost: {
                    ...post._doc,
                    user: req.user
                }
            })
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getPost: async (req, res) => {
        try{
            const posts = await Forum.find({}).sort('-createdAt')
                .populate("user", "avatar username fullname")
                .populate({
                    path: 'comments',
                    pupulate: {
                        path: 'user likes',
                        select: '-password'
                    }
                })
            res.json({
                msg: 'Get forum post successfully',
                result: posts.length,
                posts
            })
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
}
module.exports = forumCtrl