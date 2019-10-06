require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let SALT_ROUNDS = process.env.SALT_ROUNDS
let JWT_SECRET = process.env.JWT_SECRET

module.exports = {
    MONGODB_URI,
    PORT,
    SALT_ROUNDS,
    JWT_SECRET
}