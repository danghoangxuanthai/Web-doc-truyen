let users = []
const SocketServer = (socket) => {
    socket.on('joinUser', id => {
        users.push({id, socketId: socket.id})
        console.log({users})
    })
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id)
        console.log({users})
    })
    socket.on('createNotify', msg => {
        console.log(msg)
        const clients = users.filter(user => msg.recipients.includes(user.id))
        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)
            })
        }
    })
    socket.on('createPost', msg => {
            users.forEach(client => {
                socket.to(`${client.socketId}`).emit('createPostToClient', msg)
            })
    })
    socket.on('removeNotify', msg => {
        const clients = users.filter(user => msg.recipients.includes(user.id))
        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg)
            })
        }
    })
    socket.on('likePost', newPost => {
        const ids = [...newPost.user2.followers, newPost.user2._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likeToClient', newPost)
            })
        }
    })
    socket.on('unLikePost', newPost => {
        const ids = [...newPost.user2.followers, newPost.user2._id]
        const clients = users.filter(user => ids.includes(user.id))
        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('unlikeToClient', newPost)
            })
        }
    })
    socket.on('createComment', newPost => {
        const ids = [...newPost.user2.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createCommentToClient', newPost)
            })
        }
    })
    socket.on('deleteComment', newPost => {
        const ids = [...newPost.user2.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost)
            })
        }
    })
    socket.on('removePost', msg => {
        console.log(msg)
        users.forEach(client => {
            socket.to(`${client.socketId}`).emit('removePostToClient', msg)
        })
    })
    socket.on('addMessage', message => {
        const user = users.find(_ => _.id === message.recipient)
        user && socket.to(`${user.socketId}`).emit('addMessageToClient', message)
    })
    socket.on('follow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('followToClient', newUser)
    })
    socket.on('unfollow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('unfollowToClient', newUser)
    })

}
module.exports = SocketServer;