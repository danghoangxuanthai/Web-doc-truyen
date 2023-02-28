const Notifies = require('../models/notifyModel')
const notifyCtrl = {
    createNotify: async (req, res) => {
        try{
            const {id, recipients, url, text, content, image} = req.body;
            if(recipients.includes(req.user._id.toString())) return;
            const notify = await Notifies.create({
                id, recipients, url, text, content, image, user: req.user._id, user2: req.user
            })
            return res.json({notify})
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    removeNotify: async (req, res) => {
        try{
            const notify = await Notifies.findOneAndDelete({
                id: req.params.id,
                url: req.query.url
            })
            return res.json({notify})
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getNotify: async (req, res) => {
        try{
            const notify = await Notifies.find({recipients: req.user._id})
            return res.json({notify})
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    isRead: async (req, res) => {
        try{
            const notify = await Notifies.findOneAndUpdate({_id: req.params.id}, {
                isRead: true
            })
            return res.json({notify})
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteAll : async (req, res) => {
        try {
            const notify = await Notifies.deleteMany({recipients: req.user._id})
            return res.json({notify})
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
}
module.exports = notifyCtrl;