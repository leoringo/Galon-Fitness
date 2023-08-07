const { Category, Class, Member, Schedule, Trainer, User } = require('../models')

class ClassController {

    static async getClass(req, res, next) {
        try {

            const gymClass = await Class.findAll({
                order: [['id']],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Category,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'id']
                    }
                }
            })

            res.status(200).json(gymClass)
        }
        catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const id = req.params.ClassId

            const findClass = await Class.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Category,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'id']
                    }
                }
            })

            if (!findClass) throw { status: 404, message: 'ERROR CLASS NOT FOUND!' }

            res.status(200).json(findClass)
        }
        catch (error) {
            next(error)
        }
    }

}

module.exports = ClassController