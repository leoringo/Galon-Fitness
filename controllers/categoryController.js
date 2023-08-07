const { Category, Class, Member, Schedule, Trainer, User } = require('../models')

class CategoryController {

    static async getCategory(req, res, next) {
        try {

            const category = await Category.findAll({
                attributes: {
                    exclude: ['updatedAt', 'createdAt']
                }
            })

            res.status(200).json(category)
        }
        catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const id = req.params.CategoryId

            const getCategory = await Category.findAll({
                where: { id },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Class,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'CategoryId']
                    }
                }
            })

            if (!getCategory) throw { status: 404, message: 'ERROR CATEGORY NOT FOUND!' }

            res.status(200).json(getCategory)
        }
        catch (error) {
            next(error)
        }
    }

}

module.exports = CategoryController