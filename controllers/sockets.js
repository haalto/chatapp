const config = require('../utils/config')
const jwt = require('jsonwebtoken')

module.exports = (io) => {
    
    let users = []
    let connections = []

    //authorization middleware
    io.use((socket, next) => {

        console.log(socket.handshake)

        if (socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, config.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log(err)
                } else {
                    socket.decoded = decoded

                    const user = decoded.username
                    users.push(user)                    
                    socket.user = socket.handshake.query.user
                    io.sockets.emit('active-users', users) 
                    
                    console.log(users)
                    next()
                }
            })            
        } else {
            console.log("error in authentication")
        }
    })

    io.sockets.on('connection', socket => {     

        connections.push(socket)
        console.log('New Connection, %s sockets connected', connections.length)
        io.sockets.emit('active-users', users)
        
        socket.on('disconnect', () => {
            connections.splice(connections.indexOf(socket), 1)
            console.log(`User ${socket.username} disconnected, ${connections.length} sockets left`)
            users.splice(users.indexOf(socket.username), 1)
            io.sockets.emit('active-users', users)   
        })

        //Server receives a message from client and sends it to other clients
        socket.on('new-message', message => {
            console.log('Send new message to clients', message)
            message.time = new Date().toLocaleTimeString()    
            io.sockets.emit('chat-message', message)
        })
    })
}

