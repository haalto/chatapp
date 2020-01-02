const config = require('./utils/config')
const express  = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const expressSanitizer = require('express-sanitizer');
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const morgan = require('morgan')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(expressSanitizer())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

const usersRouter = require('./controllers/users')
app.use('/api/users', usersRouter)

const loginRouter = require('./controllers/login')
app.use('/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

http.listen(process.env.PORT || config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})

const io = require('socket.io')(http)
require('./controllers/sockets')(io)