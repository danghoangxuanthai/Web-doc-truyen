const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {
    try{
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: 'Not found any token'})
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
        if(!decoded) return res.status(400).json({msg: 'Invalid authentication'})
        const user = await User.findOne({_id: decoded.id})
        req.user = user
        next()
    }
    catch(err){
        return res.status(500).json({msg: err.message})
    }
}
module.exports = auth