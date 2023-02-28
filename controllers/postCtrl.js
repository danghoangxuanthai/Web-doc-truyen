const Post = require('../models/postModel')
const Comment = require('../models/commentModel')
const User = require('../models/userModel')
const Favorite = require('../models/favouriteModel')

const postCtrl = {
    createPost: async (req, res) => {
        try{
            const {content, images} = req.body;
            const post = await Post.create({content,images,  user: req.user._id, user2: req.user})
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
    getOnePost: async (req, res) => {
        try{
            const post = await Post.findById(req.params.id)
                .populate('user likes', "avatar username fullname")
                .populate({
                    path: 'comments',
                    pupulate: {
                        path: 'user likes',
                        select: '-password'
                    }
                })
            console.log({post})
            res.json({post})
        }
        catch(err){

        }
    },
    getPost: async (req, res) => {
        try{
            const posts = await Post.find({}).sort('-createdAt')
                .populate("user", "avatar username fullname")
                .populate({
                    path: 'comments',
                    pupulate: {
                        path: 'user likes',
                        select: '-password'
                    }
                })
            res.json({
                msg: 'Get user_post successfully',
                result: posts.length,
                posts
            })
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updatePost: async (req, res) => {
        try{
            const {content} = req.body;
            const post = await Post.findOneAndUpdate({_id: req.params.id}, {
                content
            }).populate('user', 'avatar username fullname')
            res.json({
                msg: 'Updated user_post',
                newPost: {
                    ...post._doc,
                    content
                }
            })
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deletePost: async (req, res) => {
        try{
            const post = await Post.findOneAndDelete({_id: req.params.id}).populate('user')
            await Comment.deleteMany({_id: {$in: post.comments}})
            res.json({
                msg: 'Deleted user_post',
                newPost: {
                    ...post._doc,
                    user: req.user
                }
            })
        }
        catch(err){
            // return res.status(500).json({msg: err.message})
        }
    },
    likePost: async (req, res) => {
        try{
            const data = await Post.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.user}
            }, {new: true})
            res.json({data})
        }
        catch(err){     
            res.status(500).json({msg: err.message})
        }
    },
    unlikePost: async (req, res) => {
        try{
            const data = await Post.findOneAndUpdate({_id: req.params.id}, {
                $pull: {likes: req.user}
            }, {new: true})
            res.json({data})
        }
        catch(err){     
            res.status(500).json({msg: err.message})
        }
    },
    getUserPost: async (req, res) => {
        try{
            const posts = await Post.find({user: req.params.id,}).sort('-createdAt')
            res.json({posts, result: posts.length})
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    savePost: async (req, res) => {
        try{
            // const user = await User.find({_id: req.user._id, saved: req.params.id})
            const post = await Post.find({_id: req.params.id})
            const save = await User.findOneAndUpdate({_id: req.user._id}, {
                $push: {saved: post}
            }, {new: true})
            if(!save) return res.status(500).json({msg: 'This post doesnt exists'})
            res.json({msg: 'Saved post successfully'})
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    }
    ,
    removeSavePost: async (req, res) => {
        try{
            const post = await Post.find({_id: req.params.id})
            const save = await User.findOneAndUpdate({_id: req.user._id}, {
                $pull: {saved: post}
            }, {new: true})
            if(!save) return res.status(500).json({msg: 'This post doesnt exists'})
            res.json({msg: 'Remove saved post successfully'})
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    }
}
module.exports = postCtrl