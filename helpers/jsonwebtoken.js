const jwt = require('jsonwebtoken')
const biskuit = process.env.biskuit

const sign = (payload) => {
    return jwt.sign(payload, biskuit)
}

const verify = (token) => {
    return jwt.verify(token, biskuit)
}

module.exports = { sign, verify }