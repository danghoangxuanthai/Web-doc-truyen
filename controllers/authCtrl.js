const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authCtrl = {
    register: async (req, res) => {
        try{
            const {fullname, username, email, password, gender} = req.body;
            let newUsername = username.toLowerCase().replace(/ /g, '')
            const user_name = await User.findOne({username: newUsername})
            if(user_name) return res.status(400).json({msg: 'User already exists'})
            const user_email = await User.findOne({email})
            if(user_email) return res.status(400).json({msg: 'Email already exists'})
            if(password.length < 8) return res.status(400).json({msg: 'Password must be at least 8 characters'})
            const hashedPasword = await bcrypt.hash(password, 12)
            const newUser = await User.create({
                fullname, username, email, password: hashedPasword, gender
            })
            const access_token = createAccessToken({id: newUser._id})
            const refresh_token = createRefreshToken({id: newUser._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*7*24*60*60*1000
            })
           
            res.json({
                msg: 'Registered success, please verify your email',
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try{
            const {email, password} = req.body
            const user = await User.findOne({email}).populate('followers following', '-password')
            if(!user) return res.status(400).json({msg: 'User doesnt exists'})
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: 'Password is incorrect'})
            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*7*24*60*60*1000
            })
            res.json({
                msg: 'Logged in successfully', 
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try{
            res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
            return res.status(200).json({msg: 'Logged out successfully'})
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    generateAccessToken: async (req, res) => {
        try{
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: 'Please login'})
            jwt.verify(rf_token, process.env.REFRESH_TOKEN, async (err, result) => {
                if(err) return res.status(400).json({msg: 'Please login'})
                const user = await User.findById(result.id).select('-password').populate('followers following', '-password')
                if(!user) return res.status(400).json({msg: 'This user doesnt exists'})
                const access_token = createAccessToken({id: result.id})
                res.json({
                    access_token, 
                    user
                })
            })
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: '1d'})
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn: '30d'})
}

module.exports = authCtrl;
