const { Category, Class, Member, Schedule, Trainer, User } = require('../models')

class TrainerController {

    static async getTrainer(req, res, next) {
        try {

            const trainer = await Trainer.findAll({
                order: [['id', 'ASC']],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Schedule,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'TrainerId']
                    }
                }
            })

            res.status(200).json(trainer)

        } 
        catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const id = req.params.TrainerId

            const trainer = await Trainer.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Schedule,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'TrainerId']
                    },
                    include: {
                        model: Class,
                        attributes: ['name']
                    }
                }
            })

            if(!trainer) throw{status: 404, message: 'ERROR TRAINER NOT FOUND!'}

            res.status(200).json(trainer)
        } 
        catch (error) {
            next(error)    
        }
    }
}

module.exports = TrainerController