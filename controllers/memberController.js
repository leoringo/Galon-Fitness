const { Category, Class, Member, Schedule, Trainer, User } = require('../models')

class MemberController {

    static async getMember(req, res, next) {
        try {
            const member = await Member.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'id', 'isSubscribed', 'password']
                        }
                    },
                    {
                        model: Class,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'id']
                        }
                    }
                ]
            })

            res.status(200).json(member)
        }
        catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {

            const { ClassId } = req.params

            const findClassId = await Member.findAll({
                where: { ClassId },
                attributes: {
                    exclude:  ['createdAt', 'updatedAt']
                },
                include: {
                    model: Class,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'description', 'lat','lon', 'id']
                    }
                }
            })

            if (!findClassId) throw { status: 404, message: 'ERROR CLASS NOT FOUND' }

            res.status(200).json(findClassId)
        }
        catch (error) {
            next(error)
        }
    }

}

module.exports = MemberController