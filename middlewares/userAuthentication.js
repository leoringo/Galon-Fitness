const { User } = require('../models')
const { verify } = require('../helpers/jsonwebtoken')

const userAuthentication = async(req, res, next) => {
    try {
        
        const { access_token } = req.headers

        if(!access_token) throw{status: 401, message: 'You are not authenticated!'}

        const payload = verify(access_token)
        
        const user = await User.findByPk(payload.id)

        if(!user) throw {status: 401, message: 'You are not authenticated!'}

        req.user = { 
            id: user.id, 
            email: user.email, 
            name: user.name 
        }
        
        next()
    } 
    catch (error) {
        next(error)
    }
}

module.exports = userAuthentication
