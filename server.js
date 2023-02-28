require('dotenv').config()
const express = require('express')
const mongoose= require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const SocketServer = require('./socketServer')
const {ExpressPeerServer} = require('peer')
const path = require('path')

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(express.json())


// socket
const http = require('http').createServer(app)
const io = require('socket.io')(http)


io.on('connection', socket => {
    SocketServer(socket)
})

// Routes
app.use('/api', require('./routes/authRoute'))
app.use('/api', require('./routes/userRoute'))
app.use('/api', require('./routes/postRoute'))
app.use('/api', require('./routes/commentRoute'))
app.use('/api', require('./routes/favoriteRoute'))
app.use('/api', require('./routes/notifyRoute'))
app.use('/api', require('./routes/messageRoute'))
app.use('/api', require('./routes/forumRoute'))

const URI = process.env.MONGODB_URL
mongoose.connect(URI, err => {
    if(err) throw err;
    console.log('Connected to Db')
})
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}
const port = process.env.PORT || 5000
http.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})