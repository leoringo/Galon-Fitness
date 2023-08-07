const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')

router.get('/', CategoryController.getCategory)
router.get('/detail/:CategoryId', CategoryController.getById)


module.exports = router