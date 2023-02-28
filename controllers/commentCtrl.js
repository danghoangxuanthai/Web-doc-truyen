const Comment = require('../models/commentModel')
const Post = require('../models/postModel')
const commentCtrl = {
    createComment: async (req, res) => {
        try{
            const {postId, content, tag, reply} = req.body;
            const newComment = await Comment.create({
                content, tag, reply, user: req.user
            })
            await Post.findOneAndUpdate({_id: postId}, {
                $push: {comments: newComment._id}
            }, {new: true})
            res.json({newComment})
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    updateComment: async (req, res) => {
        try{
            const {content} = req.body;
            await Comment.findOneAndUpdate({_id: req.params.id}, {content}, {new: true})
            res.json({msg: 'Updated user_post'})
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    likeComment: async (req, res) => {
        try{
            const comment = await Comment.find({_id: req.params.id, likes: req.user._id})
            if(comment.length > 0 ) return res.status(400).json({msg: 'You have liked this user_post'})
            await Comment.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.user._id}
            }, {new: true})
            res.json({msg: 'Liked comment successfully'})
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    unlikeComment: async (req, res) => {
        try{
            await Comment.findOneAndUpdate({_id: req.params.id}, {
                $pull: {likes: req.user._id}
            }, {new: true})
            res.json({msg: 'Unliked comment successfully'})
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    deleteComment: async (req, res) => {
        try{
            await Comment.findOneAndDelete({_id: req.params.id})
            res.json({msg: 'Deleted comment successfully'})
        }
        catch(err){
            res.status(500).json({msg: err.message})
        }
    }
}
module.exports = commentCtrl;