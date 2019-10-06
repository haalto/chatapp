const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {

    const username = await req.sanitize(req.body.username)
    const password = await req.sanitize(req.body.password)

    const user = await User.findOne({ username})    
    const passCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password)
    
    if (!(user && passCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
        role: user.role
    }

    const token = jwt.sign(userForToken, config.JWT_SECRET)

    res.status(200).send({ token, username: user.username })    
})

module.exports = loginRouter