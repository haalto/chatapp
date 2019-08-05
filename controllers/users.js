const config = require('../utils/config')
const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

usersRouter.get('/', (req, res, next) => {
    User.find({}).then(users => {
        res.json(users.map(user => user.toJSON()))
    })
})

usersRouter.get('/:id', (req, res, next) => {

    const id = req.sanitize(req.params.id)

    User.findById(id)
        .then(user => {
            if (user) {
                res.json(user.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(err => next(err))
})

usersRouter.post('/', async (req, res, next) => {

    console.log('Creating new user')

    try {      
        const username = await req.sanitize(req.body.username)
        const password = await req.sanitize(req.body.password)       

        const salt = bcrypt.genSaltSync(Number(config.SALT_ROUNDS))
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            username: username,
            password: hashedPassword
        })

        const savedUser = await user.save()

        console.log(`Created new user ${savedUser}`)
        res.json(savedUser)   

    }   catch (exception) {
        next(exception)
    }   
})

usersRouter.delete('/:id', (req, res, next) => {

    const id = req.sanitize(req.params.id)

    User.findByIdAndRemove(id)
        .then(() => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

usersRouter.put('/:id', async (req, res, next) => {

    const id = req.sanitize(req.params.id)
    const username = req.sanitize(req.body.username)
    const password = req.sanitize(req.body.password)
    
    const hashedPassword = await bcrypt.hash(password, config.SALT)

    const user = {
        username: username,
        hashedPassword: hashedPassword
    }

    User.findByIdAndUpdate(id, user, { new: true })
        .then(updatedUser => {
            res.json(updatedUser.toJSON())
        })
        .catch(err => next(err))
})

module.exports = usersRouter