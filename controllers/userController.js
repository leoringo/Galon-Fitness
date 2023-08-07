const { Category, Class, Member, Schedule, Trainer, User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {

    static async getUser(req, res, next) {
        try {
            const user = await User.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            })

            res.status(200).json(user)
        }
        catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const { name, address, email, password, phoneNumber, gender } = req.body

            let newUser = await User.create({ name, address, email, password, phoneNumber, gender })

            newUser.password = ''

            res.status(201).json(newUser)
        }
        catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {

            const { email, password } = req.body

            if (!email || !password) throw { status: 400, message: 'Email/Password cannot be empty!' }

            const user = await User.findOne({ where: { email } })

            if (!user || !compare(password, user.password)) throw { status: 400, message: 'Wrong Email/Password!' }

            const token = sign({ id: user.id, email: user.email, username: user.username })

            res.status(200).json({ access_token: token })
        }
        catch (error) {
            next(error)
        }
    }

    static async payment(req, res, next) {
        try {

            const user = await User.findByPk(req.user.id)

            if (!user) throw { status: 401, message: 'You are not authorized!' }

            if (user.isSubscribed === true) throw{ status: 400, message: 'You already subscribed!'}

            const midtransClient = require('midtrans-client');

            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: 'SB-Mid-server-H6SigKAHx4FZZObNfmxhUJjb'
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_ID" + Math.floor(12313754 + Math.random() * 99999999),
                    "gross_amount": 500000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "name": user.name,
                    "email": user.email,
                    "phone": user.phoneNumber
                }
            };

            const transactionToken = await snap.createTransaction(parameter)
            res.status(201).json(transactionToken)
                
        }
        catch (error) {
            next(error)
        }
    }

    static async addClass(req, res, next){
        try {

            const UserId = req.user.id

            const { ClassId } = req.params

            // YANG INI YANG DIPINDAHIN @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            // const checkClass = await Member.findAll({
            //     where: {UserId, ClassId}
            // })

            // if(checkClass.length !== 0) throw {status: 400, message: "Can't booked same class!"}

            const newClass = await Member.create({ UserId, ClassId })

            res.status(201).json({id: newClass.id, UserId, ClassId:  Number(ClassId)})
        } 
        catch (error) {
          next(error)   
        }
    }


    static async status(req, res, next){
        try {
            
            const { id } = req.user

            const checkUser = User.findByPk(id)

            if(!checkUser) throw {status: 403, message: 'You are not authorized!'}

            const patch = await User.update({ isSubscribed: true}, {where: { id }})

            res.status(200).json({message: 'You are now member and can book class, HAPPY GYM !'})

        } 
        catch (error) {
            next(error)    
        }
    }

    static async getUserClass(req, res, next) {
        try {
            const UserId = req.user.id

            const userClasses = await Member.findAll({
                where: {UserId},
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            if(!userClasses) throw{status: 404, message: 'ERROR CLASS NOT FOUND!'}

            res.status(200).json(userClasses)
        } 
        catch (error) {
            next(error)    
        }
    }

    static async googleLogIn(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            console.log(payload, `XAXWAXWAXWAXWAXWAXWAXWA`);
            const {name, email} = payload
            let [user, created] = await User.findOrCreate({
                where: {
                   email
                },
                defaults: {
                    password: String(Math.random()),
                    name,
                    address: 'BangKresna',
                    phoneNumber: payload.exp,
                    gender: 'Non-Binary'
                }
            })

            const token = sign({id: user.id, email})
            res.status(200).json({ access_token: token})
        }
        catch (error) {
            next(error)
        }
    }
}

module.exports = UserController