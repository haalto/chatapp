const express  = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res, next) => {
    res.send('Hello')
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

let users = []
let connections = []

io.sockets.on('connection', socket => { 
    connections.push(socket)
    console.log('New Connection, %s sockets connected', connections.length)
    
    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1)
        console.log(`User ${socket.username} disconnected, ${connections.length} sockets left`)
        users.splice(users.indexOf(socket.username), 1)
        io.sockets.emit('active-users', users)   
    })

    //New user 
    socket.on('new-user', user => {        
        users.push(user.username)
        console.log(users)
        socket.username = user.username
        io.sockets.emit('active-users', users)           
    })

    //Server receives a message from client and send it to other clients
    socket.on('new-message', message => {
        console.log('Send new message to clients', message)
        message.time = new Date().toLocaleTimeString()    
        io.sockets.emit('chat-message', message)
    })
})