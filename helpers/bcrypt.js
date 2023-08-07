const bcrypt = require('bcryptjs')
const salt = 5

const hash = (password) => {
    return bcrypt.hashSync(password, salt)
}

const compare = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = { hash, compare }