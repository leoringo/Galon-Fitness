const { Category, Class, Member, Schedule, Trainer, User } = require('../models')

class ScheduleController {

    static async getSchedule(req, res, next) {
        try {

            const schedule = await Schedule.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Trainer,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'id']
                    }
                }
            })

            res.status(200).json(schedule)
        }
        catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {


            const id = req.params.ScheduleId

            const findSchedule = await Schedule.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Class,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'id'],
                    }
                }, {
                    model: Trainer,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'id']
                    }
                }
                ]
            })

            if (!findSchedule) throw { status: 404, message: 'ERROR SCHEDULE NOT FOUND!' }

            res.status(200).json(findSchedule)
        }
        catch (error) {
            next(error)
        }
    }

    static async getClassSchedule(req, res, next) {
        try {

            const { ClassId } = req.params

            const classSchedule = await Schedule.findAll({
                order: [['date', 'ASC']],
                where: { ClassId },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Class,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'id', 'lat', 'lon', 'imgUrl', 'description']
                    },
                    include: {
                        model: Category,
                        attributes: ['category']
                    }
                }, {
                    model: Trainer,
                    attributes: ['name']
                }
                ]
            })

            if (!classSchedule) throw { status: 404, message: 'ERROR CLASS NOT FOUND!' }

            res.status(200).json(classSchedule)

        }
        catch (error) {
            next(error);
        }
    }

}

module.exports = ScheduleController